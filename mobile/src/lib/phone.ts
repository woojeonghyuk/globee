export function normalizeKoreanPhone(value: string) {
  const localPhone = getLocalKoreanPhone(value);

  return localPhone ? `+82${localPhone.slice(1)}` : '';
}

export function getLocalKoreanPhone(value: string) {
  const digits = value.replace(/[^0-9]/g, '');

  if (digits.startsWith('82')) {
    return `0${digits.slice(2)}`;
  }

  if (digits.startsWith('0')) {
    return digits;
  }

  return digits;
}

export function formatKoreanPhoneInput(value: string) {
  const digits = getLocalKoreanPhone(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function isValidKoreanPhone(value: string) {
  const localPhone = getLocalKoreanPhone(value);

  return /^010[0-9]{8}$/.test(localPhone);
}

export function getPasswordValidationError(password: string, phone?: string) {
  if (password.length < 8) {
    return '비밀번호는 8자 이상 입력해주세요.';
  }

  if (password.length > 20) {
    return '비밀번호는 20자 이하로 입력해주세요.';
  }

  if (/^(.)\1+$/.test(password)) {
    return '같은 문자만 반복한 비밀번호는 사용할 수 없어요.';
  }

  const weakPasswords = new Set([
    '00000000',
    '11111111',
    '12345678',
    '87654321',
    'password',
    'qwerty123',
  ]);

  if (weakPasswords.has(password.toLowerCase())) {
    return '너무 쉬운 비밀번호는 사용할 수 없어요.';
  }

  const phoneDigits = phone?.replace(/[^0-9]/g, '') ?? '';
  if (phoneDigits && (password === phoneDigits || phoneDigits.endsWith(password))) {
    return '전화번호와 같은 비밀번호는 사용할 수 없어요.';
  }

  return '';
}
