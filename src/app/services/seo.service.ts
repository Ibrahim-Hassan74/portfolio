import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

/**
 * SEO Service — manages document-level metadata for search engines and AI crawlers.
 * Called once in AppComponent to set canonical, OG tags, and ensure all meta is present.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  /** Set or update the canonical link element */
  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Set the page title */
  setTitle(pageTitle: string): void {
    this.title.setTitle(pageTitle);
  }

  /** Update a meta tag by name or property */
  updateMeta(attr: 'name' | 'property', key: string, content: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content });
    } else {
      this.meta.addTag({ [attr]: key, content });
    }
  }

  /** Initialize all SEO metadata — called once on app bootstrap */
  initSeo(): void {
    const baseUrl = 'https://ibrahimhassan.dev/';

    this.setTitle('Ibrahim Hassan — Full Stack .NET & Angular Developer | Portfolio');
    this.setCanonicalUrl(baseUrl);

    // Core meta
    this.updateMeta('name', 'description',
      'Ibrahim Hassan is a Full Stack Developer specializing in ASP.NET Core, Angular, Clean Architecture, and real-time systems. ECPC Finalist. Explore projects, skills, and experience.');
    this.updateMeta('name', 'author', 'Ibrahim Hassan');
    this.updateMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    this.updateMeta('property', 'og:title', 'Ibrahim Hassan — Full Stack .NET & Angular Developer');
    this.updateMeta('property', 'og:description',
      'Full Stack Developer specializing in ASP.NET Core, Angular, Clean Architecture, and real-time systems. ECPC Finalist.');
    this.updateMeta('property', 'og:url', baseUrl);
    this.updateMeta('property', 'og:image', `${baseUrl}og-image.png`);
    this.updateMeta('property', 'og:type', 'website');

    // Twitter
    this.updateMeta('name', 'twitter:card', 'summary_large_image');
    this.updateMeta('name', 'twitter:title', 'Ibrahim Hassan — Full Stack .NET & Angular Developer');
    this.updateMeta('name', 'twitter:image', `${baseUrl}og-image.png`);
  }
}
