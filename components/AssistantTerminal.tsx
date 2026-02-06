
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Send, Cpu } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { Message } from '../types';

const AssistantTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'System Node Aryaura initialized. Connection secure. How can I assist your inquiry into Aryan\'s architecture today?', 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await chatWithAssistant(input);
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString()
    }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform active:scale-95 group"
      >
        <div className="absolute -top-12 right-0 bg-black/80 border border-white/10 px-3 py-1 text-[10px] mono text-cyan-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          QUERY_ARYAURA
        </div>
        <Cpu className="w-6 h-6 animate-pulse" />
      </button>
    );
  }

  return (
    <div className={`fixed z-[100] transition-all duration-300 ${isMinimized ? 'bottom-8 right-8 w-64 h-12' : 'bottom-8 right-8 w-[90vw] md:w-[400px] h-[500px]'} glass border-cyan-500/30 flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/10`}>
      {/* Header */}
      <div className="bg-cyan-500/10 border-b border-cyan-500/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Aryaura Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/5 rounded text-slate-500 transition-colors">
            <Minimize2 className="w-3 h-3" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/5 rounded text-slate-500 transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 mono text-xs scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-sm border ${msg.role === 'user' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-50' : 'bg-white/5 border-white/5 text-slate-300'}`}>
                  <div className="text-[9px] opacity-40 mb-1">{msg.role === 'user' ? 'GUEST' : 'SYSTEM_NODE'} • {msg.timestamp}</div>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 text-cyan-500 items-center">
                <span className="w-1 h-1 bg-cyan-500 animate-ping"></span>
                <span className="text-[10px] mono opacity-60">PROCESSING_QUERY...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command or query..."
              className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-xs mono focus:outline-none focus:border-cyan-500/50 text-white placeholder:text-slate-600"
            />
            <button type="submit" disabled={isLoading} className="p-2 bg-cyan-500 text-black hover:bg-white transition-colors disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AssistantTerminal;
