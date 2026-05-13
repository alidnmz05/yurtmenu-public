// src/lib/firebase-admin.ts
// Server-side only – Next.js API route'larında kullanılır.
// Firebase Admin SDK'yı başlatır.
// Credential önceliği:
//   1. FIREBASE_SERVICE_ACCOUNT_JSON env var (Vercel / üretim ortamı)
//   2. GOOGLE_APPLICATION_CREDENTIALS env var (dosya yolu)
//   3. Local fallback: C:\Secrets\kyk-yemek-659c1-firebase-adminsdk-...json

import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

function getFirebaseApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  const projectId = "kyk-yemek-659c1";

  // 1) JSON string olarak env var
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (saJson) {
    const credential = admin.credential.cert(
      JSON.parse(saJson) as ServiceAccount
    );
    return admin.initializeApp({ credential, projectId });
  }

  // 2) Dosya yolu olarak env var (GOOGLE_APPLICATION_CREDENTIALS)
  const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (filePath) {
    return admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId,
    });
  }

  // 3) Local dev fallback – sunucudaki bilinen yol
  const localKeyPath =
    "C:\\Secrets\\kyk-yemek-659c1-firebase-adminsdk-8mm9j-323cf7fe14.json";
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serviceAccount = require(localKeyPath) as ServiceAccount;
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId,
  });
}

export function getFirestore() {
  const app = getFirebaseApp();
  return app.firestore();
}
