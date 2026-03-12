import { Component, inject, signal } from '@angular/core';
import { ChatSignalrService } from '../../core/services/chat-signalr.service';

@Component({
  selector: 'app-user-chat',
  imports: [],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export default class UserChatComponent {
  private chatService = inject(ChatSignalrService);

  chatId = localStorage.getItem('chatId') || '';
  userName = localStorage.getItem('userName') || '';

  messages = signal<any[]>([]);
  messageInput = signal('');

  async ngOnInit() {

    await this.chatService.startConnection();
    await this.chatService.joinChat(this.chatId);

    // escuchar mensajes nuevos
    this.chatService.onReceiveMessage((sender, message) => {

      console.log('mensaje recibido', sender, message);

      try {
    
        const updated = [
          ...this.messages(),
          { sender, text: message }
        ];
    
        this.messages.set(updated);
    
        console.log('mensajes ahora', this.messages());
    
      } catch (error) {
    
        console.error('error actualizando messages', error);
    
      }
    });

    // cargar historial
    this.chatService.onChatHistory((history) => {

      console.log('historial recibido', history);
  
      this.messages.set(history);
  
    });
  
    // solicitar historial
    this.chatService.loadChatHistory(this.chatId);

  }

  sendMessage() {

    if (!this.messageInput().trim()) return;

    this.chatService.sendMessage(
      this.chatId,
      this.userName,
      this.messageInput()
    );

    this.messageInput.set('');

  }
 }
