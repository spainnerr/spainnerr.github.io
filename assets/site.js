(() => {
  "use strict";
  const themeButton = document.querySelector(".theme-toggle");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let chosenTheme;
  try { chosenTheme = localStorage.getItem("spainner-theme"); } catch (_) {}
  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#101216" : "#f5f5f7";
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
      themeButton.title = dark ? "Ativar modo claro" : "Ativar modo escuro";
    }
  }
  function followSystemTheme() {
    applyTheme(chosenTheme === "dark" || chosenTheme === "light" ? chosenTheme : (systemTheme.matches ? "dark" : "light"));
  }
  followSystemTheme();
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener("click", () => {
      chosenTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(chosenTheme);
      try { localStorage.setItem("spainner-theme", chosenTheme); } catch (_) {}
    });
  }
  if (systemTheme.addEventListener) systemTheme.addEventListener("change", followSystemTheme);
  else systemTheme.addListener(followSystemTheme);
  window.addEventListener("storage", (event) => {
    if (event.key === "spainner-theme" || event.key === null) {
      chosenTheme = event.newValue;
      followSystemTheme();
    }
  });

  const navigation = document.querySelector(".navigation");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const narrowScreen = window.matchMedia("(max-width: 760px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton = document.querySelector(".motion-toggle");

  function closeMenu(restoreFocus = false) {
    if (!menuButton || !navLinks) return;
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    if (wasOpen && restoreFocus) menuButton.focus();
  }

  if (navigation && menuButton && navLinks) {
    navigation.dataset.enhanced = "true";
    function syncMenu() {
      const focusedLinkWillHide = narrowScreen.matches && navLinks.contains(document.activeElement);
      closeMenu(focusedLinkWillHide);
      menuButton.hidden = !narrowScreen.matches;
      if (focusedLinkWillHide) menuButton.focus();
    }
    syncMenu();
    if (narrowScreen.addEventListener) narrowScreen.addEventListener("change", syncMenu);
    else narrowScreen.addListener(syncMenu);
    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      navLinks.classList.toggle("is-open", opening);
    });
    navLinks.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      closeMenu();
      const href = link.getAttribute("href");
      if (narrowScreen.matches && href && href.startsWith("#")) {
        const section = document.getElementById(href.slice(1));
        const heading = section && section.querySelector("h1, h2");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
          heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
        }
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target)) closeMenu();
    });
    navigation.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !navigation.contains(event.relatedTarget)) closeMenu();
    });
  }

  if (motionButton) {
    motionButton.hidden = false;
    function setMotion(paused) {
      document.body.dataset.motion = paused ? "paused" : "running";
      motionButton.setAttribute("aria-pressed", String(paused));
      motionButton.setAttribute("aria-label", paused ? "Ativar animações do site" : "Pausar animações do site");
      motionButton.title = paused ? "Ativar movimento" : "Pausar movimento";
    }
    setMotion(reducedMotion.matches);
    motionButton.addEventListener("click", () => {
      if (reducedMotion.matches) return;
      setMotion(document.body.dataset.motion === "running");
    });
    function syncMotionPreference() {
      setMotion(reducedMotion.matches);
      motionButton.hidden = reducedMotion.matches;
    }
    syncMotionPreference();
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", syncMotionPreference);
    else reducedMotion.addListener(syncMotionPreference);
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) entry.target.classList.add("reveal-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sections = document.querySelectorAll("main section[id]");
    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const year = document.getElementById("copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
