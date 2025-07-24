'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const router = useRouter();

  const handleLibraryClick = () => {
    router.push('/library');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: messageInput };
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessageInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...chatMessages, userMessage].map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })) }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.text();
      const aiMessage: Message = { sender: 'ai', text: data };
      setChatMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Error: Could not get a response from the AI.' }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Library Button */}
      <button
        onClick={handleLibraryClick}
        style={{
          margin: '10px',
          padding: '10px 15px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          alignSelf: 'flex-end',
        }}
      >
        Go to Library
      </button>

      {/* Chat messages display area */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message input area */}
      <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
