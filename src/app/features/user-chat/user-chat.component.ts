import { Component, inject, signal } from '@angular/core';
import { ChatSignalrService } from '../../core/services/chat-signalr.service';
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-chat',
  imports: [DatePipe],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export default class UserChatComponent {
  private chatService = inject(ChatSignalrService);
  private router = inject(Router);

  chatId = localStorage.getItem('chatId') || '';
  userName = localStorage.getItem('userName') || '';
  email = localStorage.getItem('email') || '';
  chat = JSON.parse(localStorage.getItem('chat') || '{}');

  messages = signal<any[]>([]);
  messageInput = signal('');

  async ngOnInit() {

    await this.chatService.startConnection();
    await this.chatService.joinChat(this.chatId);

   
    this.chatService.onReceiveMessage((sender, message) => {
      try {
        const updated = [
          ...this.messages(),
          { sender, text: message }
        ];
        this.messages.set(updated);

      } catch (error) {
        console.error('error actualizando messages', error);

      }
    });


    this.chatService.onChatHistory((history) => {
      this.messages.set(history);
    });


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

  closeChat() {
    localStorage.removeItem('chatId');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('chat');
    this.router.navigate(['/']);
  }
}
