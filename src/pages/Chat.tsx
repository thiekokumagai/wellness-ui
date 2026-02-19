import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react";
import { mockConversations, mockMessages, type Message } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Chat = () => {
  const [activeConvo, setActiveConvo] = useState(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMsg, setNewMsg] = useState("");
  const [search, setSearch] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      senderId: "me",
      text: newMsg,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
    }]);
    setNewMsg("");
  };

  const filteredConvos = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout type="professional">
      <div className="flex h-[calc(100vh-8rem)] -m-4 lg:-m-6 overflow-hidden rounded-lg border border-border bg-card">
        {/* Conversation list */}
        <aside className={cn(
          "flex w-full flex-col border-r border-border sm:w-80 sm:flex-shrink-0",
          showMobileChat ? "hidden sm:flex" : "flex"
        )}>
          {/* Header */}
          <div className="border-b border-border p-4">
            <h2 className="font-heading text-2xl text-foreground mb-3">MENSAGENS</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 bg-secondary border-0 text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConvos.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveConvo(c); setShowMobileChat(true); }}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-border p-4 text-left transition-all hover:bg-secondary/50",
                  activeConvo.id === c.id && "bg-primary/10 border-l-2 border-l-primary"
                )}
              >
                <div className="relative">
                  <img src={c.photo} alt={c.name} className="h-11 w-11 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-foreground truncate">{c.name}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground shadow-glow">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat window */}
        <div className={cn(
          "flex flex-1 flex-col",
          showMobileChat ? "flex" : "hidden sm:flex"
        )}>
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden mr-1 text-xs uppercase tracking-wider text-muted-foreground"
              onClick={() => setShowMobileChat(false)}
            >
              ←
            </Button>
            <div className="relative">
              <img src={activeConvo.photo} alt={activeConvo.name} className="h-9 w-9 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{activeConvo.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-primary">Online agora</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {/* Date separator */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Hoje</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.isMine ? "justify-end" : "justify-start")}>
                {!m.isMine && (
                  <img src={activeConvo.photo} alt="" className="h-7 w-7 rounded-full object-cover mr-2 mt-1 shrink-0" />
                )}
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5",
                  m.isMine
                    ? "gradient-primary text-primary-foreground rounded-br-sm shadow-glow"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                )}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p className={cn(
                    "mt-1 text-[10px] text-right",
                    m.isMine ? "text-primary-foreground/60" : "text-muted-foreground"
                  )}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-secondary border-0 text-sm"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-10 w-10 gradient-primary text-primary-foreground shadow-glow shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
