import { useState, useEffect } from 'react';
import { ViviMascot } from './components/ViviMascot';
import { ChatPanel, Message } from './components/ChatPanel';
import { VisualPanel } from './components/VisualPanel';
import { CAR_DATA, Car } from './types/car';
import { motion, AnimatePresence } from 'motion/react';

type Stage = 'onboarding' | 'chat';
type DisplayMode = 'logo' | 'car';
type ViviState = 'neutral' | 'thinking' | 'excited';

export default function App() {
  const [stage, setStage] = useState<Stage>('onboarding');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('logo');
  const [viviState, setViviState] = useState<ViviState>('neutral');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | undefined>();
  const [backgroundType, setBackgroundType] = useState<'default' | 'mountain'>('default');
  const [isViviTyping, setIsViviTyping] = useState(false);

  const handleStartChat = async (intent?: 'price' | 'offers') => {
    setStage('chat');
    
    // Send initial context message to get a relevant greeting from the AI
    let contextMessage = "Xin chào";
    if (intent === 'price') contextMessage = "Cho tôi xem bảng giá xe VinFast mới nhất";
    if (intent === 'offers') contextMessage = "Cho tôi xem các ưu đãi hiện có của VinFast";

    handleSendMessage(contextMessage);
  };

  const handleBackToHome = () => {
    setStage('onboarding');
    setMessages([]);
    setDisplayMode('logo');
    setSelectedCar(undefined);
    setViviState('neutral');
    setIsViviTyping(false);
    setBackgroundType('default');
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async (message: string, skipUIUpdate: boolean = false) => {
    addMessage(message, true);
    setViviState('thinking');
    setIsViviTyping(true);

    const lowerMessage = message.toLowerCase();

    // UI UPDATE LOGIC: Detect car mentions to update the visual panel
    const extractMentionedCars = () => {
      const found: Car[] = [];
      CAR_DATA.forEach(car => {
        const idStr = car.id.replace('vf', '');
        if (lowerMessage.includes(`vf ${idStr}`) || lowerMessage.includes(`vf${idStr}`) || lowerMessage.includes(car.id)) {
          found.push(car);
        }
      });
      return found;
    };

    const mentionedCars = extractMentionedCars();

    // Automatically update display mode and selected car based on mentions
    if (!skipUIUpdate && mentionedCars.length > 0) {
      setSelectedCar(mentionedCars[0]);
      setDisplayMode('car');
      setBackgroundType('default');
    }

    // API INTEGRATION - Get response from Agent
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: message, 
          session_id: 'default_session_vn' 
        }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      setIsViviTyping(false);
      addMessage(data.reply, false);
      setViviState('neutral');
    } catch (error) {
      console.error('Chat API Error:', error);
      setIsViviTyping(false);
      addMessage('Rất tiếc, tôi đang mất kết nối với hệ thống tư vấn thông minh. Vui lòng thử lại sau giây lát!', false);
      setViviState('neutral');
    }
  };

  const handleTestDrive = () => {
    // Basic handler
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 'onboarding' && (
          <motion.div
            key="onboarding"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center p-8"
          >
            <ViviMascot stage="onboarding" onStartChat={handleStartChat} />
          </motion.div>
        )}

        {stage === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden"
          >
            {/* Left Panel - Chat */}
            <div className="min-h-0 h-full overflow-hidden">
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isViviTyping={isViviTyping}
                onBackToHome={handleBackToHome}
                selectedCar={selectedCar}
              />
            </div>

            {/* Right Panel - Visual (hidden on mobile, shown on md+) */}
            <div className="hidden md:block min-h-0 h-full overflow-hidden">
              <VisualPanel
                displayMode={displayMode}
                selectedCar={selectedCar}
                backgroundType={backgroundType}
                onTestDrive={handleTestDrive}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
