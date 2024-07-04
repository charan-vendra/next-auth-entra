"use client";

import { useIdleTimeout } from 'use-idle-timeout';
import { useRouter } from 'next/navigation';

const IdleTimeoutHandler = () => {
  const router = useRouter();
  const handleIdle = () => {
    router.push('/signout');
  };

  useIdleTimeout(10000, handleIdle);

  return null;
};

export default IdleTimeoutHandler;
