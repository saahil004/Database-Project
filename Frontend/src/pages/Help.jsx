import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Help = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! FoodHub Bot powered by Llama3.2. Ask about menu, prices, orders! Type your question 👇' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFallbackReply = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('order') || lowerInput.includes('buy')) {
      return 'Great! Browse /menu, add to cart, login to checkout. Fast delivery! 🚀 What would you like?';
    }
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return 'Prices start $5-25. Pizza $12, Burger $8, Biryani $15. See /menu for details or ask specific dish!';
    }
    if (lowerInput.includes('burger')) {
      return 'Classic Beef Burger $8.99 with fries! 🔥 Spicy option $9.99. Add to cart on /menu?';
    }
    if (lowerInput.includes('pizza')) {
      return 'Margherita Pizza $11.99 (12"), Pepperoni $13.99. Large family $18.99. Order now? 🍕';
    }
    if (lowerInput.includes('login')) {
      return 'Login at /customerlogin. New? Register at /customerregister. Quick 30s process!';
    }
    if (lowerInput.includes('delivery')) {
      return '30-45 min delivery. Free over $20! Track live on /myorders after login.';
    }
    if (lowerInput.includes('menu')) {
      return 'Full menu at /menu - Pizza, Burgers, Chinese, Biryani, Drinks. Deals section too!';
    }
    return 'Good question! Check /menu for full details or ask specifically (pizza price?). Ready to order?';
  };

  const handleSend = async () => {
    if (input.trim() === '' || isTyping) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:3000/api/v1/chat', {
        message: userMsg,
        conversation: messages.slice(-3)
      });

      const reply = res.data.data.reply;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error(error);
      const fallbackReplies = [
        "Browse /menu to see all items & prices!",
        "Login at /customerlogin to order.",
        "Pizza $12, Burger $8. Check /menu!",
        "Fast delivery! Add to cart now.",
        "New deals today. What would you like?"
      ];
      const fallback = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-orange-50">
      <div className="max-w-md mx-auto mt-8">
        <Link to="/" className="flex items-center text-orange-600 hover:text-orange-700 mb-6 font-medium">
          <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Home
        </Link>

        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border">
          <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-3xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 flex-1">FoodHub Bot</h2>
            </div>
          </div>

          <div className="h-96 p-4 space-y-3 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm ${m.role === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-100 border'}`}>
                  <p className="text-sm">{m.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border px-4 py-3 rounded-2xl shadow-sm animate-pulse">
                  <div className="h-5 bg-gray-300 rounded animate-pulse w-24"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4">
            <div className="flex">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about pizza, prices, delivery..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none pr-12"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={input.trim() === '' || isTyping}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600 disabled:opacity-50 w-8 h-8 flex items-center justify-center"
              >
                ▶
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Llama3.2 • Works offline with fallbacks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

