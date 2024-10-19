'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const doctors = [
  { id: 1, name: 'John Doe', specialty: 'General Practitioner', avatarUrl: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Jane Smith', specialty: 'Pediatrician', avatarUrl: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Mike Johnson', specialty: 'Cardiologist', avatarUrl: '/placeholder.svg?height=40&width=40' },
];

export default function ChatBotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isChatWithAI, setIsChatWithAI] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // Popup state

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Automatically close popup after 30 seconds if not clicked
    const timer = setTimeout(() => setShowPopup(false), 30000); // 30 seconds = 30000 milliseconds
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');

      if (isChatWithAI) {
        // Send message to OpenAI API
        try {
          const response = await fetch('/api/chatgpt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
          });

          const data = await response.json();

          if (response.ok) {
            setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
          } else {
            setMessages(prev => [...prev, { text: 'Error: Failed to get a response from AI', isUser: false }]);
          }
        } catch (error) {
          setMessages(prev => [...prev, { text: 'No HIPPA Approved API key found', isUser: false }]);
        }
      } else if (selectedDoctor) {
        // Simulate doctor's response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: `Thank you for your message. This is Dr. ${selectedDoctor.name}. How can I assist you today?`,
            isUser: false
          }]);
        }, 1000);
      }
    }
  };

  const handleDoctorSelect = (doctorId) => {
    const doctor = doctors.find(d => d.id.toString() === doctorId);
    setSelectedDoctor(doctor);
    setMessages([]);
    setIsChatWithAI(false);
  };

  const handleAIChat = () => {
    setSelectedDoctor(null);
    setIsChatWithAI(true);
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showPopup && ( // Popup logic
        <div className="fixed bottom-20 right-4 bg-primary text-white p-4 rounded-lg shadow-lg animate-bounce">
          <p className="font-semibold text-sm">👋 Hey there! Need help? Ask Doc Bot!</p>
          <Button variant="ghost" size="icon" onClick={() => setShowPopup(false)} aria-label="Close popup">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {isOpen ? (
        <div className="bg-white rounded-full shadow-xl w-80 h-96 flex flex-col"> {/* Fully rounded chatbot box */}
          <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center rounded-t-full">
            <div className="flex items-center space-x-2">
              {selectedDoctor ? (
                <>
                  <Avatar>
                    <AvatarImage src={selectedDoctor.avatarUrl} alt={selectedDoctor.name} />
                    <AvatarFallback>{selectedDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Dr. {selectedDoctor.name}</h3>
                    <p className="text-xs">{selectedDoctor.specialty}</p>
                  </div>
                </>
              ) : (
                <h3 className="font-semibold">{isChatWithAI ? 'Ask Doc Bot' : 'Select a Doctor'}</h3>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!selectedDoctor && !isChatWithAI ? (
            <div className="p-4">
              <Select onValueChange={handleDoctorSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      Dr. {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAIChat} className="w-full mt-4">
                Ask Doc Bot
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-grow p-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    aria-label="Chat message"
                  />
                  <Button type="submit" size="icon" aria-label="Send message">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full h-12 w-12"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
