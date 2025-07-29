# Efficover - Dental Insurance Workflow Automation

A modern React application showcasing Efficover's dental insurance workflow automation platform. This single-page application demonstrates how dental clinics can streamline insurance verification, claims tracking, and payment processing.

## 🚀 Features

- **Interactive VOC Demo**: Real-time audio visualization with synchronized transcript and clinical data updates
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Contact Forms**: Netlify-integrated forms for demo requests and LOI submissions
- **Audio Integration**: WaveSurfer.js for professional audio playback and visualization
- **Smooth Navigation**: Seamless scrolling between sections

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Audio**: WaveSurfer.js
- **Deployment**: Netlify
- **Form Handling**: Netlify Forms

## 📋 Prerequisites

- **Node.js**: Version 16 or higher (recommended: 18+)
- **npm**: Version 8 or higher
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd efficover_main_site
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
efficover_main_site/
├── public/                 # Static assets
│   ├── mini-logo.png      # Favicon
│   ├── voc_agent_demo.wav # Demo audio file
│   └── *.json            # Demo transcript data
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx    # Navigation
│   │   ├── Hero.tsx      # Landing section
│   │   ├── Demo.tsx      # Demo section
│   │   ├── VOCDemoVisualizer.tsx # Interactive demo
│   │   ├── Contact.tsx   # Contact forms
│   │   └── ...           # Other components
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── index.html            # HTML template
└── package.json          # Dependencies and scripts
```

## 🎯 Key Components

- **Header**: Fixed navigation with mobile menu
- **Hero**: Main landing with CTA buttons
- **How It Works**: Feature explanations
- **For Clinics**: Benefits for dental practices
- **Demo**: Interactive VOC visualizer with audio
- **Contact**: Multi-step contact forms
- **Footer**: Company information

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for Netlify deployment with:
- Form handling via Netlify Forms
- Automatic builds from Git
- Custom domain support

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Efficover.

---

**Efficover** - Automating insurance workflows so dental clinics can focus on care, not paperwork. 