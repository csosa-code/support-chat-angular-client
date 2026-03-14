import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalrService {

  private hubConnection!: signalR.HubConnection;
  private readonly apiUrl = '/api-chat/hubs/chat';

  startConnection(): Promise<void> {

    if (this.hubConnection &&
        this.hubConnection.state === signalR.HubConnectionState.Connected) {
  
      return Promise.resolve();
    }
  
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl)
      .withAutomaticReconnect()
      .build();
  
    return this.hubConnection.start()
      .then(() => console.log('SignalR Connected'));
  }

  // Metodos

  createChat(userName: string, email: string) {
    return this.hubConnection.invoke('CreateChat', userName, email);
  }

  joinChat(chatId: string) {
    return this.hubConnection.invoke('JoinChat', chatId);
  }

  joinAgentPanel() {
    return this.hubConnection.invoke('JoinAgentPanel');
  }

  sendMessage(chatId: string, sender: string, message: string) {
    return this.hubConnection.invoke('SendMessage', chatId, sender, message);
  }


  loadChatHistory(chatId: string) {
    return this.hubConnection.invoke('LoadChatHistory', chatId);
  }

  getActiveChats() {
    return this.hubConnection.invoke('GetActiveChats');
  }

  // Eventos


  onReceiveMessage(callback: (sender: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  onChatHistory(callback: (messages: any[]) => void) {
    this.hubConnection.on('ChatHistory', callback);
  }


  onNewChat(callback: (chat: any) => void) {
    this.hubConnection.on('NewChatCreated', callback);
  }

  
  onActiveChats(callback: (chats: any[]) => void) {
    this.hubConnection.on('ActiveChats', callback);
  }



}
