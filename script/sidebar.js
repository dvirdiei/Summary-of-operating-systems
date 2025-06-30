document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-sidebar ul li a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const id = href.substring(1); // מוריד את ה־#
            const target = document.getElementById(id);

            // אם אין אלמנט עם id כזה, ננסה לשייך לפי סדר
            if (!target && sections[index]) {
                sections[index].id = id;
            }
        }
    });

    // פתיחה/סגירה של הסייד בר הראשי
    const navTitle = document.querySelector('.nav-sidebar-title');
    if (navTitle) {
        navTitle.style.cursor = 'pointer';
        navTitle.addEventListener('click', () => {
            document.querySelector('.nav-sidebar ul').classList.toggle('collapsed');
        });
    }
    
    // טיפול בקטגוריות בתוך סרגל הניווט
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            
            // סגור את כל הקטגוריות
            document.querySelectorAll('.nav-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            // פתח את הקטגוריה הנוכחית אם היא לא הייתה פתוחה
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
    
    // פתיחת הקטגוריה הראשונה באופן אוטומטי בטעינה
    if(document.querySelector('.nav-category')) {
        document.querySelector('.nav-category').classList.add('active');
    }
    
    // הוספת זיהוי לשינוי גודל (zoom)
    let currentZoom = 100;
    
    // פונקציה לבדיקת שינוי ב-zoom והוספת סימון
    // פונקציה לבדיקת שינוי ב-zoom והוספת סימון
function checkZoomChange() {
    // בדיקת הזום הנוכחי
    const newZoom = Math.round(window.devicePixelRatio * 100);
    if (newZoom !== currentZoom) {
        // הוסף סימון ויזואלי לכל הקטגוריות
        document.querySelectorAll('.category-title').forEach(title => {
            // הסר מחלקת זום קודמת אם קיימת
            title.classList.remove('zoomed-indicator');
            
            // הוסף מחלקת זום חדשה
            title.classList.add('zoomed-indicator');
            
            // הוסף אלמנט קו תחתון אם לא קיים
            if (!title.querySelector('.zoom-underline')) {
                const underline = document.createElement('div');
                underline.className = 'zoom-underline';
                title.appendChild(underline);
            }
        });
        currentZoom = newZoom;
    }
}
    
    
    // בדיקת שינוי זום בעת גלילה (עם Ctrl +/-)
    window.addEventListener('resize', checkZoomChange);
    window.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            setTimeout(checkZoomChange, 100);
        }
    });
    
    // בדיקה ראשונית
    checkZoomChange();

    // === כפתור אימוג'י (🔍) לפתיחה/סגירה של סרגל צד ===
    if (!document.getElementById('sidebar-toggle-btn')) {
        // הוספת סגנון לאנימציה של הכפתור (אם לא קיים)
        if (!document.getElementById('sidebar-toggle-anim-style')) {
            const style = document.createElement('style');
            style.id = 'sidebar-toggle-anim-style';
            style.innerHTML = `
            @keyframes magnifier-glow {
                 0% { box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 0px 0px #FFD700; }
                30% { box-s hadow: 0 2px 12px rgba(0,0,0,0.10), 0 0 24px 12px #FFD700; }
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
        const sidebarToggleBtn = document.createElement('button');
        sidebarToggleBtn.innerHTML = '🔍';
        sidebarToggleBtn.setAttribute('aria-label', 'הצג/הסתר תוכן עניינים');
        sidebarToggleBtn.id = 'sidebar-toggle-btn';
        // מיקום שמאל-מרכז, עיצוב בסיסי בלבד
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

        const sidebar = document.querySelector('.nav-sidebar');
        if (sidebar) {
            // ודא שהסרגל ממוקם בצד ימין ותופס רק חלק מהמסך
            sidebar.style.position = 'fixed';
            sidebar.style.right = '0';
            sidebar.style.left = 'unset';
            sidebar.style.top = '25%';
            sidebar.style.height = '*';
            sidebar.style.width = '20'; // לדוג' 320px, אפשר לשנות לפי הצורך
            sidebar.style.maxWidth = '90vw';
            sidebar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
            sidebar.style.transform = 'translateX(110%)'; // מוסתר כברירת מחדל (ימינה)
        }

        let sidebarOpen = false;
        sidebarToggleBtn.addEventListener('click', function () {
            // אנימציה לכפתור
            sidebarToggleBtn.classList.remove('animate-magnifier');
            // טריגר רה-פלואו כדי לאפשר הפעלה מחדש של האנימציה
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

// פונקציה להצגה/הסתרה של תוכן מתרחב
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

        // פונקציה להצגת/הסתרת גרף
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
(function loadGoatCounter() {
  if (window.goatcounterLoaded) return;          // הגנה מכפל טעינה
  window.goatcounterLoaded = true;

  const s = document.createElement('script');
  s.setAttribute('data-goatcounter', 'https://dvird.goatcounter.com/count');
  s.src = 'https://gc.zgo.at/count.js';          // פרוטוקול מפורש
  s.async = true;

  (document.head || document.body).appendChild(s);
})();
