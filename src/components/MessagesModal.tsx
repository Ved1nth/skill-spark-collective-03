import { useState, useEffect } from 'react';
import { X, MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

const MessagesModal = ({ isOpen, onClose, currentUser }: MessagesModalProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      loadConversations();
    }
  }, [isOpen, currentUser]);

  const loadConversations = () => {
    const allMessages = JSON.parse(localStorage.getItem('gta_messages') || '[]');
    const userConversations = new Map<string, Conversation>();

    allMessages.forEach((message: Message) => {
      if (message.senderId === currentUser.id || message.receiverId === currentUser.id) {
        const otherUserId = message.senderId === currentUser.id ? message.receiverId : message.senderId;
        const otherUserName = message.senderId === currentUser.id ? message.receiverName : message.senderName;
        const conversationId = [currentUser.id, otherUserId].sort().join('-');

        if (!userConversations.has(conversationId)) {
          userConversations.set(conversationId, {
            id: conversationId,
            participants: [currentUser.id, otherUserId],
            participantNames: [currentUser.fullName, otherUserName],
            lastMessage: message.content,
            lastMessageTime: message.timestamp,
            unreadCount: 0
          });
        }

        const conversation = userConversations.get(conversationId)!;
        if (new Date(message.timestamp) > new Date(conversation.lastMessageTime)) {
          conversation.lastMessage = message.content;
          conversation.lastMessageTime = message.timestamp;
        }

        if (!message.read && message.receiverId === currentUser.id) {
          conversation.unreadCount++;
        }
      }
    });

    const conversationsList = Array.from(userConversations.values())
      .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

    setConversations(conversationsList);
  };

  const loadMessages = (conversationId: string) => {
    const allMessages = JSON.parse(localStorage.getItem('gta_messages') || '[]');
    const conversationMessages = allMessages
      .filter((message: Message) => message.conversationId === conversationId)
      .sort((a: Message, b: Message) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Mark messages as read
    const updatedMessages = allMessages.map((message: Message) => {
      if (message.conversationId === conversationId && message.receiverId === currentUser.id) {
        return { ...message, read: true };
      }
      return message;
    });

    localStorage.setItem('gta_messages', JSON.stringify(updatedMessages));
    setMessages(conversationMessages);
    loadConversations(); // Refresh conversations to update unread counts
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;

    const receiverId = conversation.participants.find(id => id !== currentUser.id);
    const receiverName = conversation.participantNames.find(name => name !== currentUser.fullName);

    const message: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      receiverId: receiverId!,
      receiverName: receiverName!,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    const allMessages = JSON.parse(localStorage.getItem('gta_messages') || '[]');
    allMessages.push(message);
    localStorage.setItem('gta_messages', JSON.stringify(allMessages));

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    loadConversations();
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[600px] mx-auto flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {getTotalUnreadCount() > 0 && (
              <Badge variant="secondary" className="w-fit">
                {getTotalUnreadCount()} unread
              </Badge>
            )}
          </CardHeader>
          
          <ScrollArea className="h-[500px]">
            <div className="p-4 pt-0 space-y-2">
              {conversations.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No conversations yet</p>
                  <p className="text-sm">Start connecting with people!</p>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const otherUserName = conversation.participantNames.find(name => name !== currentUser.fullName);
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation.id);
                        loadMessages(conversation.id);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id 
                          ? 'bg-primary/10 border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {otherUserName?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">{otherUserName}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="text-xs mt-1 h-5">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {conversations.find(c => c.id === selectedConversation)?.participantNames.find(name => name !== currentUser.fullName)}
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === currentUser.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === currentUser.id 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MessagesModal;