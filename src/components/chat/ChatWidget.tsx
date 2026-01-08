"use client";

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Hello! I am UniBot. How can I assist with your fleet order today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Smart Response Logic
        setTimeout(() => { // Simulate typo/thinking delay
            let botResponse = 'Thanks for your message. A human agent needs to review this. Please [Contact Us](/contact).';
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('track') || lowerInput.includes('order')) {
                botResponse = 'You can track real-time fleet shipments on our [Tracking Page](/track-order). Have your Order ID ready.';
            } else if (lowerInput.includes('return') || lowerInput.includes('exchange')) {
                botResponse = 'Our 30-day industrial guarantee covers you. Start a return at the [Returns Center](/returns).';
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponse = 'Hello! I am UniBot. I can help with tracking, returns, or product inquiries.';
            } else if (lowerInput.includes('human') || lowerInput.includes('agent')) {
                botResponse = 'For complex inquiries, please speak to our team directly via the [Contact Page](/contact) or call 555-123-4567.';
            }

            setMessages(prev => [...prev, { role: 'system', content: botResponse }]);
        }, 600);
    };

    // Helper to render markdown-like links (simple parser for this demo)
    const renderContent = (content: string) => {
        const linkMatch = content.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
            const [full, text, url] = linkMatch;
            const parts = content.split(full);
            return (
                <>
                    {parts[0]}
                    <a href={url} className="underline font-bold hover:text-red-400">{text}</a>
                    {parts[1]}
                </>
            );
        }
        return content;
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 bg-zinc-950 text-white rounded-full shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
            >
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                <MessageSquare size={24} />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-zinc-950 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
                            <span className="text-xs font-black">AI</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">UniBot Assistant</h4>
                            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Online
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-zinc-50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-zinc-950 text-white rounded-br-none' : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-sm'}`}>
                                {renderContent(msg.content)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions (only enable if empty input context for demo?) */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                    <button onClick={() => setInput('Track Order')} className="whitespace-nowrap px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase hover:bg-zinc-200">Track Order</button>
                    <button onClick={() => setInput('Return Policy')} className="whitespace-nowrap px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase hover:bg-zinc-200">Returns</button>
                    <button onClick={() => setInput('Speak to Human')} className="whitespace-nowrap px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase hover:bg-zinc-200">Human Agent</button>
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-3 border-t border-zinc-200 bg-white flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 p-2 bg-zinc-100 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                    <button type="submit" className="p-2 bg-zinc-950 text-white rounded-lg hover:bg-zinc-800">
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </>
    );
}
