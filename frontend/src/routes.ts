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
    path: '/admindashboard',
    component: lazy(() => import('./pages/admin/dashboard')),
  },
  {
    path: '/ba',
    component: lazy(() => import('./pages/bookingproses/ba')),
  },
  {
    path: '/ka',
    component: lazy(() => import('./pages/pembayaran/ka')),
  },
  {
    path: '/kamar1',
    component: lazy(() => import('./pages/kamar/a')),
  },
  {
    path: '/kamar2',
    component: lazy(() => import('./pages/kamar/b')),
  },
  { 
    path: '/kamar3',
    component: lazy(() => import('./pages/kamar/c')),
  },
  {
    path: '/kamar4',
    component: lazy(() => import('./pages/kamar/d')),
  },
  {
    path: '**',
    component: lazy(() => import('./error/404')),
  },
];
