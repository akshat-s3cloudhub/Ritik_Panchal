module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about.html',
        'http://localhost:3000/contact.html',
        'http://localhost:3000/business.html'
      ],
      startServerCommand: 'npm run serve',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.85}],
        'categories:seo': ['error', {minScore: 0.9}],
        'categories:pwa': ['warn', {minScore: 0.6}],
        
        // Core Web Vitals
        'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],
        'first-contentful-paint': ['warn', {maxNumericValue: 1800}],
        'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],
        'total-blocking-time': ['warn', {maxNumericValue: 300}],
        
        // Resource optimizations
        'unused-css-rules': ['warn', {maxLength: 1}],
        'unused-javascript': ['warn', {maxLength: 1}],
        'modern-image-formats': ['warn', {maxLength: 0}],
        'uses-optimized-images': ['warn', {maxLength: 1}],
        'uses-webp-images': ['warn', {maxLength: 1}],
        'uses-responsive-images': ['warn', {maxLength: 1}],
        
        // Cross-browser compatibility
        'no-document-write': ['error', {minScore: 1}],
        'uses-passive-event-listeners': ['warn', {minScore: 1}],
        'no-vulnerable-libraries': ['error', {minScore: 1}],
        
        // SEO essentials
        'document-title': ['error', {minScore: 1}],
        'meta-description': ['error', {minScore: 1}],
        'robots-txt': ['error', {minScore: 1}],
        'structured-data': ['warn', {minScore: 1}],
        'canonical': ['error', {minScore: 1}],
        
        // Accessibility
        'color-contrast': ['error', {minScore: 1}],
        'image-alt': ['error', {minScore: 1}],
        'button-name': ['error', {minScore: 1}],
        'link-name': ['error', {minScore: 1}],
        'aria-allowed-attr': ['error', {minScore: 1}],
        'aria-required-attr': ['error', {minScore: 1}],
        'heading-order': ['warn', {minScore: 1}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: './reports/lighthouse-ci'
    }
  }
};
