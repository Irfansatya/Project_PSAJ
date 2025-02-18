import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

export const routes: RouteDefinition[] = [
  {
    path: '/profile',
    component: lazy(() => import('./pages/Profile')), // Tambahkan Profile Page
  },
  {
    path: '/',
    component: lazy(() => import('./pages/Beranda')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
