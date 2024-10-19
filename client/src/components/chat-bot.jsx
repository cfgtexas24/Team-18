'use client';
import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatBotComponent({
  doctor
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const toggleChat = () => setIsOpen(!isOpen)

  const sendMessage = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput('')
      // Simulate doctor's response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: `Thank you for your message. ${doctor ? `This is Dr. ${doctor.name}.` : ''} How can I assist you today?`, 
          isUser: false 
        }])
      }, 1000)
    }
  }

  const doctorName = doctor?.name || 'Doctor'
  const doctorSpecialty = doctor?.specialty || 'Medical Professional'
  const doctorInitials = doctor?.name ? doctor.name.split(' ').map(n => n[0]).join('') : 'DR'

  return (
    (<div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div
            className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Avatar>
                {doctor?.avatarUrl ? (
                  <AvatarImage src={doctor.avatarUrl} alt={doctorName} />
                ) : (
                  <AvatarFallback>{doctorInitials}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-semibold">Dr. {doctorName}</h3>
                <p className="text-xs">{doctorSpecialty}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
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
                aria-label="Chat message" />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full h-12 w-12"
          aria-label="Open chat">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>)
  );
}