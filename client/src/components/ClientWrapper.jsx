// components/ClientWrapper.jsx
'use client';

import React from 'react';
import { AuthProvider } from './AuthContext';
import Banner from './banner';
import ChatBotComponent from './chat-bot';

export default function ClientWrapper({ children }) {
    return (
      <AuthProvider>
        <Banner />
        {children}
        <ChatBotComponent />
        <div className="border-t border-primary-foreground/10 py-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Abide. All rights reserved.</p>
        </div>
      </AuthProvider>
    );
}
