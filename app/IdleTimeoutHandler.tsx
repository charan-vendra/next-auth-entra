"use client";

import { useIdleTimeout } from 'use-idle-timeout';
import { signOut } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const IdleTimeoutHandler = () => {
  const handleIdle = () => {
    signOut();
    redirect('/api/auth/signin');
  };

  useIdleTimeout(30000, handleIdle);

  return null;
};

export default IdleTimeoutHandler;
