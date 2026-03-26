import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-privacy',
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
        <span class="text-xs font-black uppercase tracking-widest text-brand-gray/60">Privacidad</span>
      </nav>

      <main class="max-w-4xl mx-auto pt-32 pb-24 px-6">
        <header class="mb-20 text-center md:text-left">
          <h1 class="text-5xl md:text-7xl font-black text-brand-blue-dark tracking-tighter leading-none mb-6">Política de Privacidad</h1>
          <p class="text-xl text-brand-blue-light/70 font-light">Última actualización: 26 de marzo de 2026</p>
        </header>

        <section class="space-y-16">
          <div class="prose prose-xl max-w-none prose-headings:text-brand-blue-dark prose-p:text-brand-blue-light/80 prose-strong:text-brand-blue-dark prose-strong:font-bold">
            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mb-8 text-sm">01. Compromiso</h2>
            <p class="text-xl leading-relaxed">
              Como <strong>Guillermo HAlvarado</strong>, valoro tu privacidad tanto como valoro el buen diseño. Este documento detalla cómo manejo la información que proporcionas al interactuar con mi portafolio digital.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">02. Recolección de Datos</h2>
            <p class="text-xl leading-relaxed">
              Este sitio web es principalmente informativo. No recolecto datos personales de forma automatizada, a excepción de:
            </p>
            <ul class="list-disc pl-6 space-y-4 text-brand-blue-light/70 text-lg">
              <li><strong>Formularios de contacto:</strong> Si decides enviarme un correo, usaré tu nombre y dirección solo para responderte.</li>
              <li><strong>Analítica básica:</strong> Puedo usar herramientas que analizan de dónde vienen las visitas para mejorar la experiencia de usuario.</li>
            </ul>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">03. Uso de Cookies</h2>
            <p class="text-xl leading-relaxed">
              Utilizo cookies técnicas necesarias para que el sitio funcione correctamente (como guardar tus preferencias de navegación). No utilizo cookies de seguimiento publicitario de terceros.
            </p>

            <h2 class="text-2xl font-black uppercase tracking-widest text-brand-orange mt-16 mb-8 text-sm">04. Seguridad</h2>
            <p class="text-xl leading-relaxed">
              Implemento protocolos de seguridad estándar (SSL) para asegurar que cualquier interacción a través de este sitio sea privada y segura.
            </p>
          </div>
        </section>
      </main>

      <!-- Footer indicator -->
      <footer class="py-12 border-t border-brand-blue-dark/5 text-center px-6">
        <p class="text-brand-gray/40 text-xs font-bold uppercase tracking-[0.3em]">
          Guillermo HAlvarado &copy; 2026 &mdash; Diseño y Código
        </p>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class PrivacyComponent { }
