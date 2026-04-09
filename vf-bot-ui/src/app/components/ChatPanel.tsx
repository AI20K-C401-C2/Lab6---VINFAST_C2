import { motion } from 'motion/react';
import { MessageBubble } from './MessageBubble';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Car } from '../types/car';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isViviTyping?: boolean;
  onBackToHome?: () => void;
  selectedCar?: Car;
}

export function ChatPanel({ messages, onSendMessage, isViviTyping, onBackToHome, selectedCar }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isViviTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  // Dynamic placeholder based on conversation context
  const getPlaceholder = () => {
    if (selectedCar) {
      return `Hỏi thêm về ${selectedCar.name}...`;
    }
    if (messages.length === 0) {
      return 'Bạn quan tâm dòng xe nào? VF 5, VF 8, VF 9...';
    }
    return 'Nhập tin nhắn...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="h-full flex flex-col min-h-0 backdrop-blur-xl bg-white/70 border-r border-white/50 shadow-2xl"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-gray-200/60 bg-white/60">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBackToHome}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100/80 transition-colors"
            title="Quay lại trang chủ"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>

          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">Trợ lý Vivi</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">Đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages — flex-1 + min-h-0 ensures proper scroll containment */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 scroll-smooth">
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}

          {/* Typing indicator */}
          {isViviTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-400 ml-1">Vivi đang soạn...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200/60 bg-white/60">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isViviTyping}
              placeholder={isViviTyping ? 'Vivi đang trả lời...' : getPlaceholder()}
              className="w-full px-5 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm sm:text-base text-gray-900 placeholder:text-gray-400 disabled:opacity-70 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          <motion.button
            whileHover={!isViviTyping ? { scale: 1.05 } : {}}
            whileTap={!isViviTyping ? { scale: 0.95 } : {}}
            type="submit"
            disabled={!inputValue.trim() || isViviTyping}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
