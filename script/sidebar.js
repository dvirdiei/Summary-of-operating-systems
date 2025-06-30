document.addEventListener('DOMContentLoaded', function () {
    // --- ניווט פנימי לפי עוגנים ---
    const navLinks = document.querySelectorAll('.nav-sidebar ul li a');
    const sections = document.querySelectorAll('.content-section');
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const id = href.substring(1);
            const target = document.getElementById(id);
            if (!target && sections[index]) {
                sections[index].id = id;
            }
        }
    });

    // --- פתיחה/סגירה של הסייד בר הראשי ---
    const navTitle = document.querySelector('.nav-sidebar-title');
    if (navTitle) {
        navTitle.style.cursor = 'pointer';
        navTitle.addEventListener('click', () => {
            document.querySelector('.nav-sidebar ul').classList.toggle('collapsed');
        });
    }

    // --- טיפול בקטגוריות בתוך סרגל הניווט ---
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            document.querySelectorAll('.nav-category').forEach(cat => {
                cat.classList.remove('active');
            });
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
    if(document.querySelector('.nav-category')) {
        document.querySelector('.nav-category').classList.add('active');
    }

    // --- זיהוי שינוי גודל (zoom) ---
    let currentZoom = 100;
    function checkZoomChange() {
        const newZoom = Math.round(window.devicePixelRatio * 100);
        if (newZoom !== currentZoom) {
            document.querySelectorAll('.category-title').forEach(title => {
                title.classList.remove('zoomed-indicator');
                title.classList.add('zoomed-indicator');
                if (!title.querySelector('.zoom-underline')) {
                    const underline = document.createElement('div');
                    underline.className = 'zoom-underline';
                    title.appendChild(underline);
                }
            });
            currentZoom = newZoom;
        }
    }
    window.addEventListener('resize', checkZoomChange);
    window.addEventListener('wheel', function(e) {
        if (e.ctrlKey) setTimeout(checkZoomChange, 100);
    });
    checkZoomChange();

    // --- כפתור סרגל צד (🔍) ---
    if (!document.getElementById('sidebar-toggle-btn')) {
        // אנימציה לכפתור
        if (!document.getElementById('sidebar-toggle-anim-style')) {
            const style = document.createElement('style');
            style.id = 'sidebar-toggle-anim-style';
            style.innerHTML = `
            @keyframes magnifier-glow {
                0% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 0px 0px #FFD700; }
                30% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 24px 12px #FFD700; }
                60% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 32px 18px #FFD700; }
                80% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 24px 12px #FFD700; }
                100% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 0px 0px #FFD700; }
            }
            #sidebar-toggle-btn.animate-magnifier {
                animation: magnifier-glow 1.2s cubic-bezier(.4,0,.2,1);
            }
            `;
            document.head.appendChild(style);
        }

        // --- יצירת כפתור סרגל צד ---
        const sidebarToggleBtn = document.createElement('button');
        sidebarToggleBtn.innerHTML = '🔍';
        sidebarToggleBtn.setAttribute('aria-label', 'הצג/הסתר תוכן עניינים');
        sidebarToggleBtn.id = 'sidebar-toggle-btn';
        sidebarToggleBtn.style.position = 'fixed';
        sidebarToggleBtn.style.right = '20px';
        sidebarToggleBtn.style.top = '20%';
        sidebarToggleBtn.style.transform = 'translateY(-50%)';
        sidebarToggleBtn.style.zIndex = '1001';
        sidebarToggleBtn.style.background = '#1e293b';
        sidebarToggleBtn.style.border = '2px solid #334155';
        sidebarToggleBtn.style.borderRadius = '50%';
        sidebarToggleBtn.style.width = '50px';
        sidebarToggleBtn.style.height = '50px';
        sidebarToggleBtn.style.fontSize = '2rem';
        sidebarToggleBtn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
        sidebarToggleBtn.style.cursor = 'pointer';
        sidebarToggleBtn.style.display = 'flex';
        sidebarToggleBtn.style.alignItems = 'center';
        sidebarToggleBtn.style.justifyContent = 'center';
        sidebarToggleBtn.style.outline = 'none';
        document.body.appendChild(sidebarToggleBtn);

        // --- כפתור חיפוש צמוד לסרגל צד ---
        if (!document.getElementById('floating-search-btn')) {
            const searchBtn = document.createElement('button');
            searchBtn.innerHTML = '🔍';
            searchBtn.setAttribute('aria-label', 'חיפוש באתר');
            searchBtn.id = 'floating-search-btn';
            searchBtn.style.position = 'fixed';
            searchBtn.style.right = '80px';
            searchBtn.style.top = sidebarToggleBtn.style.top || '20%';
            searchBtn.style.transform = 'translateY(-50%)';
            searchBtn.style.zIndex = '1002';
            searchBtn.style.background = '#23272f';
            searchBtn.style.border = '2px solid rgb(65, 59, 29)';
            searchBtn.style.borderRadius = '50%';
            searchBtn.style.width = '50px';
            searchBtn.style.height = '50px';
            searchBtn.style.fontSize = '2rem';
            searchBtn.style.boxShadow = '0 0 16px 4px rgba(22, 41, 59, 0.5), 0 2px 8px #000a';
            searchBtn.style.cursor = 'pointer';
            searchBtn.style.display = 'flex';
            searchBtn.style.alignItems = 'center';
            searchBtn.style.justifyContent = 'center';
            searchBtn.style.transition = 'box-shadow 0.3s, background 0.3s';
            document.body.appendChild(searchBtn);

            // --- יצירת תיבת חיפוש (מודאל) אם לא קיימת ---
            let searchModal = document.querySelector('.search-modal');
            if (!searchModal) {
                searchModal = document.createElement('div');
                searchModal.className = 'search-modal';
                searchModal.style.position = 'fixed';
                searchModal.style.right = '0';
                searchModal.style.top = '25%';
                searchModal.style.width = '0';
                searchModal.style.maxWidth = '90vw';
                searchModal.style.height = '60vh';
                searchModal.style.background = '#23272f';
                searchModal.style.borderRadius = '16px 0 0 16px';
                searchModal.style.boxShadow = '0 2px 24px #000a';
                searchModal.style.zIndex = '4001';
                searchModal.style.display = 'flex';
                searchModal.style.flexDirection = 'column';
                searchModal.style.justifyContent = 'flex-start';
                searchModal.style.alignItems = 'stretch';
                searchModal.style.transition = 'opacity 0.2s';
                searchModal.style.opacity = '0';
                searchModal.style.pointerEvents = 'none';
                searchModal.innerHTML = `
                  <div class="search-modal-content" style="padding:24px;">      
                    <input type="text" class="search-input" placeholder=" חפש נושא" dir="rtl" autofocus style="width:100%;margin-bottom:16px;" />
                    <div class="search-results"></div>
                  </div>
                `;
                document.body.appendChild(searchModal);
            }

            // --- פונקציות פתיחה/סגירה מסונכרנות ---
            function openSearchModal() {
                // סגור סרגל ניווט אם פתוח
                if (typeof sidebarOpen !== 'undefined' && sidebarOpen && sidebar) {
                    sidebar.style.transform = 'translateX(120%)';
                    sidebarOpen = false;
                }
                searchModal.style.opacity = '1';
                searchModal.style.pointerEvents = 'auto';
                searchModal.classList.add('open');
                const input = searchModal.querySelector('.search-input');
                if (input) input.focus();
            }
            function closeSearchModal() {
                searchModal.style.opacity = '0';
                searchModal.style.pointerEvents = 'none';
                searchModal.classList.remove('open');
            }

            // --- פתיחה/סגירה של החיפוש ---
            searchBtn.onclick = function(e) {
                if (e.detail === 2) return;
                if (searchModal.classList.contains('open')) {
                    closeSearchModal();
                } else {
                    // סגור סרגל ניווט אם פתוח
                    if (sidebar && sidebarOpen) {
                        sidebar.style.transform = 'translateX(120%)';
                        sidebarOpen = false;
                    }
                    openSearchModal();
                }
            };
            searchBtn.ondblclick = function(e) {
                closeSearchModal();
            };
            const closeBtn = searchModal.querySelector('.close-search-modal');
            if (closeBtn) closeBtn.onclick = closeSearchModal;
            searchModal.onclick = e => { if (e.target === searchModal) closeSearchModal(); };

            // --- חיפוש דינמי (להגדיר רק פעם אחת) ---
            if (!searchModal.dataset.searchInit) {
                let searchData = [];
                fetch('search-index.json').then(r => r.json()).then(data => { searchData = data; });
                const input = searchModal.querySelector('.search-input');
                const results = searchModal.querySelector('.search-results');
                input.oninput = function() {
                    const q = this.value.trim();
                    if (!q) { results.innerHTML = ''; return; }
                    const ql = q.toLowerCase();
                    const matches = searchData.filter(item =>
                        (item.title && item.title.toLowerCase().includes(ql)) ||
                        (item.summary && item.summary.toLowerCase().includes(ql))
                    ).slice(0, 20);
                    results.innerHTML = matches.length ? matches.map(item =>
                        `<a href="${item.url}" class="search-result-item" onclick="document.querySelector('.search-modal').classList.remove('open')">
                          <div class="result-title">${item.title}</div>
                          <div class="result-summary">${item.summary}</div>
                        </a>`
                    ).join('') : '<div class="no-results">לא נמצאו תוצאות.</div>';
                };
                // קיצור מקלדת: Ctrl+K לפתיחה
                document.addEventListener('keydown', e => {
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                        e.preventDefault();
                        openSearchModal();
                    }
                });
                searchModal.dataset.searchInit = '1';
            }
        }

        // --- סרגל צד עצמו ---
        const sidebar = document.querySelector('.nav-sidebar');
        if (sidebar) {
            sidebar.style.position = 'fixed';
            sidebar.style.right = '0';
            sidebar.style.left = 'unset';
            sidebar.style.top = '25%';
            sidebar.style.height = '*';
            sidebar.style.width = '*px';
            sidebar.style.maxWidth = '90vw';
            sidebar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
            sidebar.style.transform = 'translateX(110%)'; // מוסתר כברירת מחדל
        }

        // --- פתיחה/סגירה של הסרגל ---
        let sidebarOpen = false;
        sidebarToggleBtn.addEventListener('click', function () {
            // סגור חיפוש אם פתוח
            let searchModal = document.querySelector('.search-modal');
            if (searchModal && searchModal.classList.contains('open')) {
                searchModal.style.opacity = '0';
                searchModal.style.pointerEvents = 'none';
                searchModal.classList.remove('open');
            }
            // אנימציה לכפתור
            sidebarToggleBtn.classList.remove('animate-magnifier');
            void sidebarToggleBtn.offsetWidth;
            sidebarToggleBtn.classList.add('animate-magnifier');
            if (!sidebar) return;
            sidebarOpen = !sidebarOpen;
            if (sidebarOpen) {
                sidebar.style.transform = 'translateX(0)';
            } else {
                sidebar.style.transform = 'translateX(120%)';
            }
        });
    }
});

// --- פונקציה להצגה/הסתרה של תוכן מתרחב ---
function toggleContent(button) {
    const content = button.parentElement.nextElementSibling;
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.textContent = '▲';
    } else {
        content.style.display = 'none';
        button.textContent = '▼';
    }
}

// --- פונקציה להצגת/הסתרת גרף ---
function toggleGraph(id) {
    const graph = document.getElementById(id);
    if (graph.style.display === 'none' || graph.style.display === '') {
        graph.style.display = 'block';
        document.querySelector(`[data-graph="${id}"]`).textContent = 'הסתר גרף ▲';
    } else {
        graph.style.display = 'none';
        document.querySelector(`[data-graph="${id}"]`).textContent = 'הצג גרף ▼';
    }
}

// --- GoatCounter ---
(function loadGoatCounter() {
    if (window.goatcounterLoaded) return;
    window.goatcounterLoaded = true;
    const s = document.createElement('script');
    s.setAttribute('data-goatcounter', 'https://dvird.goatcounter.com/count');
    s.src = 'https://gc.zgo.at/count.js';
    s.async = true;
    (document.head || document.body).appendChild(s);
})();