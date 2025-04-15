import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: '',
    loadComponent: () => import('./layout/default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then(m => m.routes),
        data: { title: 'Dashboard' }
      },
      {
        path: 'country',
        loadChildren: () => import('./views/country/routes').then(m => m.routes),
        data: { title: 'Countries' }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component)
  }
];