import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  
    loadComponent: () => import('./country.component').then(m => m.CountryComponent),
    data: {
      title: 'Countries'
    }
  }
];