import { redirect } from 'react-router';
import { AuthModel } from '@/models/auth';

export function requireAuth() {
  const auth = AuthModel.getCachedSnapshot();
  if (!auth) {
    throw redirect('/login');
  }
  return auth;
}

export function getAuth() {
  return AuthModel.getCachedSnapshot();
}
