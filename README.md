# AI Content Repurposer (Repurpose.AI)

A futuristic, high-fidelity Single Page Application (SPA) that transforms long-form content (like blog posts or video transcripts) into platform-optimized social media posts in seconds. Built for speed, aesthetic excellence, and immediate visual feedback.

## 🚀 Features

- **Premium UI/UX**: Custom Tailwind CSS implementation mimicking high-end SaaS platforms.
- **Glassmorphic Design**: Modern transparent panels with dynamic blur effects.
- **Interactive 3D WebGL Background**: A stunning, cursor-following 3D glowing tubes animation powered by `threejs-components` that perfectly tracks the mouse without distortion.
- **Instant Generation Engine**: Transforms single-source text into 4 distinct formats:
  - 🧵 **Twitter Threads**
  - 💼 **LinkedIn Thought Leadership**
  - 📸 **Instagram Carousels**
  - 📧 **Newsletter Segments**
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop devices.
- **Smooth Stacking Contexts**: Uses a precision z-index strategy to ensure 3D backgrounds stay safely beneath interactive UI elements.

## 🛠️ Technology Stack

- **Frontend Core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Styling**: Tailwind CSS via CDN & custom CSS properties.
- **Typography**: Cabinet Grotesk (Display) & Satoshi (Body) via Fontshare.
- **Iconography**: Lucide Icons via Iconify.
- **3D Animation**: `threejs-components` (TubesCursor module).

## 📂 Project Structure

```text
├── index.html       # The main entry point containing the Tailwind Hero and Dashboard markup.
├── style.css        # The custom CSS handling the application dashboard and interactive elements.
├── app.js           # Core logic handling AI simulation, DOM manipulation, and content mapping.
├── draft.html       # Original Superdesign reference prototype.
├── design.md        # Architectural decisions and design system specifications.
└── prompt.md        # AI prompt documentation and requirements.
```

## 🧠 Development Insights

### Solving the Stretched Canvas Problem
A major technical challenge was the scaling of the 3D WebGL canvas. When the canvas spanned the entire scrolling document, the raycast coordinates skewed, causing the tubes to track incorrectly. 

**Solution**: The application implements a `relative min-h-screen overflow-hidden` wrapper exclusively for the Hero section. By positioning the canvas absolutely inside this wrapper, it stays perfectly sized to the 100vh viewport, mapping the mouse coordinates 1:1. When users scroll down to the dashboard, the tubes safely disappear behind a solid dark background.

## 👨‍💻 Developer Information

- **Developer**: NITHIN KUMAR U
- **USN**: 2102508611
- **Section**: 002
- **Institution**: NIAT BANGALORE

---
*Built as part of the AI Content Repurposing Tool project submission.*
