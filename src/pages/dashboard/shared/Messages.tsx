import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

const conversations = [
  { id: 1, name: 'Dr. Sarah Smith', role: 'Cardiologist', lastMessage: 'Your test results look good!', time: '10:30 AM', unread: 2, online: true },
  { id: 2, name: 'John Doe', role: 'Patient', lastMessage: 'Thank you, doctor.', time: '9:15 AM', unread: 0, online: false },
  { id: 3, name: 'Dr. Michael Chen', role: 'General Physician', lastMessage: 'See you next week.', time: 'Yesterday', unread: 0, online: true },
  { id: 4, name: 'Jane Smith', role: 'Patient', lastMessage: 'Can I reschedule my appointment?', time: 'Yesterday', unread: 1, online: false },
];

const initialMessages = [
  { id: 1, sender: 'them', text: 'Hello! How can I help you today?', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Hi Dr. Smith, I wanted to discuss my recent lab results.', time: '10:05 AM' },
  { id: 3, sender: 'them', text: 'Of course! I reviewed your results this morning. Your cholesterol levels have improved significantly since your last test.', time: '10:08 AM' },
  { id: 4, sender: 'me', text: 'That\'s great news! Should I continue with the current medication?', time: '10:12 AM' },
  { id: 5, sender: 'them', text: 'Yes, please continue with Lisinopril 10mg daily. Your blood pressure is well controlled. Let\'s schedule a follow-up in 3 months.', time: '10:15 AM' },
  { id: 6, sender: 'them', text: 'Your test results look good!', time: '10:30 AM' },
];

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'them',
        text: 'Thanks for your message! I\'ll get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1500);
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex h-full gap-4">
        {/* Conversations List */}
        <Card className="w-80 shrink-0 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-2">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors',
                      selectedConversation.id === conv.id ? 'bg-primary/10' : 'hover:bg-muted'
                    )}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {conv.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="shrink-0">{conv.unread}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[70%] rounded-lg px-4 py-2',
                      message.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
