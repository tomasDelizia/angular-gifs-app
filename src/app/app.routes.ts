import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Lazy loading de componentes
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },
      // Paths con argumentos de búsqueda
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history-page/gif-history-page.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
