Markdown
# Comprehensive AI Developer Prompt: AI Content Repurposing Tool (React SPA)

**System Role & Persona:**
You are an Expert Full-Stack Frontend Developer specializing in modern UI/UX, AI tool interfaces, responsive design, and React.js architecture. Your task is to build the frontend of an "AI Content Repurposing Tool for Creators". This project must satisfy all requirements of a two-phase academic assessment (CIA-2 and CIA-3). Ensure your code is clean, organized, well-structured, and highly functional.

---

## 👤 1. Student Identity & Branding Requirements
You **must** prominently integrate the following student details into the application's UI (e.g., in a persistent Header, Footer, or a dedicated "About Developer" section):
* **Name:** NITHIN KUMAR U
* **USN NO:** 2102508611
* **Section:** SECTION 002
* **Institution:** NIAT BANGLORE

---

## 🎯 2. Project Overview: AI Content Repurposing Engine
Build a dynamic dashboard where a creator can paste a blog post, video transcript, or article, and the tool generates platform-ready versions (Tweets, LinkedIn posts, Instagram carousels, and Newsletters). 

**Core Features Required:**
* **Source Input Area:** A large text area form for pasting source content.
* **Format Selection:** Toggles or checkboxes to select desired output formats (Twitter, LinkedIn, Carousel, Newsletter).
* **Generation Engine (Mock/API):** Logic that processes the input.
* **Output Dashboard:** A grid displaying the generated content, allowing the user to view and theoretically edit inline.

---

## 🧠 3. The Core Logic (AI Prompt System)
Integrate the following configuration objects into the React state or utility functions to drive the application's logic (simulate the AI response based on these formats, or set up a generic `fetch` function that can call an LLM API):

```javascript
const systemPrompt = `You are a content strategist for social media.
Transform the given content into the requested format.
Match the creator's tone. Never add information not present in the source content.`;

const formats = {
  twitter: `Write a 5-tweet thread. Each tweet max 280 chars. Hook tweet first. End with a CTA. Separate with ---`,
  linkedin: `Write a LinkedIn post. 150-200 words. Start with a bold first line. Use line breaks generously.`,
  carousel: `Write 7 Instagram carousel slides. Slide 1: hook. Slides 2-6: one insight each. Slide 7: CTA. Format as: SLIDE N: [text]`,
  newsletter: `Write an email newsletter section. 300 words. Subject line, preview text, body, and CTA link placeholder.`
};
🏗️ 4. Phase 1: Foundation (CIA-2 Requirements)
The foundation must demonstrate a strong grasp of core web technologies before the React abstraction:

HTML & Structure: Use semantic, accessible HTML tags inside the JSX components (header, main, section, form, textarea).

CSS Styling & Layout: Apply modern CSS layouts strictly using Flexbox and/or CSS Grid. Build a clean, SaaS-style UI (think modern, minimalist, with subtle shadows and rounded corners). Ensure 100% responsiveness across mobile and desktop.

Vanilla JavaScript Logic (Integrated): Implement robust client-side form validation (e.g., prevent the "Generate" button from working if the input text is less than 50 characters).

🚀 5. Phase 2: React Finalization (CIA-3 Requirements)
Build the application as a fully dynamic Single Page Application (SPA).

React.js Architecture: Build using strict Component-based architecture. Expected components include: App, Header, ContentInputForm, FormatSelector, GeneratedOutputCard, and Footer.

Dynamic Functionality:

State Management: Use useState to track the input text, the selected formats, and the generated results.

Event Handling: Implement standard React event handlers (onChange for the text area, onSubmit for the generation trigger).

Data Rendering: Use .map() to dynamically render the GeneratedOutputCard components based on which formats the user selected and "generated."

✨ 6. Required Enhancements
API Integration / Simulation: Create an asynchronous function to simulate calling the Claude API. When the user clicks "Generate", show a "Loading..." state or spinner for 2 seconds, then populate the output cards with mock data tailored to the requested formats.

Elevated UI/UX: Include a "Copy to Clipboard" button on each generated output card with a brief "Copied!" state change.

📦 7. Output Guidelines & Deliverables
Please provide the following in your exact output:

Folder Structure: A clear text representation of the expected React folder structure (e.g., src/components/...).

Complete Code: Provide all necessary files (JSX components, CSS files, App routing). Write the actual functional logic; do not leave "add code here" placeholders.

Setup Instructions: Step-by-step terminal commands on how to install dependencies (using Vite or Create React App) and start the local development server.