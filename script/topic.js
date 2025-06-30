document.addEventListener('DOMContentLoaded', function () {
    const editorNote = document.querySelector('.sidebar');
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        card.addEventListener('mouseover', function () {
            const subtopics = JSON.parse(this.getAttribute('data-subtopics'));
            let subtopicsHTML = '<h2>תת-נושאים:</h2><ul style="list-style: none; padding: 0;">';
            subtopics.forEach(subtopic => {
                subtopicsHTML += `
                    <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <span style="font-size: 1.5em;">${subtopic.emoji}</span>
                        <span>${subtopic.title}</span>
                    </li>
                `;
            });
            subtopicsHTML += '</ul>';

            // הפעלת אנימציה
            editorNote.classList.remove('fade-in');
            editorNote.classList.add('fade-out');

            setTimeout(() => {
                editorNote.innerHTML = subtopicsHTML;
                editorNote.classList.remove('fade-out');
                editorNote.classList.add('fade-in');
            }, 400); // זמן תואם ל-transition ב-CSS
        });

        card.addEventListener('mouseout', function () {
            // הפעלת אנימציה
            editorNote.classList.remove('fade-in');
            editorNote.classList.add('fade-out');

            setTimeout(() => {
                editorNote.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
                        <span style="font-size: 2em; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></span>
                        <h2 style="margin: 0; font-size: 1.4em; font-weight: 700; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">דבר העורך</h2>
                    </div>
                    <div style="margin-bottom: 18px;">
                        <p style="margin-bottom: 10px;">
                            האתר נבנה במטרה לספק <span style="color: #60a5fa; font-weight: 600;">סיכום מהיר ופשוט</span>, המיועד בעיקר לרענון ידע בנושאים מוכרים ופחות ללימוד מאפס.
                        </p>
                        <p style="margin-bottom: 10px;">
                            <span style="color: #f59e0b;">💡</span>
                            אם נתקלתם בטעות, עיצוב לא נכון, או שיש לכם הסבר טוב יותר מהרשום – <span style="color: #8b5cf6; font-weight: 600;">אשמח לשמוע מכם!</span>
                        </p>
                        <p style="margin-bottom: 10px;">
                            <span style="color: #38bdf8;">🎥</span>
                            חלק מהתכנים באתר כוללים שימוש בסרטונים של יוצרים אחרים, ולכן מגיע להם קרדיט על עבודתם המצוינת.
                        </p>
                        <div class="important-note" style="margin: 18px 0 0 0; font-size: 1em; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08)); border: 1px solid rgba(59,130,246,0.18); color: #60a5fa;">
                            <span style="font-size: 1.1em;">🗂️</span>
                            הסיכום מסודר על פי המצגות – שם המצגת נמצא בשם הדף.
                        </div>
                    </div>
                    <div class="contact-info" style="margin-top: 25px; background: linear-gradient(90deg, rgba(59,130,246,0.10), rgba(236,72,153,0.08)); border-radius: 12px; padding: 16px 14px; border-left: 3px solid #3b82f6; color: #e0e7ef;">
                        <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 8px;">
                            <span style="font-size: 1.2em;">📬</span>
                            <span style="font-weight: 600; color: #60a5fa;">יצירת קשר:</span>
                        </div>
                        <div style="margin-bottom: 5px; font-weight: 600;">דביר דיעי</div>
                        <div style="margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #3b82f6;">📞</span>
                            <span dir="ltr" style="font-family: 'Fira Code', monospace; color: #e0e7ef;">052-777-2513</span>
                        </div>
                        <div style="margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #3b82f6;">✉️</span>
                            <a href="mailto:dvirdiei@gmail.com" style="color: #94a3b8; text-decoration: none; transition: color 0.2s;">dvirdiei@gmail.com</a>
                        </div>
                    </div>
                `;
                editorNote.classList.remove('fade-out');
                editorNote.classList.add('fade-in');
            }, 400); // זמן תואם ל-transition ב-CSS
        });
    });
});