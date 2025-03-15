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
    path: '/booking',
    component: lazy(() => import('./pages/Booking')),
  },
  {
    path: '/booking2',
    component: lazy(() => import('./pages/BookingProses')),
  },
  {
    path: '/nota',
    component: lazy(() => import('./pages/Nota')),
  },
  {
    path: '/pembayaran',
    component: lazy(() => import('./pages/pembayaran')),
  },
  {
    path: '**',
    component: lazy(() => import('./error/404')),
  },
];
