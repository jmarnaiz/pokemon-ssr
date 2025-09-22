import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'pokemon',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pages/pokemon/pokemon-details/pokemon-details.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
