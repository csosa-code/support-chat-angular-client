# Support Chat Client (Angular)

Frontend de un sistema de chat en tiempo real para soporte técnico, desarrollado con **Angular**, **SignalR** y **TailwindCSS**.

Este cliente permite a usuarios y agentes interactuar en tiempo real mediante WebSockets, consumiendo la API construida en .NET.

---

## 🧠 Descripción del proyecto

Aplicación web que permite:

- Usuarios iniciar un chat de soporte
- Agentes gestionar múltiples conversaciones en tiempo real
- Comunicación bidireccional instantánea con SignalR
- Visualización de historial de mensajes

---

## 🏗️ Arquitectura

El proyecto sigue una estructura modular basada en features:

- `core/`
  → Servicios globales (SignalR)

- `features/`
  → Funcionalidades principales
    - home
    - user-identification
    - user-chat
    - admin-panel

- `shared/`
  → Modelos e interfaces (Chat, Message)

---

## ⚙️ Stack Tecnológico

- Angular 21
- SignalR Client (@microsoft/signalr)
- TailwindCSS
- TypeScript
- RxJS
- Docker + Nginx

---

## 🔄 Flujo de comunicación

Usuario / Agente
│
▼
Angular App
│
▼
SignalR Service
│
▼
.NET API (ChatHub)

- El frontend se conecta al **SignalR Hub**
- Se envían y reciben mensajes en tiempo real
- Cada chat se maneja mediante grupos (rooms)

---

## 🧩 Componentes principales

### 🟣 ChatSignalrService

Encapsula toda la comunicación con SignalR:

- Conexión al Hub
- Invocación de métodos del backend
- Suscripción a eventos en tiempo real

Métodos principales:
- `createChat()`
- `joinChat()`
- `sendMessage()`
- `loadChatHistory()`
- `getActiveChats()`

Eventos:
- `ReceiveMessage`
- `ChatHistory`
- `NewChatCreated`
- `ActiveChats`

---

### 🟢 User Flow

#### 1. Identificación
- Usuario ingresa nombre y email
- Se crea o reutiliza un chat

#### 2. Chat en tiempo real
- Envío de mensajes
- Recepción instantánea de respuestas
- Carga de historial

---

### 🟡 Admin Panel

- Visualización de chats activos
- Selección de conversación
- Respuesta en tiempo real
- Manejo de múltiples chats

---

## 📦 Funcionalidades implementadas

### 💬 Chat en tiempo real
- WebSockets con SignalR
- Comunicación bidireccional
- Actualización instantánea

---

### 👤 Gestión de usuario
- Identificación básica (nombre + email)
- Persistencia en localStorage
- Reutilización de sesiones

---

### 🧠 Historial de mensajes
- Carga automática al abrir chat
- Orden cronológico
- Sincronización con backend

---

### 🧑‍💻 Panel de agentes
- Lista de chats activos
- Notificación de nuevos chats
- Manejo simultáneo de conversaciones

---

### 🎨 UI moderna
- TailwindCSS
- Diseño responsive
- Dark mode
- UX tipo chat profesional

---

## ▶️ Ejecución local

```bash id="run-angular"
npm install
ng serve
