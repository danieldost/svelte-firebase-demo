import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import pkg from 'firebase-admin'

import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private'

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
      projectId: FB_PROJECT_ID
    })
  })
} catch (err: any) {
  console.log('Firebase admin already initialized')
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin err', err.stack)
  }
}

export const adminDB = getFirestore()
export const adminAuth = getAuth()
