import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { Button } from './ui/button';

export const AIAssistant = () => {
  const { isOpen, closeAI } = useAI();

  if (!isOpen) return null;

  return (
    <div
      data-testid="ai-assistant-panel"
      className="fixed bottom-24 right-6 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-[9998] animate-in slide-in-from-bottom-10 fade-in"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">Asistente Virtual</h3>
            <p className="text-blue-100 text-xs">Argentina Habilitaciones</p>
          </div>
        </div>
        <Button
          data-testid="ai-assistant-close-btn"
          variant="ghost"
          size="sm"
          onClick={closeAI}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Avatar Section */}
      <div className="flex-1 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 pointer-events-none" />
        
        {/* HeyGen Avatar Iframe */}
        <div className="relative h-full w-full p-4">
          <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border border-slate-200/50">
            <iframe
              src="https://embed.liveavatar.com/v1/2b725b38-89d0-4a59-bff4-50ae5dc98e50"
              allow="microphone"
              title="LiveAvatar Embed"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs text-slate-600 font-medium">
            Hacé clic en el avatar para comenzar
          </p>
        </div>
      </div>
    </div>
  );
};
