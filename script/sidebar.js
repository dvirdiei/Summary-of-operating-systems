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
