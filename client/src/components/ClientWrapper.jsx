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
        </AuthProvider>
    );
}
