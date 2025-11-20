import { useState, useEffect } from 'react';
import { X, MessageCircle, Send, User, Phone, Video, Info, Search, ArrowLeft, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  type?: 'individual' | 'community';
}

interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'individual' | 'community';
  communityName?: string;
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
    const userCommunities = JSON.parse(localStorage.getItem('user_communities') || '[]');
    const userConversations = new Map<string, Conversation>();

    // Load individual messages
    allMessages.forEach((message: Message) => {
      if (message.type !== 'community' && (message.senderId === currentUser.id || message.receiverId === currentUser.id)) {
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
            unreadCount: 0,
            type: 'individual'
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

    // Load community conversations
    userCommunities.forEach((community: any) => {
      if (community.members.includes(currentUser.id)) {
        const communityMessages = allMessages.filter((m: Message) => 
          m.type === 'community' && m.conversationId === community.id
        );
        
        const lastMessage = communityMessages.sort((a: Message, b: Message) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0];

        if (lastMessage || communityMessages.length === 0) {
          userConversations.set(community.id, {
            id: community.id,
            participants: community.members,
            participantNames: [community.name],
            lastMessage: lastMessage?.content || 'No messages yet',
            lastMessageTime: lastMessage?.timestamp || new Date().toISOString(),
            unreadCount: communityMessages.filter((m: Message) => !m.read && m.senderId !== currentUser.id).length,
            type: 'community',
            communityName: community.name
          });
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const individualConversations = conversations.filter(c => c.type === 'individual');
  const communityConversations = conversations.filter(c => c.type === 'community');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 1) {
      return 'now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-0 md:p-4">
      <div className="w-full max-w-4xl h-full md:h-[600px] mx-auto bg-white dark:bg-gray-900 md:rounded-xl overflow-hidden shadow-2xl flex">
        {/* Conversations List - Instagram Style */}
        <div className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${selectedConversation ? 'hidden md:block' : 'block'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm">
                    {currentUser?.fullName?.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg md:text-xl font-semibold">{currentUser?.fullName?.split(' ')[0]}</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search" 
                className="pl-10 bg-gray-100 dark:bg-gray-800 border-none rounded-lg"
              />
            </div>
          </div>
          
          {/* Conversations */}
          <ScrollArea className="h-[calc(100vh-120px)] md:h-[490px]">
            <div className="p-0">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-500 py-12 md:py-16 px-4">
                  <MessageCircle className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-base md:text-lg font-medium">Your Messages</p>
                  <p className="text-sm">Send private messages to friends</p>
                </div>
              ) : (
                conversations.map((conversation) => {
                  const otherUserName = conversation.participantNames.find(name => name !== currentUser.fullName);
                  const isSelected = selectedConversation === conversation.id;
                  
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation.id);
                        loadMessages(conversation.id);
                      }}
                      className={`p-3 md:p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 ${
                        isSelected ? 'bg-gray-100 dark:bg-gray-800' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 md:h-14 w-12 md:w-14">
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                              {otherUserName?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 dark:text-white truncate text-sm md:text-base">
                              {otherUserName}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Messages Area - Instagram Style */}
        <div className={`flex-1 flex flex-col bg-white dark:bg-gray-900 ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="md:hidden p-2 mr-2"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 md:h-10 w-8 md:w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                        {conversations.find(c => c.id === selectedConversation)?.participantNames.find(name => name !== currentUser.fullName)?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                        {conversations.find(c => c.id === selectedConversation)?.participantNames.find(name => name !== currentUser.fullName)}
                      </h3>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                      <Phone className="h-4 md:h-5 w-4 md:w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                      <Video className="h-4 md:h-5 w-4 md:w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 md:block hidden">
                      <Info className="h-4 md:h-5 w-4 md:w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages - Instagram Style */}
              <ScrollArea className="flex-1 px-3 md:px-6 py-3 md:py-4 bg-white dark:bg-gray-900">
                <div className="space-y-3 md:space-y-4">
                  {messages.map((message, index) => {
                    const isFromMe = message.senderId === currentUser.id;
                    const showTime = index === 0 || 
                      new Date(message.timestamp).getTime() - new Date(messages[index - 1]?.timestamp).getTime() > 300000; // 5 minutes
                    
                    return (
                      <div key={message.id}>
                        {showTime && (
                          <div className="text-center text-xs text-gray-500 mb-3 md:mb-4">
                            {formatMessageTime(message.timestamp)}
                          </div>
                        )}
                        <div className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[280px] md:max-w-xs lg:max-w-sm px-3 md:px-4 py-2 rounded-2xl ${
                            isFromMe
                              ? 'bg-blue-500 text-white ml-2 md:ml-4'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-2 md:mr-4'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Message Input - Instagram Style */}
              <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="rounded-2xl border-gray-300 dark:border-gray-600 pl-4 pr-12 bg-gray-100 dark:bg-gray-800 border-none text-sm md:text-base py-2 md:py-2.5"
                    />
                    {newMessage.trim() && (
                      <Button
                        onClick={sendMessage}
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full h-6 w-6 p-1 touch-manipulation"
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Messages</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Send private messages to friends or groups. Start a conversation now.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;