// FreshSpace Cleaning — interactive behaviours
(function () {
  "use strict";

  // --- Configuration ---
  // WhatsApp booking link with a prepared message (opens in a new tab).
  var WHATSAPP_URL = "https://wa.me/2348000000000?text=Hello%20FreshSpace%20Cleaning,%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20property%20in%20Lagos";

  // --- WhatsApp links (pre-filled booking message) ---
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.setAttribute("href", WHATSAPP_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // --- Sticky header shadow on scroll ---
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Mobile navigation toggle ---
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    // Close menu on outside click / Escape
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  // --- FAQ accordion (single open item at a time) ---
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close all items
      faqItems.forEach(function (other) {
        var otherAnswer = other.querySelector(".faq-answer");
        other.classList.remove("open");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        var otherQ = other.querySelector(".faq-question");
        if (otherQ) otherQ.setAttribute("aria-expanded", "false");
      });

      // Open the clicked item if it wasn't already open
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // --- Footer year ---
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
