# DG Panchal - DG Group Website

A modern, responsive website for DG Panchal - DG Group, a leading precision engineering and gear manufacturing company established in 1983.

## 🌟 Features

### Design & User Experience
- **Modern Dark Industrial Theme** - Professional dark color scheme with orange accents
- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations & Transitions** - Engaging user interactions with CSS and JavaScript animations
- **Industrial Typography** - Clean, professional typography using Inter font family

### Technical Features
- **Static HTML/CSS/JavaScript** - No backend dependencies, easy to host anywhere
- **SEO Optimized** - Comprehensive meta tags, structured data, sitemap, and robots.txt
- **Progressive Web App Ready** - Includes manifest.json for PWA capabilities
- **Performance Optimized** - Fast loading with optimized images and efficient code
- **Accessibility Compliant** - Proper ARIA labels and semantic HTML structure

### Sections
- **Hero Section** - Compelling company introduction with call-to-action buttons
- **About Us** - Company history, mission, and core values
- **Services** - Complete range of manufacturing and engineering services
- **Our Team** - Professional team categories with expertise areas
- **Products** - Showcase of key products with detailed specifications
- **Why Choose Us** - Key differentiators and company strengths
- **Contact** - Multiple contact methods with integrated contact form and map

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Advanced styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Modern JavaScript with modules and classes
- **Font Awesome** - Professional icon library
- **Google Fonts** - Inter font family for clean typography
- **Google Maps** - Embedded location map

## 📁 Project Structure

```
DG Panchal/
├── index.html          # Main HTML file
├── styles.css          # Comprehensive CSS styles
├── script.js           # Interactive JavaScript functionality
├── manifest.json       # Progressive Web App manifest
├── robots.txt          # SEO robots configuration
├── sitemap.xml         # XML sitemap for search engines
├── README.md           # Project documentation
└── image/              # Image assets directory
    ├── LOGO.png        # Company logo
    ├── Banner1.png     # Hero background image
    ├── Com_1.jpeg.jpg  # Company image
    ├── VMC C-1.jpg     # CNC/VMC components
    └── [1-34].jpg      # Product images
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (optional, for development)

### Installation

1. **Download/Clone the project**
   ```bash
   # If using git
   git clone [repository-url]
   cd "DG Panchal"
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or serve from a local web server for best results

3. **Optional: Local Development Server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   
   # Then open http://localhost:8000
   ```

## 🔧 Customization

### Colors
The website uses CSS custom properties for easy color customization:

```css
:root {
    --primary-dark: #0d1117;
    --secondary-dark: #161b22;
    --accent-orange: #ff6b35;
    --text-light: #f0f6fc;
    /* ... more variables */
}
```

### Content
- Update company information in `index.html`
- Replace images in the `image/` directory
- Modify contact details in the contact section
- Update structured data for SEO in the `<head>` section

### Styling
- Main styles are in `styles.css`
- Responsive breakpoints: 1024px, 768px, 480px
- All animations and transitions are customizable

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔍 SEO Features

### Meta Tags
- Comprehensive meta descriptions
- Open Graph tags for social media sharing
- Twitter Card support
- Proper canonical URLs

### Structured Data
- Organization schema markup
- Product and service information
- Local business data

### Performance
- Optimized images
- Minified CSS and JavaScript
- Efficient loading strategies
- Progressive Web App capabilities

## 🎨 Design Guidelines

### Color Scheme
- **Primary**: Dark backgrounds (#0d1117, #161b22)
- **Accent**: Orange (#ff6b35) and Gold (#ffd700)
- **Text**: Light colors for contrast (#f0f6fc, #8b949e)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Bold weights (700-900)
- **Body**: Regular weights (400-500)
- **Hierarchy**: Clear size and weight distinctions

### Spacing
- Consistent spacing using CSS custom properties
- Mobile-first responsive spacing
- Proper whitespace for readability

## 📞 Contact Information

The website includes contact information for:
- **Factory Address**: Shade No.4/5, Kothari Industrial Estate, Opp. Torrent Power, Dudheshwar, Ahmedabad Gujarat (India) - 380004
- **Emails**: dgpanchal1983@gmail.com, sanjaydgpanchal@gmail.com
- **Phone Numbers**: +91 76000 85424, +91 99040 39434

## 🚀 Deployment

The website is ready for deployment to any static hosting service:

### Recommended Hosting Platforms
- **Netlify** - Automatic deployments from Git
- **Vercel** - Fast global CDN
- **GitHub Pages** - Free hosting for public repositories
- **AWS S3** - Scalable static website hosting
- **Firebase Hosting** - Google's hosting solution

### Deployment Steps
1. Upload all files to your hosting provider
2. Ensure the domain is configured correctly
3. Update the sitemap.xml with your actual domain
4. Test all functionality on the live site

## 🔒 Browser Support

- **Chrome**: ✅ Full support
- **Firefox**: ✅ Full support  
- **Safari**: ✅ Full support
- **Edge**: ✅ Full support
- **Internet Explorer**: ⚠️ Limited support (IE11+)

## 📈 Performance Tips

- Images are optimized for web use
- CSS and JavaScript are efficiently structured
- Use a CDN for faster global loading
- Enable gzip compression on your server
- Consider implementing a Service Worker for offline functionality

## 🐛 Known Issues

- Contact form currently shows a success message but doesn't actually send emails (requires backend integration)
- Some animations may not work in older browsers
- Internet Explorer may have layout issues with CSS Grid

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to DG Panchal - DG Group. All rights reserved.

## 📧 Support

For technical support or questions about this website, please contact:
- Email: dgpanchal1983@gmail.com
- Phone: +91 76000 85424

---

**DG Panchal - DG Group**  
*Precision Engineering Since 1983*
