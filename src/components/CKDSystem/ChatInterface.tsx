import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { translate } from './utils/translate';
import { generateAIResponse } from './utils/aiResponse';
import type { ChatMessage } from './types';

interface ChatInterfaceProps {
  currentLanguage: string;
}

export function ChatInterface({ currentLanguage }: ChatInterfaceProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Initial greeting message
    const initialGreeting = translate(
      "Hello, I'm Dr. Asafo, an AI specialized in Chronic Kidney Disease. I'm here to help you understand CKD, fill out the form, and interpret your test results. How can I assist you today?",
      currentLanguage
    );
    setChatMessages([{ role: "ai", content: initialGreeting }]);
  }, [currentLanguage]);

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      setChatMessages(prev => [...prev, { role: "user", content: inputMessage }]);
      setInputMessage("");
      
      // Generate AI response
      const aiResponse = generateAIResponse(inputMessage, currentLanguage);
      setChatMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-[400px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleChatSubmit} className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={translate(
            "Ask Dr. Asafo about CKD, symptoms, treatments, or the form...",
            currentLanguage
          )}
          className="flex-1 border-blue-300 focus:border-blue-500"
        />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}