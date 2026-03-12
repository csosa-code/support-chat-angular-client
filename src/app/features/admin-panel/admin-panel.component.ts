import { Component, inject, signal } from '@angular/core';
import { ChatSignalrService } from '../../core/services/chat-signalr.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-admin-panel',
  imports: [DatePipe],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export default class AdminPanelComponent { 

  private chatService = inject(ChatSignalrService);
  private router = inject(Router);
  chats = signal<any[]>([]);
  selectedChat = signal<any | null>(null);

  messages = signal<any[]>([]);
  messageInput = signal('');

  async ngOnInit() {

    await this.chatService.startConnection();

    await this.chatService.joinAgentPanel();

     // chats activos
  this.chatService.onActiveChats((chats) => {
    this.chats.set(chats);
    console.log('chats activos', chats);
  });

  this.chatService.getActiveChats();

  // nuevos chats
  this.chatService.onNewChat((chat) => {
    this.chats.update(list => [chat, ...list]);
  });

  // historial
  this.chatService.onChatHistory((history) => {
    this.messages.set(history);
  });

  // mensajes en tiempo real
  this.chatService.onReceiveMessage((sender, message) => {

    this.messages.update(list => [
      ...list,
      { sender, text: message }
    ]);

  });

  }

  openChat(chat: any) {
    this.selectedChat.set(chat);

    this.messages.set([]); // limpiar mensajes anteriores
  
    this.chatService.joinChat(chat.id); // 👈 MUY IMPORTANTE
  
    this.chatService.loadChatHistory(chat.id);

  }

  sendMessage() {

    const chat = this.selectedChat();
    if (!chat) return;

    const text = this.messageInput();
    if (!text.trim()) return;

    this.chatService.sendMessage(
      chat.id,
      'Agent',
      text
    );

    this.messageInput.set('');

  }

  closePanel() {
    this.selectedChat.set(null);
    this.messages.set([]);
    this.router.navigate(['/']);
  }
}
