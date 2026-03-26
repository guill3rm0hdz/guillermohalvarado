import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="bg-brand-white min-h-screen">
      <!-- Minimal Header -->
      <nav class="fixed top-0 w-full z-50 bg-brand-white/80 backdrop-blur-xl border-b border-brand-blue-dark/5 px-6 py-4 flex justify-between items-center">
        <a routerLink="/" class="flex items-center gap-2 group">
          <mat-icon class="text-brand-orange group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
          <span class="font-bold text-brand-blue-dark">Volver</span>
        </a>
        <span class="text-xs font-black uppercase tracking-widest text-brand-gray/60">Legales</span>
      </nav>

      <main class="max-w-4xl mx-auto pt-32 pb-24 px-6">
        <header class="mb-20 text-center md:text-left">
          <h1 class="text-5xl md:text-7xl font-black text-brand-blue-dark tracking-tighter leading-none mb-6 text-wrap break-words">Términos y Condiciones</h1>
          <p class="text-xl text-brand-blue-light/70 font-light">Última actualización: 26 de marzo de 2026</p>
        </header>

        <section class="space-y-16">
          <div class="prose prose-xl max-w-none prose-headings:text-brand-blue-dark prose-p:text-brand-blue-light/80 prose-strong:text-brand-blue-dark prose-strong:font-bold">
            
            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mb-8 text-sm">01. Uso del Sitio</h2>
            <p class="text-xl leading-relaxed">
              Este sitio web representa el portafolio profesional de <strong>Guillermo HAlvarado</strong>. Al navegar en él, aceptas las condiciones aquí descritas. El contenido es de carácter informativo sobre mis servicios y trayectoria.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">02. Propiedad Intelectual</h2>
            <p class="text-xl leading-relaxed">
              Todo el diseño, código, textos e imágenes mostrados en este portafolio son propiedad intelectual de Guillermo HAlvarado, a menos que se indique lo contrario. Queda prohibida su reproducción total o parcial sin autorización explícita por escrito.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">03. Alcance de los Servicios</h2>
            <p class="text-xl leading-relaxed">
              La visualización de proyectos en este sitio no garantiza la disponibilidad inmediata de servicios. Cada proyecto es único y requiere un acuerdo por separado donde se definirán entregables, tiempos y costos.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">04. Responsabilidad</h2>
            <p class="text-xl leading-relaxed">
              Me esfuerzo por mantener el sitio libre de errores y actualizado, pero no puedo garantizar la ausencia total de fallos técnicos o la exactitud absoluta de toda la información en tiempo real.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">05. Enlaces Externos</h2>
            <p class="text-xl leading-relaxed">
              Este portafolio contiene enlaces a sitios externos (LinkedIn, GitHub, Behance, etc.). No soy responsable del contenido o las políticas de privacidad de dichos terceros.
            </p>

          </div>
        </section>
      </main>

      <!-- Footer indicator -->
      <footer class="py-12 border-t border-brand-blue-dark/5 text-center px-6">
        <p class="text-brand-gray/40 text-xs font-bold uppercase tracking-[0.3em]">
          Guillermo HAlvarado &copy; 2026 &mdash; Playa del Carmen, MX
        </p>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class TermsComponent {}
