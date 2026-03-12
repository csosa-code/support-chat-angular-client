import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component')
    },
    {
        path: 'user',
        loadComponent: () => import('./features/user-identification/user-identification.component')
    },
    {
        path: 'chat',
        loadComponent: () => import('./features/user-chat/user-chat.component')
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin-panel/admin-panel.component')
    }
];
