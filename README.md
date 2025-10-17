# Seán Hogan - Portfolio Website

A stunning, modern portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing expertise in Oracle Database Administration.

## ✨ Features

### Premium Interactive Effects
- **🎨 Custom Cursor**: Magnetic cursor with smooth following animation (desktop only)
- **✨ Particle Background**: Animated particle network with connection lines
- **📊 Scroll Progress Bar**: Gradient progress indicator at the top
- **💫 3D Tilt Cards**: Interactive project cards with 3D tilt effect on hover
- **🧲 Magnetic Buttons**: Buttons that attract cursor with smooth spring animations
- **⚡ Parallax Scrolling**: Depth effect with parallax background elements
- **🔤 Typewriter Effect**: Animated typing for hero section titles

### Design & UX
- **🎭 Glassmorphism**: Premium glass effect cards with backdrop blur
- **🌈 Gradient Effects**: Smooth color transitions and gradient text
- **🌙 Dark Mode Support**: Automatic dark/light theme switching
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🎬 Smooth Animations**: Framer Motion animations throughout

### Interactive Sections
- **🏠 Hero Section**: Typewriter effect, magnetic buttons, animated background
- **👤 About Section**: Parallax effects, glassmorphism cards, experience timeline
- **🛠️ Skills Section**: Animated progress bars with scroll-triggered animations
- **💼 Projects Showcase**: 3D tilt cards, filtering (Professional/Personal)
- **📬 Contact Form**: Interactive form with social links

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React 18**: Latest React features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update social media links
   - Modify the tagline and description

2. **About Section** (`components/About.tsx`):
   - Edit experience details
   - Update statistics and metrics

3. **Skills Section** (`components/Skills.tsx`):
   - Modify skill categories and levels
   - Add or remove technologies

4. **Projects Section** (`components/Projects.tsx`):
   - Add your own projects
   - Update project descriptions and technologies

5. **Contact Section** (`components/Contact.tsx`):
   - Update email address
   - Update social media links
   - Update location

### Deployment

This Next.js application can be deployed to:

- **Vercel** (Recommended): One-click deployment
- **Netlify**: Static site hosting
- **AWS/Azure/GCP**: Cloud platforms
- **Docker**: Containerized deployment

#### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## Project Structure

```
sean_hogan_portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── Navigation.tsx        # Navigation bar
│   ├── Hero.tsx              # Hero section with typewriter
│   ├── About.tsx             # About section with parallax
│   ├── Skills.tsx            # Skills section
│   ├── Projects.tsx          # Projects with 3D tilt cards
│   ├── Contact.tsx           # Contact form
│   ├── CustomCursor.tsx      # Animated custom cursor
│   ├── ParticlesBackground.tsx # Particle animation
│   ├── ScrollProgress.tsx    # Scroll progress bar
│   ├── TiltCard.tsx          # 3D tilt card component
│   ├── MagneticButton.tsx    # Magnetic button component
│   ├── TypewriterEffect.tsx  # Typewriter animation
│   └── AnimatedCounter.tsx   # Number counter animation
├── public/                   # Static assets
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- **Email**: sean.hogan@example.com
- **LinkedIn**: [linkedin.com/in/seanhogan](https://linkedin.com/in/seanhogan)
- **GitHub**: [github.com/seanhogan](https://github.com/seanhogan)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
