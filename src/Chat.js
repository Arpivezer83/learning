// src/Chat.js
import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setThinking(true);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Te egy barátságos és türelmes AI tanár vagy, aki segít a tanulóknak megérteni a kérdéseiket.' },
          ...newMessages
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '[Hiba a válaszban]';
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
    setThinking(false);
  };

  return (
    <div className="chat-box">
      <h2>Tanulói Chat</h2>
      <div className="messages">
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role === 'user' ? 'Te' : 'Tanár'}:</strong> {m.content}</p>
        ))}
        {thinking && <p><em>Gondolkodom...</em></p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Írd be a kérdésed"
      />
      <button onClick={handleSend}>Küldés</button>
    </div>
  );
}
