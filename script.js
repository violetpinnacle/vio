document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  const sendButton = document.getElementById("send-enquiry");
  if (sendButton) {
    sendButton.addEventListener("click", () => {
      const service = document.getElementById("service-choice")?.value || "General enquiry";
      const details = document.getElementById("message-choice")?.value.trim() || "";
      const message = `Hello Violet Pinnacle, I would like to enquire about: ${service}.${details ? "\\nDetails: " + details : ""}`;
      window.open(`https://wa.me/916382379295?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    });
  }
});