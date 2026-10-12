/**
 * menu.js — Menu page logic for Al-Aseel Restaurant
 * Handles: menu data, category filter, add-to-cart
 * Tasks: 6.1, 6.2, 6.4
 */

'use strict';

// ── Menu Data ──────────────────────────────────────────────
const menuItems = [
    // مقبلات
    {
        id: 'meze-01',
        name: 'حمص بالطحينة',
        description: 'حمص كريمي محضّر من الحبوب الطازجة مع الطحينة وزيت الزيتون البكر وعصير الليمون',
        price: 18,
        category: 'مقبلات',
        image: 'https://images.pexels.com/photos/6089614/pexels-photo-6089614/free-photo-of-hummus-in-bowl.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'meze-02',
        name: 'سلطة فتوش',
        description: 'خضروات طازجة مقرمشة مع خبز محمص وصلصة الرمان والنعناع الأخضر',
        price: 22,
        category: 'مقبلات',
        image: 'https://images.pexels.com/photos/4768991/pexels-photo-4768991/free-photo-of-vegetable-salad-on-black-ceramic-bowl.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'meze-03',
        name: 'متبل الباذنجان',
        description: 'باذنجان مشوي على الفحم مع الطحينة والثوم وزيت الزيتون، يُقدَّم مع الخبز العربي',
        price: 20,
        category: 'مقبلات',
        image: 'https://images.pexels.com/photos/5191817/pexels-photo-5191817/free-photo-of-baba-ghanoush-with-olive-oil-and-pomegranate-seeds.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'meze-04',
        name: 'ورق عنب',
        description: 'أوراق عنب محشوة بالأرز والأعشاب العطرية، مطهوة ببطء مع عصير الليمون',
        price: 25,
        category: 'مقبلات',
        image: 'https://images.pexels.com/photos/6089620/pexels-photo-6089620/free-photo-of-stuffed-grape-leaves.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },

    // أطباق رئيسية
    {
        id: 'main-01',
        name: 'كبسة لحم',
        description: 'أرز بسمتي مطبوخ بالتوابل السعودية الأصيلة مع لحم الضأن الطري على نار هادئة',
        price: 65,
        category: 'أطباق رئيسية',
        image: 'https://images.pexels.com/photos/17650198/pexels-photo-17650198/free-photo-of-top-view-of-kabsa.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'main-02',
        name: 'مندي دجاج',
        description: 'دجاج مدخّن بالطريقة التقليدية في التنور مع أرز العنبر والبهارات المختارة',
        price: 55,
        category: 'أطباق رئيسية',
        image: 'https://images.pexels.com/photos/18698228/pexels-photo-18698228/free-photo-of-food-photography.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'main-03',
        name: 'مظبي خروف',
        description: 'خروف كامل مشوي على الفحم بتتبيلة الأعشاب السعودية، يُقدَّم مع الأرز والمرق',
        price: 85,
        category: 'أطباق رئيسية',
        image: 'https://images.pexels.com/photos/7741798/pexels-photo-7741798/free-photo-of-grilled-meat-on-black-plate.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'main-04',
        name: 'جريش بالدجاج',
        description: 'قمح مجروش مطبوخ مع الدجاج والبصل والتوابل، طبق تراثي سعودي أصيل',
        price: 48,
        category: 'أطباق رئيسية',
        image: 'https://images.pexels.com/photos/17650172/pexels-photo-17650172/free-photo-of-meal-with-spices-on-plate.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'main-05',
        name: 'مطبق',
        description: 'فطيرة سعودية مقرمشة محشوة باللحم المفروم والبصل والبيض والتوابل',
        price: 20,
        category: 'أطباق رئيسية',
        image: 'https://i.pinimg.com/1200x/bd/07/f3/bd07f369d7551760f12f7f41c28bb899.jpg'
    },
    {
        id: 'main-06',
        name: 'هريس',
        description: 'قمح مطحون مطبوخ ببطء مع اللحم والسمن، طبق تراثي خليجي أصيل',
        price: 22,
        category: 'أطباق رئيسية',
        image: 'https://i.pinimg.com/1200x/e4/70/f8/e470f8458babf6564efef4b08c163c61.jpg'
    },

    // مشروبات
    {
        id: 'drink-01',
        name: 'قهوة عربية',
        description: 'قهوة سعودية أصيلة محضّرة بالهيل والزعفران، تُقدَّم مع التمر',
        price: 15,
        category: 'مشروبات',
        image: 'https://images.pexels.com/photos/5113071/pexels-photo-5113071/free-photo-of-pouring-of-coffee-in-a-small-ceramic-cup.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'drink-02',
        name: 'عصير رمان طازج',
        description: 'عصير رمان طبيعي 100% معصور لحظياً، غني بمضادات الأكسدة',
        price: 20,
        category: 'مشروبات',
        image: 'https://images.pexels.com/photos/8679622/pexels-photo-8679622/free-photo-of-pomegranate-juice-in-a-glass.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'drink-03',
        name: 'لبن بالنعناع',
        description: 'لبن طازج مخفوق مع النعناع الأخضر والملح، مشروب منعش ومبرد',
        price: 12,
        category: 'مشروبات',
        image: 'https://images.pexels.com/photos/18142603/pexels-photo-18142603/free-photo-of-cold-drink-in-a-glass.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'drink-04',
        name: 'شاي كرك',
        description: 'شاي هندي مغلي مع الحليب والهيل والزنجبيل، دافئ ومنعش',
        price: 10,
        category: 'مشروبات',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280/free-photo-of-tea-in-glass.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },

    // حلويات
    {
        id: 'dessert-01',
        name: 'أم علي',
        description: 'حلوى مصرية كلاسيكية من الخبز المحمص مع الحليب والمكسرات والزبيب',
        price: 28,
        category: 'حلويات',
        image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219/free-photo-of-close-up-of-a-dessert.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'dessert-02',
        name: 'كنافة بالجبن',
        description: 'كنافة شعرية مقرمشة محشوة بالجبن العكاوي الطري، تُسكب عليها القطر العطر',
        price: 32,
        category: 'حلويات',
        image: 'https://images.pexels.com/photos/6271902/pexels-photo-6271902/free-photo-of-overhead-shot-of-knafeh.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'dessert-03',
        name: 'بسبوسة بالقشطة',
        description: 'بسبوسة سميد طرية مع القشطة الطازجة والمكسرات، محلاة بالعسل الطبيعي',
        price: 25,
        category: 'حلويات',
        image: 'https://images.pexels.com/photos/10865942/pexels-photo-10865942/free-photo-of-close-up-photograph-of-basbousa-cake.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
        id: 'dessert-04',
        name: 'تمر بالقشطة',
        description: 'تمر مجدول فاخر محشو بالقشطة الطازجة والمكسرات، طبق سعودي أصيل',
        price: 22,
        category: 'حلويات',
        image: 'https://images.pexels.com/photos/34746904/pexels-photo-34746904/free-photo-of-elegant-gourmet-dates-with-nuts-and-rosebuds.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
];

// ── Render Menu ────────────────────────────────────────────
/**
 * Renders menu item cards into #menu-grid.
 * @param {Array} items - Array of menu item objects to render
 */
function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    grid.innerHTML = items.map(item => `
    <article class="menu-item reveal" data-category="${item.category}" data-id="${item.id}">
      <figure class="menu-item__figure">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="menu-item__img"
          loading="lazy"
          width="400"
          height="300"
        />
      </figure>
      <div class="menu-item__body">
        <h3 class="menu-item__name">${item.name}</h3>
        <p class="menu-item__desc">${item.description}</p>
        <div class="menu-item__footer">
          <span class="menu-item__price" dir="ltr">${item.price} ر.س</span>
          <button
            class="add-to-cart-btn btn btn--primary"
            data-id="${item.id}"
            aria-label="أضف ${item.name} إلى السلة"
          >
            <i class="fa-solid fa-cart-plus"></i>
            أضف إلى السلة
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ── Render Category Filters ────────────────────────────────
/**
 * Renders category filter buttons into #category-filters.
 */
function renderFilters() {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;

    const categories = ['الكل', ...new Set(menuItems.map(item => item.category))];

    filtersContainer.innerHTML = categories.map((cat, index) => `
    <button
      class="filter-btn${index === 0 ? ' filter-btn--active' : ''}"
      data-category="${cat}"
      aria-pressed="${index === 0 ? 'true' : 'false'}"
    >
      ${cat}
    </button>
  `).join('');

    // Attach filter click handlers
    filtersContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        const selected = btn.dataset.category;

        // Update active state
        filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('filter-btn--active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('filter-btn--active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter items
        const items = document.querySelectorAll('.menu-item');
        items.forEach(item => {
            const match = selected === 'الكل' || item.dataset.category === selected;
            item.hidden = !match;
        });
    });
}

// ── Add to Cart ────────────────────────────────────────────
/**
 * Wires add-to-cart buttons to the shared incrementCart() from main.js.
 */
function wireCartButtons() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;

        if (typeof incrementCart === 'function') {
            incrementCart();
        }

        // Visual feedback: 500ms color change
        btn.classList.add('add-to-cart-btn--added');
        setTimeout(() => btn.classList.remove('add-to-cart-btn--added'), 500);
    });
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderMenu(menuItems);
    wireCartButtons();
});
