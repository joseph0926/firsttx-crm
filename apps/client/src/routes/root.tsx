import { redirect } from 'react-router';
import { getAuth } from '@/lib/auth';
import LandingPage from './landing';

export async function loader() {
  const auth = await getAuth();
  if (auth) {
    throw redirect('/dashboard');
  }
  return null;
}

export default LandingPage;
