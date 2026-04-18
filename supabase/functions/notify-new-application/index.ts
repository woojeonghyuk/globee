import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
};

type MaybeArray<T> = T | T[] | null;

type ApplicationRow = {
  id: string;
  parent_id: string;
  child_id: string;
  class_id: string;
  status: string;
  created_at: string;
  children: MaybeArray<{
    full_name: string | null;
    school: string | null;
  }>;
  classes: MaybeArray<{
    title: string | null;
    country: string | null;
    flag: string | null;
    campus: string | null;
    teacher_name: string | null;
    starts_at: string | null;
    seats_total: number | null;
  }>;
};

type ProfileRow = {
  role: 'admin' | 'parent' | null;
  full_name: string | null;
  phone: string | null;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function firstOrNull<T>(value: MaybeArray<T> | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function displayText(value: string | null | undefined, fallback = '미정') {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function formatPhone(phone: string | null | undefined) {
  if (!phone) return '미등록';

  const digits = phone.replace(/\D/g, '');
  let localPhone = digits;

  if (digits.startsWith('82')) {
    localPhone = `0${digits.slice(2)}`;
  }

  if (localPhone.length === 11) {
    return `${localPhone.slice(0, 3)}-${localPhone.slice(3, 7)}-${localPhone.slice(7)}`;
  }

  if (localPhone.length === 10) {
    return `${localPhone.slice(0, 3)}-${localPhone.slice(3, 6)}-${localPhone.slice(6)}`;
  }

  return phone;
}

function formatKoreanDate(value: string | null | undefined) {
  if (!value) return '미정';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

async function sendKakaoWorkMessage(
  webhookUrl: string,
  text: string,
  blocks: { type: 'text'; text: string }[],
) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, blocks }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`KakaoWork webhook failed: ${response.status} ${responseText}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const kakaoWorkWebhookUrl = Deno.env.get('KAKAOWORK_WEBHOOK_URL');

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey || !kakaoWorkWebhookUrl) {
    return jsonResponse({ error: 'Server is not configured.' }, 500);
  }

  const authorization = req.headers.get('Authorization');
  if (!authorization) {
    return jsonResponse({ error: 'Missing authorization header.' }, 401);
  }

  let applicationId: unknown;

  try {
    const body = await req.json();
    applicationId = body?.applicationId;
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  if (typeof applicationId !== 'string' || !applicationId.trim()) {
    return jsonResponse({ error: 'Missing applicationId.' }, 400);
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authorization,
      },
    },
  });

  const {
    data: { user },
    error: userError,
  } = await userClient.auth.getUser();

  if (userError || !user) {
    return jsonResponse({ error: 'Invalid user session.' }, 401);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: requesterProfile, error: requesterProfileError } = await adminClient
    .from('profiles')
    .select('role,full_name,phone')
    .eq('id', user.id)
    .maybeSingle();

  if (requesterProfileError) {
    return jsonResponse({ error: requesterProfileError.message }, 500);
  }

  const { data: applicationData, error: applicationError } = await adminClient
    .from('applications')
    .select(
      [
        'id',
        'parent_id',
        'child_id',
        'class_id',
        'status',
        'created_at',
        'children(full_name,school)',
        'classes(title,country,flag,campus,teacher_name,starts_at,seats_total)',
      ].join(','),
    )
    .eq('id', applicationId)
    .maybeSingle();

  if (applicationError) {
    return jsonResponse({ error: applicationError.message }, 500);
  }

  if (!applicationData) {
    return jsonResponse({ error: 'Application not found.' }, 404);
  }

  const application = applicationData as unknown as ApplicationRow;
  const isOwner = application.parent_id === user.id;
  const isAdmin = (requesterProfile as ProfileRow | null)?.role === 'admin';

  if (!isOwner && !isAdmin) {
    return jsonResponse({ error: 'Not allowed to notify this application.' }, 403);
  }

  if (application.status !== 'applied') {
    return jsonResponse({ ok: true, skipped: true });
  }

  const { data: parentProfileData, error: parentProfileError } = await adminClient
    .from('profiles')
    .select('role,full_name,phone')
    .eq('id', application.parent_id)
    .maybeSingle();

  if (parentProfileError) {
    return jsonResponse({ error: parentProfileError.message }, 500);
  }

  const { count: activeApplicationCount, error: activeCountError } = await adminClient
    .from('applications')
    .select('id', { count: 'exact', head: true })
    .eq('class_id', application.class_id)
    .in('status', ['applied', 'waiting', 'confirmed']);

  if (activeCountError) {
    return jsonResponse({ error: activeCountError.message }, 500);
  }

  const child = firstOrNull(application.children);
  const classRow = firstOrNull(application.classes);
  const parentProfile = parentProfileData as ProfileRow | null;
  const parentPhone = formatPhone(parentProfile?.phone ?? user.phone);
  const seatsTotal = classRow?.seats_total ?? 6;
  const fallbackText = `[Globee] 새 신청: ${displayText(child?.full_name)} / ${displayText(classRow?.title)}`;

  const blocks = [
    {
      type: 'text' as const,
      text: '[Globee] 새 신청이 들어왔어요',
    },
    {
      type: 'text' as const,
      text: [
        `문화교류: ${displayText(classRow?.title)}`,
        `나라: ${displayText(classRow?.flag, '')} ${displayText(classRow?.country)}`.trim(),
        `일시: ${formatKoreanDate(classRow?.starts_at)}`,
        `학교: ${displayText(classRow?.campus)}`,
        `선생님: ${displayText(classRow?.teacher_name)}`,
      ].join('\n'),
    },
    {
      type: 'text' as const,
      text: [
        `학생: ${displayText(child?.full_name)}`,
        `학생 학교/학년: ${displayText(child?.school)}`,
        `학부모 전화번호: ${parentPhone}`,
        `현재 신청 수: ${activeApplicationCount ?? '-'} / ${seatsTotal}`,
      ].join('\n'),
    },
    {
      type: 'text' as const,
      text: '관리자웹에서 신청 승인 또는 신청 취소를 처리해주세요.\nhttps://globee-admin.vercel.app/',
    },
  ];

  try {
    await sendKakaoWorkMessage(kakaoWorkWebhookUrl, fallbackText, blocks);
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: 'Failed to send KakaoWork notification.' }, 502);
  }

  return jsonResponse({ ok: true });
});
