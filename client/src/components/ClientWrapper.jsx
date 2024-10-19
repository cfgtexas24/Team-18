// components/ClientWrapper.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext';
import Banner from './banner';
import ChatBotComponent from './chat-bot';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientWrapper({ children }) {
  const [isInAdminRoute, setIsInAdminRoute] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    setIsInAdminRoute(pathName.includes('/admin'));
  }, [pathName]);

  return (
    <AuthProvider>
      <Banner />
      {children}
      {!isInAdminRoute && <ChatBotComponent />}
      <div className="border-t border-primary-foreground/10 py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Abide. All rights reserved.</p>
      </div>
    </AuthProvider>
  );
}
