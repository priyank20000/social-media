"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Image as ImageIcon, Smile, ArrowLeft, Paperclip, Mic, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  image?: string;
  audio?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: { name: string; avatar: string }[];
}

export function GroupChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const [users] = useState<ChatUser[]>([
    {
      id: "1",
      name: "Sarah Smith",
      avatar: "/images/user/sara.jpeg",
      lastMessage: "Hey! How's it going?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
      online: true
    },
    {
      id: "2",
      name: "Mike Johnson",
      avatar: "/images/user/mike.jpg",
      lastMessage: "The analytics look great!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unread: 0,
      online: true
    },
    {
      id: "3",
      name: "Design Team",
      avatar: "/images/user/mike.jpg",
      lastMessage: "New project discussion",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 45),
      unread: 5,
      online: true,
      isGroup: true,
      members: [
        { name: "Sarah Smith", avatar: "/images/user/sara.jpeg" },
        { name: "Mike Johnson", avatar: "/images/user/mike.jpg" },
        { name: "John Doe", avatar: "/images/user/travel.jpg" }
      ]
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        content: "Hey! How's it going?",
        sender: {
          name: "Sarah Smith",
          avatar: "/images/user/sara.jpeg"
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
      },
      {
        id: "2",
        content: "Just checking the latest stats!",
        sender: {
          name: "You",
          avatar: "/images/user/mike.jpg"
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 4)
      }
    ],
    "2": [
      {
        id: "1",
        content: "The analytics look great!",
        sender: {
          name: "Mike Johnson",
          avatar: "/images/user/mike.jpg"
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        image: "/images/image95.jpg"
      }
    ],
    "3": [
      {
        id: "1",
        content: "Let's discuss the new project!",
        sender: {
          name: "Sarah Smith",
          avatar: "/images/user/sara.jpeg"
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
      },
      {
        id: "2",
        content: "I've prepared some mockups",
        sender: {
          name: "Mike Johnson",
          avatar: "/images/user/mike.jpg"
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 44)
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat, messages]);

  const handleSend = () => {
    if (!selectedChat || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: "You",
        avatar: "/images/user/sara.jpeg"
      },
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), message]
    }));
    setNewMessage("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const message: Message = {
          id: Date.now().toString(),
          content: "",
          sender: {
            name: "You",
            avatar: "/images/user/sara.jpeg"
          },
          timestamp: new Date(),
          image: e.target?.result as string
        };

        setMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), message]
        }));
      };
      reader.readAsDataURL(file);
    }

    if (file.type.startsWith('audio/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const message: Message = {
          id: Date.now().toString(),
          content: "",
          sender: {
            name: "You",
            avatar: "/images/user/sara.jpeg"
          },
          timestamp: new Date(),
          audio: e.target?.result as string
        };

        setMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), message]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const onEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Chat List */}
      <div className={`w-full md:w-80 border-r ${selectedChat && isMobile ? 'hidden' : 'block'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {users.map(user => (
            <div
              key={user.id}
              className={`p-4 flex items-center gap-3 hover:bg-accent cursor-pointer ${
                selectedChat === user.id ? 'bg-accent' : ''
              }`}
              onClick={() => setSelectedChat(user.id)}
            >
              <div className="relative">
                {user.isGroup ? (
                  <div className="relative w-10 h-10">
                    <div className="absolute top-0 left-0 w-7 h-7">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={user.members?.[0].avatar} />
                        <AvatarFallback>{user.members?.[0].name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-0 right-0 w-7 h-7">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={user.members?.[1].avatar} />
                        <AvatarFallback>{user.members?.[1].name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ) : (
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate flex items-center gap-2">
                    {user.name}
                    {user.isGroup && <Users className="w-4 h-4" />}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {user.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
              </div>
              {user.unread > 0 && (
                <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  {user.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            {users.find(u => u.id === selectedChat)?.isGroup ? (
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <div className="absolute top-0 left-0 w-7 h-7">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={users.find(u => u.id === selectedChat)?.members?.[0].avatar} />
                      <AvatarFallback>{users.find(u => u.id === selectedChat)?.members?.[0].name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={users.find(u => u.id === selectedChat)?.members?.[1].avatar} />
                      <AvatarFallback>{users.find(u => u.id === selectedChat)?.members?.[1].name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {users.find(u => u.id === selectedChat)?.name}
                    <Users className="w-4 h-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {users.find(u => u.id === selectedChat)?.members?.length} members
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Avatar>
                  <AvatarImage
                    src={users.find(u => u.id === selectedChat)?.avatar}
                    alt={users.find(u => u.id === selectedChat)?.name}
                  />
                  <AvatarFallback>
                    {users.find(u => u.id === selectedChat)?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {users.find(u => u.id === selectedChat)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {users.find(u => u.id === selectedChat)?.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages[selectedChat]?.map(message => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender.name === "You" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] ${
                    message.sender.name === "You"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  } rounded-2xl p-3`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared image"
                      className="rounded-lg mb-2 max-w-full cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(message.image, '_blank')}
                    />
                  )}
                  {message.audio && (
                    <audio controls className="w-full">
                      <source src={message.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {message.content}
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,audio/*"
                onChange={handleFileUpload}
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="end">
                  <Picker 
                    data={data} 
                    onEmojiSelect={onEmojiSelect}
                    theme="light"
                    set="apple"
                  />
                </PopoverContent>
              </Popover>
              {newMessage.trim() ? (
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleVoiceRecord}
                  className={isRecording ? "text-red-500" : ""}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Select a chat</h3>
            <p className="text-muted-foreground">Choose a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}