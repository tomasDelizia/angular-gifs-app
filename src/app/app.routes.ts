import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Lazy loading de componentes
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component')
  },
  {
    path: 'trending',
    loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
