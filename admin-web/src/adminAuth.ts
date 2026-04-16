const adminAuthEmails = {
  globee: 'globee@globee.local',
} as const;

type AdminId = keyof typeof adminAuthEmails;

export function getAdminAuthEmail(adminId: string) {
  const normalizedAdminId = adminId.trim().toLowerCase();

  return adminAuthEmails[normalizedAdminId as AdminId] ?? null;
}
