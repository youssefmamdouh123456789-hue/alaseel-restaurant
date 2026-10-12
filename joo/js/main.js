/**
 * main.js — Shared JavaScript for Al-Aseel Restaurant
 * Handles: Loader, Navbar scroll + hamburger, Scroll-reveal, Cart counter
 */

'use strict';

/* ── Loader ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('loader--hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 600);
});

/* ── Navbar: scroll behaviour ───────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 80);
    }, { passive: true });
}

/* ── Navbar: hamburger toggle ───────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav--open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('nav--open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ── Footer: current year ───────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Scroll-reveal (Intersection Observer) ──────────────────── */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── Cart counter ───────────────────────────────────────────── */

/** In-memory fallback when localStorage is unavailable */
let _memoryCart = 0;

function _storageAvailable() {
    try {
        const key = '__storage_test__';
        localStorage.setItem(key, '1');
        localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
}

/**
 * Returns the current cart count.
 * @returns {number}
 */
function getCartCount() {
    if (_storageAvailable()) {
        return parseInt(localStorage.getItem('cart_count') || '0', 10);
    }
    return _memoryCart;
}

/**
 * Increments the cart count by 1, persists it, and updates the DOM badge.
 */
function incrementCart() {
    let count = getCartCount() + 1;
    if (_storageAvailable()) {
        localStorage.setItem('cart_count', String(count));
    } else {
        _memoryCart = count;
    }
    _updateCartBadge(count);
}

function _updateCartBadge(count) {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.textContent = count > 0 ? String(count) : '';
    badge.setAttribute('data-count', String(count));
}

// Initialise badge on page load
_updateCartBadge(getCartCount());

/* ── Validation utilities (pure, no DOM side-effects) ───────── */

/**
 * Returns true if the string is a valid email address.
 * @param {string} str
 * @returns {boolean}
 */
function validateEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Returns true if the string is empty or whitespace-only.
 * @param {string} str
 * @returns {boolean}
 */
function isEmptyField(str) {
    return typeof str !== 'string' || str.trim().length === 0;
}

/**
 * Returns true if the given date string represents a date strictly before today.
 * @param {string} dateStr — ISO date string e.g. "2024-01-15"
 * @returns {boolean}
 */
function isPastDate(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateStr);
    selected.setHours(0, 0, 0, 0);
    return selected < today;
}

/* ── Exports (for test environments) ───────────────────────── */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateEmail, isEmptyField, isPastDate, getCartCount, incrementCart };
}
