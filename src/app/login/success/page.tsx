import { Suspense } from 'react';
import LoginSuccessClient from './_client';

export default function Page() {
  return (
    <Suspense>
      <LoginSuccessClient />
    </Suspense>
  );
}
