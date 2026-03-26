import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'politica-de-privacidad', 
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent) 
  },
  { 
    path: 'terminos-y-condiciones', 
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent) 
  },
  { 
    path: '404', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) 
  },
  { 
    path: '**', 
    redirectTo: '404' 
  }
];
