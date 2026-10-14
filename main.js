const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const navOverlay = document.getElementById("navOverlay");
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const WHATSAPP = "919876543210";

const SECTIONS = ["home", "about", "services", "blog", "testimonials", "faq", "contact"];

function headerOffset() {
  return document.querySelector(".site-header")?.offsetHeight || 78;
}

function scrollToSection(id) {
  const target = id === "home" ? document.getElementById("home") : document.getElementById(id);
  if (!target) return;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset() + 1);
  window.scrollTo({ top, behavior: "smooth" });
}

function setNavOpen(open) {
  mainNav?.classList.toggle("open", open);
  navToggle?.classList.toggle("open", open);
  navOverlay?.classList.toggle("show", open);
  document.body.classList.toggle("nav-open", open);
  navToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle?.addEventListener("click", () => {
  setNavOpen(!mainNav.classList.contains("open"));
});

navOverlay?.addEventListener("click", () => setNavOpen(false));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (href === "#") return;
    const id = href.slice(1);
    if (!document.getElementById(id)) return;
    e.preventDefault();
    scrollToSection(id);
    setNavOpen(false);
    history.replaceState(null, "", href);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function digitsPhone(value) {
  const d = String(value).replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return d.slice(2);
  if (d.length === 11 && d.startsWith("0")) return d.slice(1);
  return d;
}

function validName(value) {
  return /^[A-Za-z][A-Za-z .']{1,59}$/.test(value.trim());
}

function validPhone(value) {
  return /^[6-9]\d{9}$/.test(digitsPhone(value));
}

function setFieldError(field, message) {
  const wrap = field.closest(".field") || field.parentElement;
  let err = wrap.querySelector(".field-error");
  if (!err) {
    err = document.createElement("span");
    err.className = "field-error";
    wrap.appendChild(err);
  }
  err.textContent = message || "";
  field.classList.toggle("invalid", Boolean(message));
}

function clearFormErrors(form) {
  form.querySelectorAll(".field-error").forEach((el) => { el.textContent = ""; });
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
}

function validateForm(form) {
  clearFormErrors(form);
  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const email = form.querySelector('[name="email"]');
  const service = form.querySelector('[name="service"]');
  const message = form.querySelector('[name="message"]');
  let ok = true;

  if (!validName(name.value)) {
    setFieldError(name, "Enter a valid name (letters only).");
    ok = false;
  }
  if (!validPhone(phone.value)) {
    setFieldError(phone, "Enter a valid 10-digit mobile number.");
    ok = false;
  }
  if (email && email.value.trim()) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.value.trim())) {
      setFieldError(email, "Enter a valid email address.");
      ok = false;
    }
  }
  if (!service.value) {
    setFieldError(service, "Please select a service.");
    ok = false;
  }
  if (message.value.trim().length < 10) {
    setFieldError(message, "Please describe your problem (at least 10 characters).");
    ok = false;
  }
  return ok;
}

function buildWhatsAppText(data) {
  return [
    "Namaste, I want a consultation.",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Service: ${data.service}`,
    `Message: ${data.message}`
  ].filter(Boolean).join("\n");
}

function bindForm(id) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      showToast("Please correct the highlighted fields.");
      form.querySelector(".invalid")?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsAppText(data))}`;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Sending…";
    window.open(url, "_blank", "noopener");
    form.reset();
    clearFormErrors(form);
    showToast("Request ready on WhatsApp. Send it to connect with our expert.");
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
    }, 1200);
  });
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, ""));
    field.addEventListener("change", () => setFieldError(field, ""));
  });
}

bindForm("contactForm");

const serviceInfo = {
  "Love Problem Solution": {
    summary: "Love problems usually begin with silence — one side withdraws and the other keeps guessing. We study your situation privately and use mantra and ritual work to reopen communication, dissolve misunderstanding and rebuild sincere affection, with respect for both people involved.",
    steps: [
      "Private consultation to understand both sides of the story.",
      "A specific mantra and ritual recommended and timed for your case.",
      "Follow-up guidance until communication and trust return."
    ],
    prepare: [
      "A short timeline of what changed and when it started.",
      "Name and, if you are comfortable, a photo of the person involved."
    ]
  },
  "Marriage Problem Solution": {
    summary: "Delay in marriage is rarely one single cause — it is usually a mix of planetary timing, family resistance and unspoken fears. We identify the real block and perform remedies to clear it, so the decision can move forward with peace and consent.",
    steps: [
      "Chart and situation review to locate the actual obstacle.",
      "Remedy performed for the couple and both families.",
      "Support through engagement or wedding planning."
    ],
    prepare: [
      "Birth details of the couple (date, time and place if known).",
      "A short note on family concerns or past matching issues."
    ]
  },
  "Vashikaran": {
    summary: "Vashikaran is the most misrepresented practice in this field, so we are clear about it: here it is used only to reunite hearts, soften anger and restore harmony — never to harm or control anyone against their free will. If the intention is not clean, we decline the case.",
    steps: [
      "A private session to confirm the intention and the situation.",
      "Practice performed with discipline and a fixed duration.",
      "Guidance on behaviour, patience and follow-up."
    ],
    prepare: [
      "A clear, honest statement of what you want to achieve.",
      "Photo and name only if you are fully comfortable sharing them."
    ]
  },
  "Black Magic Removal": {
    summary: "If a home feels heavy, sleep breaks, money drains or the same arguments repeat for no reason, negative energy or evil eye may be involved. We first diagnose, then cleanse, then shield — so the problem does not simply return after a short time.",
    steps: [
      "Diagnosis of evil eye, tantra prayog or lingering negativity.",
      "Cleansing ritual for the person, the home and belongings.",
      "A protective shield and a simple daily practice for the family."
    ],
    prepare: [
      "The symptoms and how long they have been happening.",
      "A photo of the main entrance of your home or shop."
    ]
  },
  "Business Growth": {
    summary: "When effort stays high but sales stay flat, the block is often energetic rather than practical — stuck deals, a strained partnership or cash that slips away. We combine Lakshmi remedies with grounded business advice so energy and action move in the same direction.",
    steps: [
      "Review of the business, partnership and cash-flow pattern.",
      "Remedy performed for growth, inflow and goodwill.",
      "Practical next steps discussed with you."
    ],
    prepare: [
      "The nature of your business and who else is involved.",
      "Where the flow stalls — sales, payments or partners."
    ]
  },
  "Career Problem Solution": {
    summary: "Interview after interview with no result, a promotion that keeps getting postponed, or office politics that drains your confidence — these are among the most common blocks we clear. The work sharpens your presence and removes resistance around your progress.",
    steps: [
      "Consultation about the job, workplace and past attempts.",
      "Remedy performed for focus, favour and opportunity.",
      "Guidance on the best timing for interviews or applications."
    ],
    prepare: [
      "Details of your work and how long the block has lasted.",
      "Any upcoming interview or decision dates."
    ]
  },
  "Health Problem Solution": {
    summary: "We do not replace doctors, and you should never stop medical treatment. What we offer is spiritual support for chronic, unexplained or stress-linked suffering — the kind where reports come out normal but the body still does not feel right. Faith and care work best together.",
    steps: [
      "A careful discussion of the symptoms and treatment so far.",
      "Mantra and cleansing support for balance and protection.",
      "Continued support alongside your medical care."
    ],
    prepare: [
      "A brief history of the illness and treatments already tried.",
      "The name and birth details of the person suffering."
    ]
  },
  "Family Dispute Solution": {
    summary: "Long property fights, in-law conflict and a house that never feels calm can exhaust an entire family. These situations carry stuck anger and old wounds. We work to release that energy and restore respect, so people can at least sit together again.",
    steps: [
      "Understanding of who is involved and what triggered it.",
      "Peace and reconciliation ritual for the household.",
      "Guidance on rebuilding trust, step by step."
    ],
    prepare: [
      "A short summary of the dispute and the people involved.",
      "Birth details of the main family members, if available."
    ]
  }
};

function openService(name) {
  const info = serviceInfo[name];
  if (!info) return;
  const steps = info.steps.map((s) => `<li>${s}</li>`).join("");
  const prep = info.prepare.map((s) => `<li>${s}</li>`).join("");
  openModal(name, `
    <p>${info.summary}</p>
    <h4>How it works</h4>
    <ol>${steps}</ol>
    <h4>Before you consult</h4>
    <ul>${prep}</ul>
    <a class="btn btn-primary" href="#contact" data-close-modal>Book This Remedy</a>`);
}

document.querySelectorAll("[data-service]").forEach((card) => {
  card.addEventListener("click", () => {
    openService(card.getAttribute("data-service"));
  });
});

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.getElementById("modalClose")?.focus();
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.getElementById("modalClose")?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    setNavOpen(false);
  }
});

const articles = {
  puja: {
    title: "How to Perform a Simple Home Puja",
    date: "April 12, 2025",
    html: `
      <p>A daily home puja keeps the atmosphere calm and invites positive energy. You do not need a large temple — sincerity matters more than scale.</p>
      <h4>What you need</h4>
      <ul>
        <li>A clean cloth, diya (oil lamp), incense, flowers and water</li>
        <li>A photo or murti of your ishta devata</li>
        <li>A few minutes of quiet, without phones</li>
      </ul>
      <h4>Simple steps</h4>
      <ol>
        <li>Bathe and wear clean clothes. Sweep the puja space.</li>
        <li>Light the diya and incense. Offer water and flowers.</li>
        <li>Chant Om Namah Shivaya or Gayatri 11 or 21 times.</li>
        <li>Sit in silence for one minute and pray for family peace.</li>
        <li>Bow, extinguish the diya safely, and share prasad if you have it.</li>
      </ol>
      <p>Perform this at sunrise or sunset. Consistency for 21 days builds a strong spiritual rhythm at home.</p>
      <a class="btn btn-primary" href="#contact" data-close-modal>Book a Personal Ritual Guide</a>`
  },
  mantra: {
    title: "Benefits of Mantra Chanting in Daily Life",
    date: "April 5, 2025",
    html: `
      <p>Mantra is sound with intention. Repeating a sacred syllable steadies the mind, regulates breath and slowly shifts inner energy.</p>
      <h4>Daily benefits</h4>
      <ul>
        <li>Reduces anxiety and racing thoughts</li>
        <li>Improves focus before work or study</li>
        <li>Softens anger and family tension</li>
        <li>Builds faith during difficult periods</li>
      </ul>
      <h4>How to begin</h4>
      <p>Sit with a straight spine. Use a mala of 108 beads if you have one. Start with 11 recitations of Om Namah Shivaya or a mantra given by your guru. Do this at the same time every day.</p>
      <p>If you have a specific problem — love, health, business or protection — a personalised mantra from an experienced tantrik is more effective than a generic chant.</p>
      <a class="btn btn-primary" href="#contact" data-close-modal>Get a Personalised Mantra</a>`
  },
  yantra: {
    title: "Understanding the Power of Yantras",
    date: "March 28, 2025",
    html: `
      <p>A yantra is a sacred geometric diagram. It is a seat of a deity’s energy, used for meditation, protection and attracting specific results.</p>
      <h4>Common yantras</h4>
      <ul>
        <li><strong>Sri Yantra</strong> — prosperity, harmony and spiritual growth</li>
        <li><strong>Kali Yantra</strong> — protection and removal of heavy obstacles</li>
        <li><strong>Bagalamukhi Yantra</strong> — victory over disputes and enemies</li>
        <li><strong>Shiva Yantra</strong> — peace, health and inner strength</li>
      </ul>
      <p>A yantra must be energised (prana pratishtha) with mantra and ritual. An unenergised print is only art. Placement also matters — puja room, cash box or entrance — depending on the purpose.</p>
      <p>Never treat a yantra as decoration in a bedroom or near shoes. Keep it clean, offer a diya on Fridays, and follow the guidance given with it.</p>
      <a class="btn btn-primary" href="#contact" data-close-modal>Consult for an Energised Yantra</a>`
  },
  energy: {
    title: "Signs of Negative Energy in Your Home",
    date: "March 20, 2025",
    html: `
      <p>Homes hold energy. After arguments, illness, sudden loss or unexplained fear, the space can feel heavy. These signs often appear together.</p>
      <h4>Watch for</h4>
      <ul>
        <li>Constant quarrels over small matters</li>
        <li>Sleep problems, nightmares or sudden fatigue</li>
        <li>Money leaking without a clear reason</li>
        <li>Plants dying, diyas going out, or a stale smell</li>
        <li>Guests feeling uneasy and leaving quickly</li>
        <li>Children becoming unusually fearful or restless</li>
      </ul>
      <h4>What you can do</h4>
      <p>Clean thoroughly, open windows, burn camphor or guggul, and sprinkle Gangajal. Chant a protection mantra at the entrance. If the heaviness remains, a black-magic or drishti check by an experienced tantrik is wise — especially if several signs appeared after a specific event or visitor.</p>
      <a class="btn btn-primary" href="#contact" data-close-modal>Request an Energy Cleansing</a>`
  }
};

function openArticle(key) {
  const article = articles[key];
  if (!article) return;
  openModal(article.title, `<time>${article.date}</time>${article.html}`);
}

document.querySelectorAll("[data-article]").forEach((card) => {
  card.addEventListener("click", () => openArticle(card.getAttribute("data-article")));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openArticle(card.getAttribute("data-article"));
    }
  });
});

document.getElementById("knowMoreAbout")?.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("About Tantra Mantra", `
    <p>Tantra Mantra is a traditional practice group based in Varanasi. Our work is rooted in Shaiva and Shakta parampara — mantra, yantra, havan and protective sadhana — applied to modern family, love, health and livelihood problems.</p>
    <h4>How we work</h4>
    <ol>
      <li>Free first consultation to understand the issue</li>
      <li>Energetic and, if needed, horoscope reading</li>
      <li>A clear plan: duration, materials and expected process</li>
      <li>Private ritual work with regular updates</li>
      <li>Protection guidance so the result stays stable</li>
    </ol>
    <h4>What we do not do</h4>
    <ul>
      <li>No harm-to-others rituals</li>
      <li>No fake overnight guarantees</li>
      <li>No public sharing of client names or photos</li>
    </ul>
    <p>Tantra here means energy, discipline and balance — not fear. If you are ready to talk, we will listen without judgement.</p>
    <a class="btn btn-primary" href="#contact" data-close-modal>Start a Confidential Consultation</a>`);
});

document.getElementById("privacyLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Privacy Policy", `
    <p>Last updated: October 2026</p>
    <p>We collect only what you share in forms or WhatsApp: name, phone, optional email and the description of your problem. This information is used solely to consult, perform agreed rituals and follow up with you.</p>
    <h4>We do not</h4>
    <ul>
      <li>Sell or rent your data</li>
      <li>Post your story with your real name without written consent</li>
      <li>Share horoscope or ritual details with third parties</li>
    </ul>
    <p>Messages sent via WhatsApp are subject to WhatsApp’s own policy. You may ask us to delete your notes at any time by writing to info@tantramantra.com.</p>`);
});

document.getElementById("termsLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Terms & Conditions", `
    <p>By submitting a consultation request you confirm that details you provide are true to your knowledge.</p>
    <ul>
      <li>Spiritual remedies support life; they do not replace medical, legal or financial advice.</li>
      <li>Results depend on many factors and are not guaranteed by date.</li>
      <li>Ritual fees, once sadhana has begun, are non-refundable except if we cancel before starting.</li>
      <li>Abusive or illegal requests will be refused.</li>
      <li>Indian law (Varanasi, Uttar Pradesh) governs these terms.</li>
    </ul>
    <p>Questions: call +91 98765 43210 or email info@tantramantra.com.</p>`);
});

modalBody?.addEventListener("click", (e) => {
  const closeLink = e.target.closest("[data-close-modal]");
  if (!closeLink) return;
  closeModal();
  const href = closeLink.getAttribute("href") || "";
  if (href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    const id = href.slice(1);
    if (document.getElementById(id)) {
      scrollToSection(id);
      history.replaceState(null, "", href);
    }
  }
});

document.querySelectorAll(".socials a[href='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Our " + (a.getAttribute("aria-label") || "social") + " page will open soon.");
  });
});

const faqRoot = document.querySelector(".faq-grid");
faqRoot?.addEventListener("toggle", (e) => {
  const t = e.target;
  if (t.tagName !== "DETAILS" || !t.open) return;
  faqRoot.querySelectorAll("details[open]").forEach((d) => {
    if (d !== t) d.removeAttribute("open");
  });
}, true);

const track = document.getElementById("testiTrack");
const cards = [...document.querySelectorAll(".testi-card")];
const dotsWrap = document.getElementById("testiDots");
let index = 0;

function cardStep() {
  const card = cards[0];
  if (!card || !track) return card?.offsetWidth || 0;
  const style = getComputedStyle(track);
  const gap = parseFloat(style.columnGap || style.gap) || 18;
  return card.offsetWidth + gap;
}

function goTo(i) {
  if (!cards.length) return;
  index = (i + cards.length) % cards.length;
  track.scrollTo({ left: index * cardStep(), behavior: "smooth" });
  cards.forEach((card, n) => card.classList.toggle("is-active", n === index));
  dotsWrap?.querySelectorAll("button").forEach((b, n) => {
    b.classList.toggle("active", n === index);
    b.setAttribute("aria-current", n === index ? "true" : "false");
  });
}

if (dotsWrap && cards.length) {
  dotsWrap.innerHTML = cards.map((_, i) =>
    `<button type="button" aria-label="Testimonial ${i + 1}"></button>`
  ).join("");
  dotsWrap.querySelectorAll("button").forEach((b, i) => {
    b.addEventListener("click", () => goTo(i));
  });
}

document.getElementById("nextTesti")?.addEventListener("click", () => goTo(index + 1));
document.getElementById("prevTesti")?.addEventListener("click", () => goTo(index - 1));

track?.addEventListener("scroll", () => {
  const step = cardStep();
  if (!step) return;
  const next = Math.round(track.scrollLeft / step);
  if (next !== index && next >= 0 && next < cards.length) {
    index = next;
    cards.forEach((card, n) => card.classList.toggle("is-active", n === index));
    dotsWrap?.querySelectorAll("button").forEach((b, n) => {
      b.classList.toggle("active", n === index);
    });
  }
}, { passive: true });

goTo(0);
window.addEventListener("resize", () => goTo(index));

function setActive() {
  const y = window.scrollY + 130;
  let current = "home";
  SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  });
  document.querySelectorAll(".main-nav a, .site-footer nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${current}`);
  });
}

window.addEventListener("scroll", setActive, { passive: true });
setActive();

if (location.hash && document.getElementById(location.hash.slice(1))) {
  setTimeout(() => scrollToSection(location.hash.slice(1)), 80);
}
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (document.getElementById(id)) scrollToSection(id);
});

document.querySelectorAll(".testi-top img").forEach((img) => {
  img.addEventListener("error", () => {
    img.replaceWith(Object.assign(document.createElement("span"), {
      className: "testi-avatar",
      textContent: (img.alt || "C").trim().charAt(0).toUpperCase()
    }));
  });
});
