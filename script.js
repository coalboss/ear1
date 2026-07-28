const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

const sectionLinks = new Map(
  [...navigation.querySelectorAll('a[href^="#"]')].map((link) => [
    link.getAttribute("href").slice(1),
    link,
  ]),
);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    sectionLinks.forEach((link) => link.classList.remove("active"));
    sectionLinks.get(visible.target.id)?.classList.add("active");
  },
  {
    rootMargin: "-22% 0px -62% 0px",
    threshold: [0.05, 0.25, 0.5],
  },
);

sectionLinks.forEach((_, id) => {
  const section = document.getElementById(id);
  if (section) {
    observer.observe(section);
  }
});
