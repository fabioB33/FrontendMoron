import React from 'react';
import { Bot } from 'lucide-react';
import { useAI } from '../contexts/AIContext';

export const AIAssistantTrigger = () => {
  const { toggleAI, isOpen } = useAI();

  if (isOpen) return null;

  return (
    <button
      data-testid="ai-assistant-trigger"
      onClick={toggleAI}
      className="fixed bottom-6 right-6 h-14 w-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-[9999] cursor-pointer group"
      aria-label="Abrir asistente de IA"
    >
      <Bot className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full animate-pulse" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Asistente Virtual
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-slate-900 transform rotate-45 -translate-y-1/2" />
      </div>
    </button>
  );
};