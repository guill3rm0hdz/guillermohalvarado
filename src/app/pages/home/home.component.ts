import { ChangeDetectionStrategy, Component, AfterViewInit, OnDestroy, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private lenis: any = null;
  private scrollTriggers: any[] = [];
  private rafId: number | null = null;
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const body = document.body;
    
    if (this.isMenuOpen) {
      body.style.overflow = 'hidden';
      this.animateMenuIn();
    } else {
      body.style.overflow = '';
      this.animateMenuOut();
    }
  }

  private async animateMenuIn() {
    const { gsap } = await import('gsap');
    const menu = this.elementRef.nativeElement.querySelector('.mobile-menu-overlay');
    const links = menu.querySelectorAll('.menu-link');
    
    gsap.to(menu, { 
      x: 0, 
      duration: 0.8, 
      ease: 'expo.out' 
    });
    
    gsap.fromTo(links, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    );
  }

  private async animateMenuOut() {
    const { gsap } = await import('gsap');
    const menu = this.elementRef.nativeElement.querySelector('.mobile-menu-overlay');
    
    gsap.to(menu, { 
      x: '100%', 
      duration: 0.6, 
      ease: 'expo.in' 
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Use requestAnimationFrame to wait for first paint, then init
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.initAnimations();
        });
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollTriggers.forEach(st => st.kill?.());
      this.scrollTriggers = [];
      if (this.rafId != null) {
        cancelAnimationFrame(this.rafId);
      }
      this.lenis?.destroy();
    }
  }

  private async initAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
    const { default: Lenis } = await import('lenis');
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // ──────────────────────────────────────────────
    // 0. LENIS SMOOTH SCROLL — optimized for responsiveness
    // ──────────────────────────────────────────────
    this.lenis = new Lenis({
      duration: 1.0,                  // Shorter = more responsive
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,           // Responsive touch on mobile
      infinite: false,
    });

    // Sync Lenis → ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    // Use a proper rAF loop for Lenis (more efficient than gsap.ticker)
    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);

    // Disable gsap lag smoothing so ScrollTrigger stays in lock-step
    gsap.ticker.lagSmoothing(0);

    const el = this.elementRef.nativeElement;

    // ──────────────────────────────────────────────
    // 0.5. Smooth page entrance (fade the whole page in)
    // ──────────────────────────────────────────────
    gsap.fromTo(el, 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // ──────────────────────────────────────────────
    // 1. HERO — Cinematic staggered reveal
    // ──────────────────────────────────────────────
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    
    const heroBadge = el.querySelector('.hero-badge');
    const heroTitle = el.querySelector('.hero-title');
    const heroSubtitle = el.querySelector('.hero-subtitle');
    const heroCta = el.querySelector('.hero-cta');
    const heroImage = el.querySelector('.hero-image');

    if (heroBadge) {
      heroTl.fromTo(heroBadge, 
        { y: 20, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1 }
      );
    }
    if (heroTitle) {
      heroTl.fromTo(heroTitle, 
        { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, 
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.2 }, 
        '-=0.7'
      );
    }
    if (heroSubtitle) {
      heroTl.fromTo(heroSubtitle, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.0 }, 
        '-=0.9'
      );
    }
    if (heroCta) {
      heroTl.fromTo(heroCta, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.7'
      );
    }
    if (heroImage) {
      heroTl.fromTo(heroImage, 
        { scale: 0.95, opacity: 0, rotate: 3, y: 10 }, 
        { scale: 1, opacity: 1, rotate: 1, y: 0, duration: 1.4 }, 
        '-=1.2'
      );
    }

    // Hero background orbs — gentle floating
    const heroOrbs = [
      { sel: '.hero-bg-1', y: -30, x: 20, dur: 8 },
      { sel: '.hero-bg-2', y: 25, x: -15, dur: 10 },
      { sel: '.hero-bg-3', y: -20, x: 10, dur: 12 },
    ];
    heroOrbs.forEach(({ sel, y, x, dur }) => {
      const orb = el.querySelector(sel);
      if (orb) {
        gsap.to(orb, { y, x, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true });
      }
    });

    // Hero decorative elements
    const heroDecor = el.querySelector('.hero-decor');
    if (heroDecor) {
      gsap.to(heroDecor, {
        y: -15, rotation: -8, duration: 6,
        ease: 'sine.inOut', repeat: -1, yoyo: true
      });
    }
    const heroFloat = el.querySelector('.hero-float');
    if (heroFloat) {
      gsap.to(heroFloat, {
        y: -10, rotation: 18, duration: 5,
        ease: 'sine.inOut', repeat: -1, yoyo: true
      });
    }

    // ──────────────────────────────────────────────
    // 2. SECTION HEADERS — scroll-triggered reveal (once)
    // ──────────────────────────────────────────────
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      // Set initial hidden state via GSAP (GPU-friendly)
      gsap.set(header, { y: 40, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: header,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(header, {
            y: 0, opacity: 1,
            duration: 1.0, ease: 'expo.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    });

    // ──────────────────────────────────────────────
    // 3. SERVICE CARDS — staggered reveal (once)
    // ──────────────────────────────────────────────
    const serviceCards = el.querySelectorAll('.service-card');
    if (serviceCards.length) {
      gsap.set(serviceCards, { y: 40, opacity: 0, scale: 0.98 });

      const st = ScrollTrigger.create({
        trigger: '#especializacion',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(serviceCards, {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, stagger: 0.15, ease: 'expo.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // ──────────────────────────────────────────────
    // 4. METHODOLOGY STEPS — cascading reveal (once)
    // ──────────────────────────────────────────────
    const steps = el.querySelectorAll('.step-item');
    if (steps.length) {
      gsap.set(steps, { y: 25, opacity: 0, scale: 0.97 });

      steps.forEach((step: any, i: number) => {
        const st = ScrollTrigger.create({
          trigger: step,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(step, {
              y: 0, opacity: 1, scale: 1,
              duration: 0.7,
              delay: i * 0.06,
              ease: 'power3.out'
            });
          }
        });
        this.scrollTriggers.push(st);
      });
    }

    // ──────────────────────────────────────────────
    // 5. QUALITY SECTION — directional reveals (once)
    // ──────────────────────────────────────────────
    const qualityContent = el.querySelector('.quality-content');
    if (qualityContent) {
      gsap.set(qualityContent, { x: -30, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: qualityContent,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(qualityContent, {
            x: 0, opacity: 1, duration: 1.1, ease: 'expo.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    const qualityImage = el.querySelector('.quality-image');
    if (qualityImage) {
      gsap.set(qualityImage, { x: 30, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: qualityImage,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(qualityImage, {
            x: 0, opacity: 1, duration: 1.1, ease: 'expo.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // ──────────────────────────────────────────────
    // 6. FAQ PANELS — staggered accordion reveal (once)
    // ──────────────────────────────────────────────
    const faqPanels = el.querySelectorAll('.faq-accordion mat-expansion-panel');
    if (faqPanels.length) {
      gsap.set(faqPanels, { y: 20, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: '#faq',
        start: 'top 78%',
        once: true,
        onEnter: () => {
          gsap.to(faqPanels, {
            y: 0, opacity: 1,
            duration: 0.6, stagger: 0.1, ease: 'power3.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // ──────────────────────────────────────────────
    // 7. FOOTER — elegant fade in (once)
    // ──────────────────────────────────────────────
    const footer = el.querySelector('footer') || document.querySelector('footer');
    if (footer) {
      gsap.set(footer, { opacity: 0, y: 25 });

      const st = ScrollTrigger.create({
        trigger: footer,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(footer, {
            opacity: 1, y: 0,
            duration: 1.2, ease: 'power2.out'
          });
        }
      });
      this.scrollTriggers.push(st);
    }

    // ──────────────────────────────────────────────
    // 8. SUBTLE PARALLAX on service card images
    // ──────────────────────────────────────────────
    const images = el.querySelectorAll('.service-card img');
    images.forEach((img: any) => {
      gsap.set(img, { willChange: 'transform' });
      const st = gsap.to(img, {
        y: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
      if (st.scrollTrigger) {
        this.scrollTriggers.push(st.scrollTrigger);
      }
    });

    // ──────────────────────────────────────────────
    // 9. HEADER — shrink/glass on scroll
    // ──────────────────────────────────────────────
    const headerSt = ScrollTrigger.create({
      start: 'top -30',
      onEnter: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          gsap.to(toolbar, {
            height: '64px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            duration: 0.4,
            ease: 'power2.out'
          });
          toolbar.classList.add('shadow-md', '!bg-brand-bg/95', 'backdrop-blur-2xl');
          toolbar.classList.remove('bg-brand-bg/80');
        }
      },
      onLeaveBack: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          gsap.to(toolbar, {
            height: '80px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            duration: 0.4,
            ease: 'power2.out'
          });
          toolbar.classList.remove('shadow-md', '!bg-brand-bg/95', 'backdrop-blur-2xl');
          toolbar.classList.add('bg-brand-bg/80');
        }
      },
    });
    this.scrollTriggers.push(headerSt);
  }

  // ──────────────────────────────────────────────
  // SCROLL-TO using Lenis (preferred) with GSAP fallback
  // ──────────────────────────────────────────────
  scrollTo(elementId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(elementId);
    if (!element) return;

    const offset = 80; // navbar height

    if (this.lenis) {
      // Use Lenis scrollTo for seamless integration with smooth scroll
      this.lenis.scrollTo(element, {
        offset: -offset,
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),  // easeOutQuart
      });
    } else {
      // GSAP fallback
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
          gsap.registerPlugin(ScrollToPlugin);
          gsap.to(window, {
            duration: 1.6,
            scrollTo: { y: element, offsetY: offset },
            ease: 'power3.inOut',
          });
        });
      });
    }
  }
}
