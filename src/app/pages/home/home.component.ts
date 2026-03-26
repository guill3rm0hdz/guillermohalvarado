import { ChangeDetectionStrategy, Component, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const body = document.body;
    
    if (this.isMenuOpen) {
      body.style.overflow = 'hidden'; // Prevent scroll when menu is open
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

  private async initAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
    const { default: Lenis } = await import('lenis');
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 0. Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const el = this.elementRef.nativeElement;

    // 0.5. Smooth Entrance for the whole page
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'expo.out'
    });

    // 1. Hero Entrance Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo(el.querySelector('.hero-title'), 
      { y: 100, opacity: 0, skewY: 7 }, 
      { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: 'expo.out' }
    )
    .fromTo(el.querySelector('.hero-subtitle'), 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      '-=1'
    )
    .fromTo(el.querySelector('.hero-cta'), 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.8'
    )
    .fromTo(el.querySelector('.hero-image'), 
      { scale: 0.8, opacity: 0, rotate: 10 }, 
      { scale: 1, opacity: 1, rotate: 3, duration: 1.5, ease: 'expo.out' }, 
      '-=1.2'
    );

    // 2. Section Headers Parallax Reveal
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.fromTo(header,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
          }
        }
      );
    });

    // 3. Service Cards Hover-like Scroll Effect
    gsap.fromTo(el.querySelectorAll('.service-card'),
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: 'power4.out',
        scrollTrigger: {
          trigger: '#especializacion',
          start: 'top 70%',
        }
      }
    );

    // 4. Methodology Steps with "Draw" effect
    const steps = el.querySelectorAll('.step-item');
    steps.forEach((step: any, i: number) => {
      gsap.fromTo(step,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          }
        }
      );
    });

    // 5. Quality Content Reveal
    gsap.fromTo(el.querySelector('.quality-content'),
      { x: -100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.5, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.quality-content',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(el.querySelector('.quality-image'),
      { x: 100, opacity: 0, rotate: -5 },
      {
        x: 0, opacity: 1, rotate: 0, duration: 1.5, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.quality-image',
          start: 'top 80%',
        }
      }
    );

    // 6. FAQ Staggered Reveal
    gsap.fromTo(el.querySelectorAll('.faq-accordion mat-expansion-panel'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#faq',
          start: 'top 80%',
        }
      }
    );

    // 7. Footer Reveal
    gsap.fromTo(el.querySelector('footer'),
      { opacity: 0 },
      {
        opacity: 1, duration: 2, ease: 'power2.inOut',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 95%',
        }
      }
    );

    // 8. Dynamic Skew Effect for images on scroll
    const images = el.querySelectorAll('img');
    images.forEach((img: any) => {
      gsap.to(img, {
        skewY: 1.5,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    // Smooth Scroll for Header change
    ScrollTrigger.create({
      start: 'top -20',
      onEnter: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          toolbar.classList.add('h-16', 'shadow-lg', '!bg-brand-white/95', 'backdrop-blur-2xl', '!py-3');
          toolbar.classList.remove('h-20', 'bg-brand-white/90', 'py-4');
        }
      },
      onLeaveBack: () => {
        const toolbar = el.querySelector('mat-toolbar');
        if (toolbar) {
          toolbar.classList.remove('h-16', 'shadow-lg', '!bg-brand-white/95', 'backdrop-blur-2xl', '!py-3');
          toolbar.classList.add('h-20', 'bg-brand-white/90', 'py-4');
        }
      },
    });
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
              duration: 2.2,
              scrollTo: { y: element, offsetY: offset },
              ease: 'expo.inOut',
              onComplete: () => {
                // Creative "highlight" effect when arriving
                const header = element.querySelector('.section-header');
                if (header) {
                  gsap.fromTo(header, 
                    { scale: 0.95, opacity: 0.7 }, 
                    { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.6)' }
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
