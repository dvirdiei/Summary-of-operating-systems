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
                    <h2>דבר העורך</h2>
                    <p>האתר נבנה במטרה לספק סיכום מהיר ופשוט, המיועד בעיקר לרענון ידע בנושאים מוכרים ופחות ללימוד מאפס.</p>
                    <p>במידה ונתקלתם בטעות, עיצוב לא נכון, או פשוט רוצים להגיד וואי איזה מלך שאתה יושב לילות יקרים מפז על זה אוהבים אותך יגבר - אשמח לשמוע מכם אם יש לכם הסבר טוב יותר מהרשום, אשמח גם לקבל אותו.</p>
                    <p>חלק מהתכנים באתר כוללים שימוש בסרטונים של יוצרים אחרים, ולכן מגיע להם קרדיט על עבודתם המצוינת.</p>
                    <p><strong>📝 כרגע הסיכום הוא ממבוא למערכות הפעלה עד מעבר בין משאבים (9 קוביות)</strong></p>
                    <div class="contact-info" style="margin-top: 25px; background: rgba(59, 130, 246, 0.1); border-radius: 10px; padding: 15px; border-left: 3px solid #3b82f6;">
                        <p style="margin-bottom: 8px; font-weight: 600;">📝 יצירת קשר:</p>
                        <p style="margin-bottom: 5px;"><strong>דביר דיעי</strong></p>
                        <p style="margin-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                            <span style="color: #3b82f6;">📞</span> 052-777-2513
                        </p>
                        <p style="margin-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                            <span style="color: #3b82f6;">✉️</span> <a href="mailto:dvirdiei@gmail.com" style="color: #94a3b8; text-decoration: none; transition: color 0.2s;">dvirdiei@gmail.com</a>
                        </p>
                    </div>
                `;
                editorNote.classList.remove('fade-out');
                editorNote.classList.add('fade-in');
            }, 400); // זמן תואם ל-transition ב-CSS
        });
    });
});