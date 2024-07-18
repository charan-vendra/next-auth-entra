"use client";

import { useIdleTimeout } from "use-idle-timeout";
import { signOut } from "next-auth/react";

const IdleTimeoutHandler = () => {
  const handleIdle = async () => await signOut();
  useIdleTimeout(5000, handleIdle);
  return null;
};

export default IdleTimeoutHandler;
