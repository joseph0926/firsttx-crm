import { redirect } from 'react-router';
import { AuthModel } from '@/models/auth';

export async function requireAuth() {
  const auth = await AuthModel.getSnapshot();
  if (!auth) {
    throw redirect('/login');
  }
  return auth;
}

export async function getAuth() {
  return await AuthModel.getSnapshot();
}
