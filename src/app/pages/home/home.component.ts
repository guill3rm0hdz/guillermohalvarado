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
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollTriggers.forEach(st => st.kill?.());
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

    // 0. Smooth Scroll (Lenis)
    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const el = this.elementRef.nativeElement;

    // 0.5. Smooth page entrance
    gsap.from(el, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    // 1. Hero Entrance — Cinematic Staggered Reveal
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    
    // Hero badge
    heroTl.fromTo(el.querySelector('.hero-badge'), 
      { y: 20, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1 }
    )
    // Main title with split text effect
    .fromTo(el.querySelector('.hero-title'), 
      { y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, 
      { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.5 }, 
      '-=0.7'
    )
    .fromTo(el.querySelector('.hero-subtitle'), 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2 }, 
      '-=1'
    )
    .fromTo(el.querySelector('.hero-cta'), 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.9 }, 
      '-=0.8'
    )
    .fromTo(el.querySelector('.hero-image'), 
      { scale: 0.85, opacity: 0, rotate: 8, y: 30 }, 
      { scale: 1, opacity: 1, rotate: 3, y: 0, duration: 1.8 }, 
      '-=1.5'
    );

    // Hero background orbs gentle float
    gsap.to(el.querySelector('.hero-bg-1'), {
      y: -30,
      x: 20,
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
    gsap.to(el.querySelector('.hero-bg-2'), {
      y: 25,
      x: -15,
      duration: 10,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
    gsap.to(el.querySelector('.hero-bg-3'), {
      y: -20,
      x: 10,
      duration: 12,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    // Hero decorative elements float
    const heroDecor = el.querySelector('.hero-decor');
    if (heroDecor) {
      gsap.to(heroDecor, {
        y: -15,
        rotation: -8,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }

    const heroFloat = el.querySelector('.hero-float');
    if (heroFloat) {
      gsap.to(heroFloat, {
        y: -10,
        rotation: 18,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }

    // 2. Section Headers — Parallax Reveal with line reveal
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      const st = ScrollTrigger.create({
        trigger: header,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(header,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    });

    // 3. Service Cards — Elegant staggered reveal
    const serviceCards = el.querySelectorAll('.service-card');
    if (serviceCards.length) {
      const st = ScrollTrigger.create({
        trigger: '#especializacion',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo(serviceCards,
            { y: 80, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.25, ease: 'expo.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // 4. Methodology Steps — Cascading reveal with scale
    const steps = el.querySelectorAll('.step-item');
    steps.forEach((step: any, i: number) => {
      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(step,
            { y: 40, opacity: 0, scale: 0.92 },
            {
              y: 0, opacity: 1, scale: 1, 
              duration: 0.9, 
              delay: i * 0.12,
              ease: 'back.out(1.4)'
            }
          );
        }
      });
      this.scrollTriggers.push(st);
    });

    // 5. Quality Content — Horizontal reveal
    const qualityContent = el.querySelector('.quality-content');
    if (qualityContent) {
      const st = ScrollTrigger.create({
        trigger: qualityContent,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(qualityContent,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    const qualityImage = el.querySelector('.quality-image');
    if (qualityImage) {
      const st = ScrollTrigger.create({
        trigger: qualityImage,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(qualityImage,
            { x: 60, opacity: 0, rotate: -3 },
            { x: 0, opacity: 1, rotate: 0, duration: 1.3, ease: 'expo.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // 6. FAQ — Staggered accordion reveal
    const faqPanels = el.querySelectorAll('.faq-accordion mat-expansion-panel');
    if (faqPanels.length) {
      const st = ScrollTrigger.create({
        trigger: '#faq',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(faqPanels,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // 7. Footer — Elegant fade
    const footer = el.querySelector('footer') || document.querySelector('footer');
    if (footer) {
      const st = ScrollTrigger.create({
        trigger: footer,
        start: 'top 92%',
        onEnter: () => {
          gsap.fromTo(footer,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
          );
        }
      });
      this.scrollTriggers.push(st);
    }

    // 8. Subtle parallax for images on scroll
    const images = el.querySelectorAll('.service-card img');
    images.forEach((img: any) => {
      const st = ScrollTrigger.create({
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self: any) => {
          gsap.set(img, {
            y: self.progress * 30 - 15,
          });
        }
      });
      this.scrollTriggers.push(st);
    });

    // Header shrink on scroll
    const headerSt = ScrollTrigger.create({
      start: 'top -30',
      onEnter: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          gsap.to(toolbar, {
            height: '64px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            duration: 0.5,
            ease: 'power2.out'
          });
          toolbar.classList.add('shadow-md', '!bg-brand-white/95', 'backdrop-blur-2xl');
          toolbar.classList.remove('bg-brand-white/80');
        }
      },
      onLeaveBack: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          gsap.to(toolbar, {
            height: '80px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            duration: 0.5,
            ease: 'power2.out'
          });
          toolbar.classList.remove('shadow-md', '!bg-brand-white/95', 'backdrop-blur-2xl');
          toolbar.classList.add('bg-brand-white/80');
        }
      },
    });
    this.scrollTriggers.push(headerSt);
  }

  scrollTo(elementId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(elementId);
      if (element) {
        import('gsap').then(({ gsap }) => {
          import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
            gsap.registerPlugin(ScrollToPlugin);
            
            const offset = 80;
            gsap.to(window, {
              duration: 2,
              scrollTo: { y: element, offsetY: offset },
              ease: 'expo.inOut',
              onComplete: () => {
                const header = element.querySelector('.section-header');
                if (header) {
                  gsap.fromTo(header, 
                    { scale: 0.97, opacity: 0.8 }, 
                    { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.7)' }
                  );
                }
              }
            });
          });
        });
      }
    }
  }
}
