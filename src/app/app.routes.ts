import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./features/home/home.component')
    },
    {
        path: 'user',
        title: 'Identificación de Usuario',
        loadComponent: () => import('./features/user-identification/user-identification.component')
    },
    {
        path: 'chat',
        title: 'Chat de Soporte',
        loadComponent: () => import('./features/user-chat/user-chat.component')
    },
    {
        path: 'admin',
        title: 'Chat de Agentes',
        loadComponent: () => import('./features/admin-panel/admin-panel.component')
    }
];
