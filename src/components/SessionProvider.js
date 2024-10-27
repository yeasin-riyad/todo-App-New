"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

const SessionProvider = ({ children, session }) => {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
