import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile',
    component: lazy(() => import('./pages/Profile')), // Tambahkan Profile Page
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
