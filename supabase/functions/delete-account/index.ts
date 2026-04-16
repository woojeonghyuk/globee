import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
};

const completionPhotoBucket = 'completed-class-photos';

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
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

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return jsonResponse({ error: 'Server is not configured.' }, 500);
  }

  const authorization = req.headers.get('Authorization');
  if (!authorization) {
    return jsonResponse({ error: 'Missing authorization header.' }, 401);
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

  const { data: profileRow, error: profileReadError } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileReadError) {
    return jsonResponse({ error: profileReadError.message }, 500);
  }

  if (profileRow?.role !== 'parent') {
    return jsonResponse({ error: 'Only parent accounts can be deleted here.' }, 403);
  }

  const { data: applicationRows, error: applicationsError } = await adminClient
    .from('applications')
    .select('id')
    .eq('parent_id', user.id);

  if (applicationsError) {
    return jsonResponse({ error: applicationsError.message }, 500);
  }

  const applicationIds = (applicationRows ?? []).map((row) => row.id as string);
  let completedClassIds: string[] = [];

  if (applicationIds.length > 0) {
    const { data: completedRows, error: completedError } = await adminClient
      .from('completed_classes')
      .select('id')
      .in('application_id', applicationIds);

    if (completedError) {
      return jsonResponse({ error: completedError.message }, 500);
    }

    completedClassIds = (completedRows ?? []).map((row) => row.id as string);
  }

  if (completedClassIds.length > 0) {
    const { data: photoRows, error: photosError } = await adminClient
      .from('completed_class_photos')
      .select('storage_path')
      .in('completed_class_id', completedClassIds);

    if (photosError) {
      return jsonResponse({ error: photosError.message }, 500);
    }

    const storagePaths = (photoRows ?? [])
      .map((row) => row.storage_path as string)
      .filter(Boolean);

    if (storagePaths.length > 0) {
      const { error: storageError } = await adminClient.storage
        .from(completionPhotoBucket)
        .remove(storagePaths);

      if (storageError) {
        return jsonResponse({ error: storageError.message }, 500);
      }
    }

    const { error: completedDeleteError } = await adminClient
      .from('completed_classes')
      .delete()
      .in('id', completedClassIds);

    if (completedDeleteError) {
      return jsonResponse({ error: completedDeleteError.message }, 500);
    }
  }

  const { error: applicationsDeleteError } = await adminClient
    .from('applications')
    .delete()
    .eq('parent_id', user.id);

  if (applicationsDeleteError) {
    return jsonResponse({ error: applicationsDeleteError.message }, 500);
  }

  const { error: childrenDeleteError } = await adminClient
    .from('children')
    .delete()
    .eq('parent_id', user.id);

  if (childrenDeleteError) {
    return jsonResponse({ error: childrenDeleteError.message }, 500);
  }

  const { error: profileDeleteError } = await adminClient
    .from('profiles')
    .delete()
    .eq('id', user.id);

  if (profileDeleteError) {
    return jsonResponse({ error: profileDeleteError.message }, 500);
  }

  const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(user.id);

  if (authDeleteError) {
    return jsonResponse({ error: authDeleteError.message }, 500);
  }

  return jsonResponse({ ok: true });
});
