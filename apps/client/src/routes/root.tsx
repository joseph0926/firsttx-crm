import { redirect } from 'react-router';
import { getAuth } from '@/lib/auth';
import LandingPage from './landing';

export function loader() {
  const auth = getAuth();
  if (auth) {
    throw redirect('/dashboard');
  }
  return null;
}

export default LandingPage;
