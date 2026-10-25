const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

navToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

function headerOffset() {
  return document.querySelector(".site-header")?.offsetHeight || 78;
}

const pageIds = ["home", "about", "services", "mantras", "testimonials", "blog", "faq", "contact"];

function showPage(id, scroll = true) {
  const page = pageIds.includes(id) ? id : "home";
  const showAll = page === "home";
  document.body.classList.toggle("home-view", showAll);
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.toggle("is-visible", showAll || section.id === page);
  });
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${page}`);
  });
  history.replaceState(null, "", `#${page}`);
  mainNav?.classList.remove("open");
  if (typeof renderMantras === "function") renderMantras();
  if (scroll) {
    if (showAll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      requestAnimationFrame(() => {
        const target = document.getElementById(page);
        if (!target) return;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }
  return true;
}

document.querySelectorAll('.main-nav a, .site-footer nav a, .brand').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) {
      mainNav?.classList.remove("open");
      return;
    }
    e.preventDefault();
    const id = href.slice(1) === "top" ? "home" : href.slice(1);
    showPage(id);
  });
});

document.querySelectorAll('.header-cta, .hero-btns a, .text-link, .btn-outline').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1) === "top" ? "home" : href.slice(1);
    if (link.classList.contains("home-only")) {
      showPage(id);
      return;
    }
    showPage("home", false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

const WHATSAPP_NUMBER = "919311629296";

function bindForm(id) {
  const form = document.getElementById(id);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const text = [
      "New enquiry from Tantra Mantra website",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Service: ${service}`,
      `Message: ${message}`
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    form.reset();
    if (id === "serviceForm") closeServiceModal();
    showToast("Opening WhatsApp to send your message.");
  });
}

bindForm("heroForm");
bindForm("contactForm");
bindForm("serviceForm");

const serviceModal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalService = document.getElementById("modalService");

function openServiceModal(service, desc) {
  modalTitle.textContent = service;
  modalDesc.textContent = desc;
  modalService.value = service;
  serviceModal.hidden = false;
  document.body.style.overflow = "hidden";
  serviceModal.querySelector('input[name="name"]')?.focus();
}

function closeServiceModal() {
  serviceModal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    openServiceModal(card.dataset.service || "", card.dataset.desc || "");
  });
});

document.getElementById("modalClose")?.addEventListener("click", closeServiceModal);
serviceModal?.addEventListener("click", (e) => {
  if (e.target === serviceModal) closeServiceModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && serviceModal && !serviceModal.hidden) closeServiceModal();
  if (e.key === "Escape" && mantraModal && !mantraModal.hidden) closeMantraModal();
});

const sacredTexts = typeof shabarMantras !== "undefined" ? shabarMantras.slice() : [];

const mantraGrid = document.getElementById("mantraGrid");
const mantraModal = document.getElementById("mantraModal");
const mantraMeta = document.getElementById("mantraMeta");
let typeFilter = "all";

function filteredMantras() {
  const compact = document.body.classList.contains("home-view");
  return sacredTexts.filter((item) => compact || typeFilter === "all" || item.type === typeFilter);
}

function renderMantras() {
  if (!mantraGrid) return;
  const compact = document.body.classList.contains("home-view");
  const list = filteredMantras();
  const shown = compact ? list.slice(0, 6) : list;
  if (mantraMeta) {
    mantraMeta.hidden = compact;
    mantraMeta.textContent = list.length
      ? `${list.length} sacred texts`
      : "No texts in this combination";
  }
  if (!shown.length) {
    mantraGrid.innerHTML = "<p class='mantra-empty'>No texts in this combination. Try another filter.</p>";
    return;
  }
  mantraGrid.innerHTML = shown.map((item) => `
    <button type="button" class="mantra-item" data-index="${sacredTexts.indexOf(item)}">
      <span class="mantra-top">
        <span class="tag">${item.type.toUpperCase()}</span>
        <span class="deity-name">${item.deity}</span>
      </span>
      <h3>${item.title}</h3>
      <p class="preview">${item.preview}</p>
      <span class="view-more">Open sacred text <span>→</span></span>
    </button>
  `).join("");
  mantraGrid.querySelectorAll(".mantra-item").forEach((btn) => {
    btn.addEventListener("click", () => openMantraModal(Number(btn.dataset.index)));
  });
}

let currentMantraText = "";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function versesFromText(text) {
  const blocks = String(text).split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  if (blocks.length >= 4) return blocks;
  const lines = String(text).split(/\n/).map((part) => part.trim()).filter(Boolean);
  return lines.length ? lines : [String(text)];
}

function openMantraModal(i) {
  const item = sacredTexts[i];
  if (!item || !mantraModal) return;
  currentMantraText = item.text;
  document.getElementById("mantraModalType").textContent = item.type.toUpperCase();
  document.getElementById("mantraModalTitle").textContent = item.title;
  const deityEl = document.getElementById("mantraModalDeity");
  deityEl.textContent = item.deity;
  deityEl.hidden = item.deity.toLowerCase() === item.type.toLowerCase();
  document.getElementById("mantraModalText").innerHTML = versesFromText(item.text)
    .map((verse) => `<p class="shloka">${escapeHtml(verse)}</p>`)
    .join("");
  mantraModal.hidden = false;
  document.documentElement.classList.add("mantra-open");
  document.body.classList.add("mantra-open");
}

function closeMantraModal() {
  if (!mantraModal) return;
  mantraModal.hidden = true;
  document.documentElement.classList.remove("mantra-open");
  document.body.classList.remove("mantra-open");
}

document.getElementById("typeFilters")?.querySelectorAll(".chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#typeFilters .chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    typeFilter = btn.dataset.type || "all";
    renderMantras();
  });
});

document.getElementById("mantraModalClose")?.addEventListener("click", closeMantraModal);
mantraModal?.addEventListener("click", (e) => {
  if (e.target === mantraModal) closeMantraModal();
});
document.getElementById("copyMantra")?.addEventListener("click", async () => {
  const text = currentMantraText || document.getElementById("mantraModalText")?.textContent || "";
  try {
    await navigator.clipboard.writeText(text);
    showToast("Mantra copied.");
  } catch {
    showToast("Copy failed. Please select the text.");
  }
});

renderMantras();

const cards = [...document.querySelectorAll(".testi-card")];
let index = 0;

function highlight() {
  cards.forEach((card, i) => {
    card.style.opacity = i === index ? "1" : "0.85";
  });
}

document.getElementById("nextTesti")?.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  highlight();
});

document.getElementById("prevTesti")?.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  highlight();
});

const initialHash = (location.hash || "#home").slice(1);
showPage(initialHash === "top" ? "home" : initialHash);
