import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ChatSignalrService } from '../../core/services/chat-signalr.service';

@Component({
  selector: 'app-user-identification',
  imports: [],
  templateUrl: './user-identification.component.html',
  styleUrl: './user-identification.component.scss',
})
export default class UserIdentificationComponent { 

  private router = inject(Router);
  private chatService = inject(ChatSignalrService);

  userName = signal('');
  email = signal('');

  async startChat() {

    await this.chatService.startConnection();

    this.chatService.createChat(this.userName(), this.email())
      .then((chat: any) => {

        localStorage.setItem('chatId', chat.id);
        localStorage.setItem('userName', this.userName());
        localStorage.setItem('email', this.email());
        localStorage.setItem('chat', JSON.stringify(chat));

        this.router.navigate(['/chat']);
      });

  }

  closeChat() {
    this.router.navigate(['/']);
  }
}
