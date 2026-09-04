import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Bot,
  User as UserIcon,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../services/api';
import type { AssistantAction } from '../types/auth';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actions?: AssistantAction[];
  timestamp: Date;
}

interface AiAssistantProps {
  isOpenExternal?: boolean;
  onToggleExternal?: () => void;
}

export default function AiAssistant({ isOpenExternal, onToggleExternal }: AiAssistantProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;
  const setIsOpen = (val: boolean) => {
    if (onToggleExternal) onToggleExternal();
    else setIsOpenInternal(val);
  };

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hi! I'm **EMIFlow Assistant**. I can help you find smartphones, compare flexible No-Cost EMI plans, and navigate anywhere across our catalog. How can I help you today?",
      actions: [
        { type: 'navigate', label: 'Browse Catalog', path: '/products' },
        { type: 'navigate', label: 'How It Works', path: '/how-it-works' },
      ],
      timestamp: new Date(),
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const quickPrompts = [
    'Find a phone',
    'Show iPhones',
    'Show Samsung phones',
    'How does EMI work?',
    'What is the cheapest phone?',
    'Open my profile',
  ];

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userText) setInput('');
    setLoading(true);

    try {
      // Extract current selected product if on /product/:slug
      let selectedProduct: string | null = null;
      if (location.pathname.startsWith('/product/')) {
        selectedProduct = location.pathname.replace('/product/', '');
      }

      const res = await api.chatWithAssistant({
        message: textToSend,
        context: {
          currentPath: location.pathname,
          selectedProduct,
        },
      });

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: res.message,
        actions: res.actions,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I'm having trouble connecting right now. You can continue browsing the catalog directly.",
        actions: [{ type: 'navigate', label: 'Browse Products', path: '/products' }],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (path: string) => {
    navigate(path);
    // On small mobile screens, minimize panel
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Conversation cleared. Feel free to ask me anything about our devices, EMI plans, or features!",
        actions: [
          { type: 'navigate', label: 'Browse Catalog', path: '/products' },
          { type: 'navigate', label: 'How It Works', path: '/how-it-works' },
        ],
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
          aria-label="Ask EMIFlow AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-orange-600" />
          </div>
          <span className="tracking-wide">Ask EMIFlow</span>
        </button>
      )}

      {/* Assistant Modal / Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 flex flex-col justify-end md:block">
          {/* Mobile backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel Container (380-420px on desktop) */}
          <div className="relative w-full md:w-[410px] h-[85vh] md:h-[580px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    EMIFlow Assistant
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-orange-500/30 text-orange-300 font-extrabold uppercase">
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Products, EMI plans & instant navigation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <Compass className="w-3 h-3" /> Prompts:
              </span>
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-orange-400 hover:text-orange-600 text-slate-600 text-xs shrink-0 transition-all active:scale-95 disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                        isUser
                          ? 'bg-slate-800 text-white'
                          : 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm'
                      }`}
                    >
                      {isUser ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`space-y-2 max-w-[82%]`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-slate-900 text-white rounded-tr-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs whitespace-pre-line'
                        }`}
                      >
                        {m.text}
                      </div>

                      {/* Action Buttons */}
                      {m.actions && m.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {m.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => handleActionClick(act.path)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs transition-colors shadow-2xs group"
                            >
                              <span>{act.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-orange-500" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Thinking Indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span className="font-semibold text-orange-600 animate-pulse">Thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about phones, EMI, or navigation..."
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-all shadow-sm active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
