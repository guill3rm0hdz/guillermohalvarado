import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen flex flex-col justify-center items-center px-6 bg-brand-white relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl -z-10"></div>
      
      <div class="text-center max-w-2xl">
        <span class="text-brand-orange font-black text-9xl md:text-[12rem] leading-none tracking-tighter opacity-20 block mb-8">404</span>
        <h1 class="text-4xl md:text-6xl font-black text-brand-blue-dark mb-6 tracking-tight leading-none">Página no encontrada.</h1>
        <p class="text-xl text-brand-blue-light/70 mb-12 font-light leading-relaxed">
          Parece que has llegado a un territorio inexplorado. No te preocupes, incluso los mejores exploradores digitales necesitan un mapa de vez en cuando.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <a routerLink="/" mat-flat-button class="!bg-brand-orange !text-brand-white !px-10 !py-8 !text-lg !rounded-2xl !font-bold btn-premium">
            Volver al inicio
          </a>
          <a href="https://www.linkedin.com/in/guillermoHAlvarado" target="_blank" mat-stroked-button class="!border-brand-blue-dark/10 !text-brand-blue-dark !px-10 !py-8 !text-lg !rounded-2xl !font-bold">
            Reportar error
          </a>
        </div>
      </div>

      <!-- Bottom footer indicator -->
      <div class="absolute bottom-12 text-brand-gray/40 text-xs font-bold uppercase tracking-[0.3em]">
        Guillermo HAlvarado &copy; 2026
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NotFoundComponent {}
