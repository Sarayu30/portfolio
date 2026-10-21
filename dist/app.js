import { projects } from './projects.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 621px)');
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tagHTML = stack => `<div class="tags">${stack.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;

function conceptPreview(project) {
  return `<div class="code-preview"><div class="window-dots"><i></i><i></i><i></i></div><strong>${escapeHTML(project.title)}</strong><p>${escapeHTML(project.tagline)}</p><p class="code-prompt">${escapeHTML(project.stack.join(' · '))}</p></div>`;
}

function mediaHTML(project, controls = false) {
  if (project.video) return `<video class="preview-media ${project.id}" src="${escapeHTML(project.video)}" ${project.poster ? `poster="${escapeHTML(project.poster)}"` : ''} muted playsinline ${controls ? 'controls' : 'loop'} preload="metadata"></video>`;
  return project.poster ? `<img class="preview-media ${project.id}" src="${escapeHTML(project.poster)}" alt="${escapeHTML(project.title + ' — ' + project.posterLabel)}" loading="lazy">` : conceptPreview(project);
}

$('#project-list').innerHTML = projects.map(project => `
  <article class="project-row reveal" id="project-${project.id}" style="--project-accent:${project.color}">
    <button class="project-button" data-project="${project.id}" aria-haspopup="dialog" aria-label="Explore ${escapeHTML(project.title)}">
      <span class="project-number">${project.number}</span>
      <span><span class="project-category">${escapeHTML(project.category)}</span><span class="project-title">${escapeHTML(project.title)}</span><span class="project-tagline">${escapeHTML(project.tagline)}</span></span>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </button>
  </article>`).join('');

// Floating previews stay within the viewport and are excluded from the focus order.
const preview = $('#hover-preview');
let previewProject = null;
function hidePreview() {
  preview.classList.remove('is-visible');
  $('video', preview)?.pause();
}
function placePreview(event) {
  const width = preview.offsetWidth;
  const height = preview.offsetHeight;
  let left = event.clientX + 36;
  if (left + width > window.innerWidth - 20) left = event.clientX - width - 30;
  preview.style.left = `${Math.max(16, Math.min(window.innerWidth - width - 16, left))}px`;
  preview.style.top = `${Math.max(16, Math.min(window.innerHeight - height - 16, event.clientY - height / 2))}px`;
}
function setMediaFallback(container, project) {
  const media = $('video, img', container);
  media?.addEventListener('error', () => {
    if (media.tagName === 'VIDEO' && project.poster) {
      const image = document.createElement('img');
      image.src = project.poster;
      image.alt = project.title + ' preview';
      image.className = `preview-media ${project.id}`;
      image.addEventListener('error', () => image.replaceWith(makeFallback(project)), {once:true});
      media.replaceWith(image);
    } else media.replaceWith(makeFallback(project));
  }, {once:true});
}
function makeFallback(project) {
  const fallback = document.createElement('div');
  fallback.className = 'code-preview';
  const title = document.createElement('strong');
  title.textContent = project.title;
  const description = document.createElement('p');
  description.textContent = project.tagline;
  fallback.append(title, description);
  return fallback;
}
$$('.project-button').forEach(button => {
  const project = projects.find(item => item.id === button.dataset.project);
  button.addEventListener('pointerenter', event => {
    if (!finePointer.matches || dialog.open) return;
    if (previewProject !== project.id) {
      preview.innerHTML = `${mediaHTML(project)}<div class="preview-label">${escapeHTML(project.video ? 'Project recording' : project.posterLabel)}</div><div class="preview-caption"><div class="preview-status">${escapeHTML(project.status)}</div>${tagHTML(project.stack)}</div>`;
      previewProject = project.id;
      setMediaFallback(preview, project);
    }
    placePreview(event);
    preview.classList.add('is-visible');
    if (!reducedMotion.matches) $('video', preview)?.play().catch(() => {});
  });
  button.addEventListener('pointermove', placePreview);
  button.addEventListener('pointerleave', hidePreview);
  button.addEventListener('click', () => openProject(project.id));
});
window.addEventListener('scroll', hidePreview, {passive:true});
window.addEventListener('resize', hidePreview);

// Native dialog provides Escape handling, focus trapping, and keyboard access.
const dialog = $('#project-dialog');
let dialogTrigger = null;
function openProject(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  dialogTrigger = document.activeElement;
  hidePreview();
  setGuideOpen(false);
  $('#project-detail').innerHTML = `<div class="dialog-media">${mediaHTML(project, true)}<span class="preview-label">${escapeHTML(project.video ? 'Project recording' : project.posterLabel)}</span></div><div class="dialog-body"><p class="dialog-eyebrow">${escapeHTML(project.category)} / ${escapeHTML(project.status)}</p><h2 id="dialog-title">${escapeHTML(project.title)}</h2><p class="dialog-tagline">${escapeHTML(project.tagline)}</p>${tagHTML(project.stack)}<h3>The idea</h3><p>${escapeHTML(project.overview)}</p><h3>What I built</h3><p>${escapeHTML(project.contribution)}</p><h3>Inside the project</h3><ul>${project.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join('')}</ul><h3>The engineering focus</h3><p>${escapeHTML(project.engineering)}</p><div class="dialog-links"><a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">Explore the code ↗</a>${project.live ? `<a href="${escapeHTML(project.live)}" target="_blank" rel="noopener noreferrer">Visit project ↗</a>` : ''}</div><p class="project-note">${escapeHTML(project.note)}</p></div>`;
  if (project.report) {
    const reportLink = document.createElement('a');
    reportLink.href = project.report;
    reportLink.textContent = 'Read project report ↗';
    reportLink.target = '_blank';
    reportLink.rel = 'noopener noreferrer';
    $('.dialog-links').append(reportLink);
  }
  setMediaFallback($('#project-detail'), project);
  dialog.showModal();
  dialog.scrollTop = 0;
  updateScrollLock();
  $('.dialog-close').focus();
}
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  $('video', dialog)?.pause();
  updateScrollLock();
  if (dialogTrigger?.isConnected) dialogTrigger.focus({preventScroll:true});
});

const menuToggle = $('#menu-toggle');
const sidebar = $('#sidebar');
const backdrop = $('#nav-backdrop');
function updateScrollLock() {
  document.body.style.overflow = dialog.open || sidebar.classList.contains('is-open') ? 'hidden' : '';
}
function setMenuOpen(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  sidebar.classList.toggle('is-open', open);
  backdrop.hidden = !open;
  updateScrollLock();
  if (window.innerWidth <= 950) sidebar.inert = !open;
  if (open) {
    sidebar.setAttribute('role','dialog');
    sidebar.setAttribute('aria-modal','true');
    $('a', sidebar).focus();
  } else {
    sidebar.removeAttribute('role');
    sidebar.removeAttribute('aria-modal');
  }
}
function syncNav() {
  if (window.innerWidth > 950) {setMenuOpen(false); sidebar.inert = false;}
  else sidebar.inert = !sidebar.classList.contains('is-open');
}
syncNav();
window.addEventListener('resize', syncNav);
menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => {setMenuOpen(false); menuToggle.focus();});
$$('a', sidebar).forEach(link => link.addEventListener('click', () => {
  if (window.innerWidth <= 950) {
    setMenuOpen(false);
    const target = link.getAttribute('href');
    if (target?.startsWith('#')) {
      const section = $(target);
      if (section) {section.tabIndex = -1; section.focus({preventScroll:true});}
    }
  }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (sidebar.classList.contains('is-open')) {setMenuOpen(false); menuToggle.focus();}
    if (!$('#guide-panel').hidden) {setGuideOpen(false); $('#guide-toggle').focus();}
  }
  if (event.key === 'Tab' && sidebar.classList.contains('is-open')) {
    const focusable = $$('a, summary', sidebar).filter(node => node.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  }
});

// Reveal animation is enhancement only: content remains visible without JavaScript.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('visible'); revealObserver.unobserve(entry.target);}
  }), {threshold:0.06});
  document.documentElement.classList.add('motion-ready');
  $$('.reveal').forEach(element => revealObserver.observe(element));
}
let scrollQueued = false;
function updateScroll() {
  const remaining = document.documentElement.scrollHeight - window.innerHeight;
  $('.reading-progress').style.width = `${remaining > 0 ? window.scrollY / remaining * 100 : 0}%`;
  let current = 'home';
  $$('.section').forEach(section => {if (section.getBoundingClientRect().top < window.innerHeight * .38) current = section.id;});
  $$('.nav-item').forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
  $('.project-folder').classList.toggle('active', current === 'projects');
  scrollQueued = false;
}
window.addEventListener('scroll', () => {if (!scrollQueued) {scrollQueued = true; requestAnimationFrame(updateScroll);}}, {passive:true});
updateScroll();
const clockFormat = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false});
function updateClock() {$('#local-time').textContent = `${clockFormat.format(new Date())} IST`;}
updateClock();
setInterval(updateClock, 60000);
$('#year').textContent = new Date().getFullYear();

const phrases = ['Building intelligent software', 'Connecting agents to real tools', 'Turning ideas into products', 'Learning. Building. Repeating.'];
let phraseIndex = 0;
let phraseTimer;
function rotatePhrase() {
  if (reducedMotion.matches || document.hidden) return;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  $('#rotating-text').textContent = phrases[phraseIndex];
}
phraseTimer = setInterval(rotatePhrase, 4000);

let toastTimer;
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200);
}
$('#copy-email').addEventListener('click', async () => {
  try {await navigator.clipboard.writeText('sarakrish004@gmail.com'); toast('Email copied. Say hello!');}
  catch {toast('Please copy the email address beside this button.');}
});

// A transparent, local FAQ guide. No API keys, network requests, or invented answers.
const guide = $('#guide-panel');
const guideToggle = $('#guide-toggle');
function setGuideOpen(open) {
  guide.hidden = !open;
  guideToggle.setAttribute('aria-expanded', String(open));
  guideToggle.setAttribute('aria-label', open ? 'Close portfolio guide' : 'Open portfolio guide');
  if (open) $('#guide-input').focus();
}
guideToggle.addEventListener('click', () => setGuideOpen(guide.hidden));
$('#guide-close').addEventListener('click', () => {setGuideOpen(false); guideToggle.focus();});
function answerQuestion(question) {
  const query = question.toLowerCase();
  const project = projects.find(item => query.includes(item.id) || query.includes(item.title.toLowerCase()) || (item.id === 'troubleshooter' && /expert|distributed|load.balanc/.test(query)) || (item.id === 'screening' && /x.?ray|yolo|vision|detection|clcxray/.test(query)));
  if (project) return {text:`${project.title}: ${project.overview}\n\nBuilt with ${project.stack.join(', ')}.`, project:project.id, label:`Explore ${project.title} ↗`};
  if (/contact|email|reach|hire|opportunit|connect|talk/.test(query)) return {text:'You can reach Sarayu at sarakrish004@gmail.com, or connect on LinkedIn. She is based in Bengaluru, India.', href:'#contact', label:'Go to contact ↗'};
  if (/experience|deloitte|hashedin|intern|compass|mcp/.test(query)) return {text:'Sarayu was an SDE Intern at HashedIn by Deloitte from April to August 2026. She built Compass, a desktop app consolidating 8+ product-management workflows, and integrated 10+ MCP servers to connect AI assistants with enterprise tools. Her résumé reports a 60% reduction in manual product-management effort.', href:'#experience', label:'Explore the experience ↗'};
  if (/stack|skill|language|tool|technolog/.test(query)) return {text:'Her work brings together Python, Java, SQL, React, TypeScript, FastAPI, Flutter, and Electron. On the AI side: LangGraph, LangChain, machine learning, computer vision, and deep learning. She has also worked with PostgreSQL, ChromaDB, Firebase, and Docker.', href:'#skills', label:'See the toolkit ↗'};
  if (/educat|college|amrita|degree|cgpa|stud/.test(query)) return {text:'Sarayu graduated with a B.Tech in Computer Science and Engineering from Amrita Vishwa Vidyapeetham, Bengaluru (2022–2026), with a CGPA of 8.35/10.', href:'#experience', label:'Education & experience ↗'};
  if (/publication|research|paper|award|hackathon|achievement|kaggle/.test(query)) return {text:'Highlights include Top 10 at Infosys Global Hackathon 2025, first prize at Algomania 2024, and a cybersecurity dataset with 3.9K+ views and 700+ downloads on Kaggle. Her two publications cover multilingual lexical analysis and grid-based parking allocation.', href:'#beyond', label:'Beyond the code ↗'};
  if (/resume|résumé|cv/.test(query)) return {text:'The résumé covers Sarayu’s experience, projects, education, publications, and skills.', href:'assets/Sarayu-Krishna-Resume.pdf', label:'Open résumé ↗'};
  if (/project|work|build|first|recommend|show/.test(query)) return {text:'Start with Ripple: an audience simulation platform combining independent AI personas, LangGraph workflows, and an interactive audience map. FlexiFlow explores adaptive recommendations, Troubleshooter matches issues to experts across regions, and Smart Screening compares YOLO models for baggage X-ray object detection.', project:'ripple', label:'Explore Ripple ↗'};
  if (/hello|hey|hi\b|about|who|yourself|sarayu/.test(query)) return {text:'Sarayu is a Bengaluru-based software engineer and Computer Science graduate. Her interests sit at the intersection of full-stack products, AI systems, and data-driven problem solving. You can ask me about projects, skills, experience, education, or achievements.', href:'#about', label:'Meet Sarayu ↗'};
  return {text:'I can answer questions about the information in this portfolio: projects, experience, skills, education, publications, and contact details. For anything else, the best person to ask is Sarayu!', href:'#contact', label:'Get in touch ↗'};
}
function addGuideMessage(text, user = false, response = null) {
  const message = document.createElement('div');
  message.className = `guide-message${user ? ' user' : ''}`;
  message.textContent = text;
  if (response?.label) {
    message.append(document.createElement('br'));
    const link = document.createElement('a');
    link.textContent = response.label;
    link.href = response.project ? `#project-${response.project}` : response.href;
    link.addEventListener('click', event => {
      if (response.project) {event.preventDefault(); openProject(response.project);}
      else setGuideOpen(false);
    });
    message.append(link);
  }
  const messages = $('#guide-messages');
  messages.append(message);
  // Keep this lightweight even during a long browsing session.
  while (messages.children.length > 40) messages.firstElementChild.remove();
  messages.scrollTop = messages.scrollHeight;
}
function submitQuestion(question) {
  const value = question.trim().slice(0,300);
  if (!value) return;
  addGuideMessage(value, true);
  const response = answerQuestion(value);
  addGuideMessage(response.text, false, response);
  $('#guide-input').value = '';
}
$('#guide-form').addEventListener('submit', event => {event.preventDefault(); submitQuestion($('#guide-input').value);});
$$('[data-question]').forEach(button => button.addEventListener('click', () => submitQuestion(button.dataset.question)));

// Useful for links shared directly to a particular case study.
if (location.hash.startsWith('#case-')) openProject(location.hash.slice(6));
