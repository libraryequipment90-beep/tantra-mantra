const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

navToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

function headerOffset() {
  return document.querySelector(".site-header")?.offsetHeight || 78;
}

function scrollToId(id) {
  const target = id === "top"
    ? document.querySelector(".site-header")
    : document.getElementById(id);
  if (!target) return false;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

document.querySelectorAll('.main-nav a, .site-footer nav a, .brand, .header-cta').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    scrollToId(id);
    mainNav.classList.remove("open");
    history.replaceState(null, "", href);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function bindForm(id) {
  const form = document.getElementById(id);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    showToast("Your request has been received. Our expert will contact you soon.");
  });
}

bindForm("heroForm");
bindForm("contactForm");

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

const sections = ["top", "services", "about", "testimonials", "blog", "contact"];
const navLinks = document.querySelectorAll(".main-nav a");

function setActive() {
  const y = window.scrollY + 120;
  let current = "top";
  sections.forEach((id) => {
    const el = id === "top" ? document.querySelector(".hero") : document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  });
  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${current}` || (current === "top" && href === "#top"));
  });
}

window.addEventListener("scroll", setActive, { passive: true });
setActive();
