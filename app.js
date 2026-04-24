/* ══════════════════════════════════════════════════════════════
   AI Content Repurposing Engine — App Logic
   Author : NITHIN KUMAR U | USN: 2102508611 | SECTION 002
   CIA-2 & CIA-3 Assessment | NIAT BANGALORE
══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── STATE ─── */
const state = {
  inputText: '',
  selectedFormats: new Set(['twitter', 'linkedin']),
  isGenerating: false,
  results: {}
};

/* ─── AI SYSTEM PROMPT CONFIG ─── */
const systemPrompt = `You are a content strategist for social media.
Transform the given content into the requested format.
Match the creator's tone. Never add information not present in the source content.`;

const formats = {
  twitter: `Write a 5-tweet thread. Each tweet max 280 chars. Hook tweet first. End with a CTA. Separate with ---`,
  linkedin: `Write a LinkedIn post. 150-200 words. Start with a bold first line. Use line breaks generously.`,
  carousel: `Write 7 Instagram carousel slides. Slide 1: hook. Slides 2-6: one insight each. Slide 7: CTA. Format as: SLIDE N: [text]`,
  newsletter: `Write an email newsletter section. 300 words. Subject line, preview text, body, and CTA link placeholder.`
};

/* ─── MOCK CONTENT GENERATOR ─── */
function generateMockContent(format, sourceText) {
  const words = sourceText.trim().split(/\s+/);
  const topic = words.slice(0, 6).join(' ');
  const keyInsight = words.slice(Math.floor(words.length / 3), Math.floor(words.length / 3) + 8).join(' ') || 'valuable insights';

  const generators = {
    twitter: () =>
`🧵 Thread: ${topic}...

This is the most important thing you need to know. Let me break it down. 👇

---

Tweet 2: The core idea here is simple — "${keyInsight}". Once you understand this, everything changes. Here's why it matters.

---

Tweet 3: Most people overlook this critical detail. The data shows that creators who repurpose content get 3x more reach with the same effort. Numbers don't lie.

---

Tweet 4: Here's the exact framework I use:
• Identify the core message
• Strip it to essentials
• Rebuild for each platform
• Measure & iterate

Works every time.

---

Tweet 5: If this thread helped you, share it with one creator friend who needs to hear this. 🔁

Follow me for daily insights on content strategy and growth hacking.

#ContentStrategy #CreatorEconomy #SocialMedia`,

    linkedin: () =>
`The future of content creation isn't about creating more — it's about creating smarter.

After studying hundreds of top creators, one pattern emerges: the most successful ones don't create separate content for every platform. They repurpose strategically.

Here's what I mean:

${topic} — this idea has layers. On Twitter, it becomes a punchy thread. On LinkedIn, it becomes a thoughtful professional narrative. On Instagram, it becomes a visual story. In a newsletter, it becomes a deep dive.

The insight: "${keyInsight}"

What most creators get wrong: They post once and move on. What the pros do: They extract maximum value from every piece of core content.

The ROI is undeniable. One well-researched piece becomes 10+ touchpoints across platforms, each tailored to that audience's expectations.

Start thinking of your content as raw material — not a finished product.

What platform do you find hardest to repurpose for? Drop it in the comments. 👇

#ContentMarketing #CreatorEconomy #LinkedIn #ContentStrategy`,

    carousel: () =>
`SLIDE 1: 🔥 Stop Creating New Content. Start Repurposing It.

---

SLIDE 2: The Problem
Most creators burn out making unique content for every platform. There's a smarter way. "${topic}"

---

SLIDE 3: The Insight
"${keyInsight}" — this single idea can power 4 different platform posts. Here's how.

---

SLIDE 4: Twitter Strategy
Turn your key points into a 5-tweet thread. Hook → Build → CTA. Simple, effective, shareable.

---

SLIDE 5: LinkedIn Strategy
Take the same core idea and expand it into a 150-200 word professional narrative. Lead with a bold statement.

---

SLIDE 6: Newsletter Strategy
Go deep. 300 words, subject line, preview text, body, and a clear CTA. Your most engaged audience lives here.

---

SLIDE 7: 🚀 Ready to 10x Your Content Output?
Save this carousel. Share it with a creator friend. Follow for more content strategy insights every week. Link in bio. ⬆️`,

    newsletter: () =>
`Subject Line: The Content Secret Top Creators Don't Want You to Know

Preview Text: One idea. Four platforms. 10x the reach.

---

Hi [First Name],

Let's talk about something that's been hiding in plain sight.

${topic} — you've probably thought about this before. But have you considered how far one great idea can actually go?

The most effective creators I know don't start with platform-specific content. They start with a core idea — like "${keyInsight}" — and engineer it for each channel.

Here's the breakdown:

→ Twitter/X: A punchy 5-tweet thread that sparks conversation
→ LinkedIn: A professional reflection that builds authority
→ Instagram: A carousel that's saved and shared
→ Email: A deep dive that converts readers into fans

The result? More reach. More impact. Less burnout.

This week's challenge: Take your last blog post or video script and run it through this framework. You'll be surprised how much mileage you get.

Until next week,

[Your Name]

P.S. Forwarded this email? Subscribe here → [SUBSCRIBE LINK]

---
© 2025 Your Newsletter | Unsubscribe | Manage Preferences`
  };

  return generators[format] ? generators[format]() : 'Content generated successfully.';
}

/* ─── PLATFORM META ─── */
const platformMeta = {
  twitter: {
    name: 'Twitter / X',
    format: '5-Tweet Thread',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    iconBg: 'background:rgba(0,0,0,.5);color:#1da1f2'
  },
  linkedin: {
    name: 'LinkedIn',
    format: '150–200 Word Post',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    iconBg: 'background:rgba(10,102,194,.15);color:#0a66c2'
  },
  carousel: {
    name: 'Instagram Carousel',
    format: '7-Slide Story',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    iconBg: 'background:rgba(225,48,108,.15);color:#e1306c'
  },
  newsletter: {
    name: 'Email Newsletter',
    format: '300-Word Edition',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    iconBg: 'background:rgba(83,188,40,.12);color:#53bc28'
  }
};

/* ─── DOM REFS ─── */
const $ = id => document.getElementById(id);
const textarea   = $('source-content');
const counter    = $('content-counter');
const contentErr = $('content-error');
const formatErr  = $('format-error');
const generateBtn= $('generate-btn');
const clearBtn   = $('clear-btn');
const form       = $('content-form');
const emptyState = $('empty-state');
const outputGrid = $('output-grid');
const toastEl    = $('toast');

/* ─── CHAR COUNTER ─── */
textarea.addEventListener('input', () => {
  state.inputText = textarea.value;
  const len = textarea.value.length;
  counter.textContent = `${len.toLocaleString()} character${len !== 1 ? 's' : ''}`;
  counter.style.color = len >= 50 ? 'rgba(83,188,40,.7)' : len > 0 ? 'rgba(255,180,0,.6)' : 'rgba(255,255,255,.3)';
  if (len >= 50 && contentErr.textContent) contentErr.textContent = '';
});

/* ─── FORMAT CHECKBOXES ─── */
document.querySelectorAll('.format-checkbox').forEach(cb => {
  cb.addEventListener('change', () => {
    if (cb.checked) state.selectedFormats.add(cb.value);
    else state.selectedFormats.delete(cb.value);
    if (state.selectedFormats.size > 0 && formatErr.textContent) formatErr.textContent = '';
  });
  // Sync initial state
  if (cb.checked) state.selectedFormats.add(cb.value);
});

/* ─── VALIDATION ─── */
function validate() {
  let valid = true;
  if (textarea.value.trim().length < 50) {
    contentErr.textContent = `⚠ Content must be at least 50 characters (currently ${textarea.value.trim().length}).`;
    textarea.focus();
    valid = false;
  }
  if (state.selectedFormats.size === 0) {
    formatErr.textContent = '⚠ Please select at least one output format.';
    valid = false;
  }
  return valid;
}

/* ─── SIMULATE ASYNC AI CALL ─── */
function simulateAIGeneration(format, text) {
  return new Promise(resolve => {
    setTimeout(() => resolve(generateMockContent(format, text)), 2000 + Math.random() * 500);
  });
}

/* ─── RENDER CARD ─── */
function renderCard(format, content, index) {
  const meta = platformMeta[format];
  const wordCount = content.split(/\s+/).length;
  const card = document.createElement('article');
  card.className = 'output-card';
  card.style.animationDelay = `${index * 0.08}s`;
  card.setAttribute('aria-label', `${meta.name} generated content`);
  card.innerHTML = `
    <div class="card-header">
      <div class="card-platform">
        <div class="card-platform-icon" style="${meta.iconBg};border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">${meta.icon}</div>
        <div>
          <div class="card-platform-name">${meta.name}</div>
          <div class="card-platform-format">${meta.format}</div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn-copy" id="copy-${format}" aria-label="Copy ${meta.name} content to clipboard">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          Copy
        </button>
      </div>
    </div>
    <div class="card-body">
      <pre class="card-content" id="content-${format}">${escapeHtml(content)}</pre>
    </div>
    <div class="card-footer">
      <span class="card-word-count">${wordCount} words · ${content.length} chars</span>
    </div>`;

  const copyBtn = card.querySelector('.btn-copy');
  copyBtn.addEventListener('click', () => copyToClipboard(format, content, copyBtn));
  return card;
}

/* ─── COPY TO CLIPBOARD ─── */
function copyToClipboard(format, text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
    showToast('✓ Copied to clipboard!');
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy`;
    }, 2500);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓ Copied to clipboard!');
  });
}

/* ─── ESCAPE HTML ─── */
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ─── TOAST ─── */
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

/* ─── GENERATE HANDLER ─── */
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (state.isGenerating) return;
  if (!validate()) return;

  state.isGenerating = true;
  generateBtn.classList.add('loading');
  generateBtn.disabled = true;

  // Scroll to output
  $('output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Clear old results
  outputGrid.innerHTML = '';
  outputGrid.classList.remove('visible');
  emptyState.style.display = 'flex';
  emptyState.innerHTML = `
    <div class="empty-icon" style="animation:spin .9s linear infinite">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="url(#loadGrad)" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
        <defs><linearGradient id="loadGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f967fb"/><stop offset="100%" stop-color="#53bc28"/>
        </linearGradient></defs>
      </svg>
    </div>
    <h3 class="empty-title" style="color:rgba(255,255,255,.7)">AI is generating your content…</h3>
    <p class="empty-text">Analyzing your source, crafting platform-ready versions. This takes ~2 seconds.</p>`;

  const fmtList = [...state.selectedFormats];

  // Generate all in parallel
  const promises = fmtList.map(fmt => simulateAIGeneration(fmt, state.inputText));
  const results  = await Promise.all(promises);

  fmtList.forEach((fmt, i) => { state.results[fmt] = results[i]; });

  // Render
  emptyState.style.display = 'none';
  outputGrid.classList.add('visible');
  fmtList.forEach((fmt, i) => {
    const card = renderCard(fmt, state.results[fmt], i);
    outputGrid.appendChild(card);
  });

  state.isGenerating = false;
  generateBtn.classList.remove('loading');
  generateBtn.disabled = false;
  showToast(`✓ Generated ${fmtList.length} platform post${fmtList.length > 1 ? 's' : ''}!`);
});

/* ─── CLEAR HANDLER ─── */
clearBtn.addEventListener('click', () => {
  textarea.value = ''; state.inputText = '';
  counter.textContent = '0 characters';
  counter.style.color = 'rgba(255,255,255,.3)';
  contentErr.textContent = ''; formatErr.textContent = '';
  outputGrid.innerHTML = ''; outputGrid.classList.remove('visible');
  emptyState.style.display = 'flex';
  emptyState.innerHTML = `
    <div class="empty-icon"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
    <h3 class="empty-title">Ready to Generate</h3>
    <p class="empty-text">Fill in your source content above, select your target platforms, and click <strong>Generate Content</strong> to see the magic.</p>`;
  state.results = {};
  showToast('Cleared all content.');
});

/* ══════════════════════════════════════════════════════════════
   3D TUBES BACKGROUND — handled by type=module script in index.html
   using threejs-components@0.0.19/build/cursors/tubes1.min.js
   (the real Kevin Levron cursor-following implementation)
══════════════════════════════════════════════════════════════ */
