/* ============================================================
   EDUCULTE FEMMES — Données et rendu des formations
   ============================================================ */

const coursesData = [
    {
        id: 'confiance',
        title: "Retrouver sa Confiance en Soi",
        category: "developpement",
        categoryLabel: "Développement Personnel",
        image: "assets/images/course-confidence.png",
        description: "Un programme complet pour vaincre le syndrome de l'imposteur, s'affirmer et reprendre le contrôle de sa vie personnelle et professionnelle.",
        price: "25 000 FCFA",
        duration: "4 semaines",
        lessons: 12,
        popular: true
    },
    {
        id: 'entreprendre',
        title: "Entreprendre avec Succès",
        category: "business",
        categoryLabel: "Business & Carrière",
        image: "assets/images/course-entrepreneur.png",
        description: "De l'idée à la création : apprenez à structurer votre projet, définir votre stratégie et lancer votre entreprise avec des bases solides.",
        price: "45 000 FCFA",
        duration: "8 semaines",
        lessons: 24,
        popular: false
    },
    {
        id: 'identite',
        title: "Quête d'Identité & Alignement",
        category: "developpement",
        categoryLabel: "Développement Personnel",
        image: "assets/images/course-identity.png",
        description: "Un voyage intérieur pour découvrir qui vous êtes vraiment, au-delà des attentes sociales, et construire une vie alignée avec vos valeurs profondes.",
        price: "20 000 FCFA",
        duration: "3 semaines",
        lessons: 10,
        popular: false
    },
    {
        id: 'communaute',
        title: "Bâtir sa Communauté Bienveillante",
        category: "leadership",
        categoryLabel: "Leadership",
        image: "assets/images/course-community.png",
        description: "Sortir de l'isolement : stratégies pour s'entourer des bonnes personnes, créer des connexions authentiques et développer son réseau.",
        price: "15 000 FCFA",
        duration: "2 semaines",
        lessons: 8,
        popular: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Render featured courses on homepage
    const featuredContainer = document.getElementById('featured-courses-grid');
    if (featuredContainer) {
        renderCourses(coursesData.slice(0, 3), featuredContainer);
    }

    // Render all courses on catalog page
    const catalogContainer = document.getElementById('catalog-courses-grid');
    if (catalogContainer) {
        renderCourses(coursesData, catalogContainer);
        setupFilters();
    }
});

function renderCourses(courses, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    courses.forEach((course, index) => {
        const delay = index * 0.1 + 0.1; // delay from 0.1s to 0.4s
        
        const badgeHTML = course.popular ? 
            `<div class="course-badge badge badge-gold">Plus Populaire</div>` : '';

        const card = document.createElement('article');
        card.className = `course-card card reveal reveal-delay-${Math.ceil(index+1)}`;
        card.setAttribute('data-category', course.category);
        
        const defaultMsg = encodeURIComponent(`Bonjour, je souhaite m'inscrire à la formation : ${course.title}.`);
        const waLink = `https://wa.me/22892434443?text=${defaultMsg}`;

        card.innerHTML = `
            <div class="course-image-wrap">
                <img src="${course.image}" alt="${course.title}" class="course-image" loading="lazy">
                ${badgeHTML}
                <div class="course-category">${course.categoryLabel}</div>
            </div>
            <div class="course-content">
                <div class="course-meta">
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${course.duration}</span>
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> ${course.lessons} leçons</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-footer">
                    <span class="course-price">${course.price}</span>
                    <a href="${waLink}" class="btn btn-primary btn-sm">Acheter</a>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catalogContainer = document.getElementById('catalog-courses-grid');
    
    if (!filterBtns.length || !catalogContainer) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            const cards = catalogContainer.querySelectorAll('.course-card');
            
            // Filter logic
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
