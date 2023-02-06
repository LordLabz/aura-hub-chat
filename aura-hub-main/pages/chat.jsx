import React from 'react'

import { ChatEngine } from 'nextjs-chat-engine'

export default function App() {
    return (
        <ChatEngine
            publicKey={'8eefcdda-5f80-4f17-8eaf-8844f86d32f8'}
            userName={'KronicKatz'}
            userSecret={'KronicKatz'}
        />
    )
}