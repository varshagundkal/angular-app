import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Home } from './features/dashboard/home/home';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Home
    },
    {
        path: 'signin',
        component: Login
    },
    {
        path: '**',
        redirectTo: 'signin'
    }
];
