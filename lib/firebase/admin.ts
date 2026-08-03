import { doc, getDoc } from "./firestore";
import { db } from "./firestore";

export const ADMIN_COLLECTION = "admins";

type AdminIdentity = {
  email?: string | null;
  uid?: string | null;
};

export function parseAdminList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const ALLOWED_ADMIN_EMAILS = parseAdminList(process.env.NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS);
const ALLOWED_ADMIN_UIDS = parseAdminList(process.env.NEXT_PUBLIC_ADMIN_ALLOWED_UIDS);

export function isAllowedAdminIdentity(identity: AdminIdentity) {
  const email = identity.email?.trim().toLowerCase();
  const uid = identity.uid?.trim();

  if (email && ALLOWED_ADMIN_EMAILS.some((allowedEmail) => allowedEmail.toLowerCase() === email)) {
    return true;
  }

  if (uid && ALLOWED_ADMIN_UIDS.includes(uid)) {
    return true;
  }

  return false;
}

export async function isAuthorizedAdminIdentity(identity: AdminIdentity) {
  const uid = identity.uid?.trim();

  if (uid) {
    const snapshot = await getDoc(doc(db, ADMIN_COLLECTION, uid));

    if (snapshot.exists()) {
      const data = snapshot.data() as { active?: boolean };

      return data.active !== false;
    }
  }

  return isAllowedAdminIdentity(identity);
}