import { redirect } from 'react-router';
import { getAuth } from '@/lib/auth';

export function loader() {
  const auth = getAuth();
  if (auth) {
    throw redirect('/dashboard');
  }
  throw redirect('/login');
}
