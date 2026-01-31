const translations = {

    fr: {
        'nav.projects':            'Projets',

        'hero.intro':              'Agence de design web — Québec',
        'hero.title':              'Des sites web qui <em>marquent les esprits</em>',
        'hero.experience.label':   'Expérience',
        'hero.experience.value':   '4 ans',
        'hero.specialty.label':    'Spécialité',
        'hero.specialty.value':    'Design & Développement',
        'hero.availability.label': 'Disponibilité',
        'hero.availability.value': 'Ouvert aux projets',

        'about.label':  'À propos',
        'about.p1':     'Fondé par <strong>Mathieu Lapalme</strong>, Matlap Design crée des expériences web sur mesure depuis <strong>4 ans</strong> pour des entreprises qui veulent se démarquer. Chaque projet est une occasion de transformer une vision en un site qui performe — visuellement et stratégiquement.',
        'about.p2':     'L\'approche est simple : <strong>comprendre votre marque</strong>, concevoir un design qui lui ressemble, et livrer un site rapide, responsive et pensé pour convertir.',

        'services.design.title':    'Design web',
        'services.design.desc':     'Des interfaces visuellement distinctives, pensées pour votre marque et votre audience.',
        'services.dev.title':       'Développement',
        'services.dev.desc':        'Des sites rapides, responsive et optimisés. Du code propre, des performances réelles.',
        'services.strategy.title':  'Stratégie',
        'services.strategy.desc':   'Structure, contenu et parcours utilisateur pensés pour convertir vos visiteurs.',

        'projects.label': 'Projets',
        'projects.title': 'Travaux sélectionnés',

        'projects.1.type': 'Entretien',
        'projects.2.type': 'Aide à domicile',
        'projects.3.type': 'Bijouterie',
        'projects.4.type': 'Levée de fonds',

        'contact.label': 'Prochain projet?',
        'contact.title': 'Discutons de<br><em>votre vision</em>',
        'contact.btn':   'Écrire à Matlap',

        '_meta.title':       'Matlap Design — Design Web sur mesure',
        '_meta.description': 'Matlap Design crée des sites web sur mesure, performants et visuellement distinctifs. Basé au Québec, fondé par Mathieu Lapalme.',

        '404.nav.home': 'Accueil',
        '404.label':    'Erreur 404',
        '404.title':    'Cette page <em>n\'existe pas</em>',
        '404.desc':     'La page que vous cherchez a peut-être été déplacée, supprimée, ou n\'a jamais existé.',
        '404.btn':      'Retour à l\'accueil',
    },

    en: {
        'nav.projects':            'Projects',

        'hero.intro':              'Web design agency — Quebec',
        'hero.title':              'Websites that <em>leave a mark</em>',
        'hero.experience.label':   'Experience',
        'hero.experience.value':   '4 years',
        'hero.specialty.label':    'Specialty',
        'hero.specialty.value':    'Design & Development',
        'hero.availability.label': 'Availability',
        'hero.availability.value': 'Open to projects',

        'about.label':  'About',
        'about.p1':     'Founded by <strong>Mathieu Lapalme</strong>, Matlap Design has been crafting bespoke web experiences for <strong>4 years</strong> for businesses that want to stand out. Every project is an opportunity to turn a vision into a website that performs — visually and strategically.',
        'about.p2':     'The approach is straightforward: <strong>understand your brand</strong>, design something that truly represents it, and deliver a fast, responsive site built to convert.',

        'services.design.title':    'Web design',
        'services.design.desc':     'Visually distinctive interfaces, crafted for your brand and your audience.',
        'services.dev.title':       'Development',
        'services.dev.desc':        'Fast, responsive, optimized websites. Clean code, real performance.',
        'services.strategy.title':  'Strategy',
        'services.strategy.desc':   'Structure, content and user journeys designed to convert your visitors.',

        'projects.label': 'Projects',
        'projects.title': 'Selected work',

        'projects.1.type': 'Maintenance',
        'projects.2.type': 'Home care',
        'projects.3.type': 'Jewelry',
        'projects.4.type': 'Fundraising',

        'contact.label': 'Next project?',
        'contact.title': 'Let\'s discuss<br><em>your vision</em>',
        'contact.btn':   'Write to Matlap',
        '_meta.title':       'Matlap Design — Custom Web Design',
        '_meta.description': 'Matlap Design creates bespoke, high-performance, visually distinctive websites. Based in Quebec, founded by Mathieu Lapalme.',

        '404.nav.home': 'Home',
        '404.label':    'Error 404',
        '404.title':    'This page <em>doesn\'t exist</em>',
        '404.desc':     'The page you\'re looking for may have been moved, deleted, or never existed.',
        '404.btn':      'Back to home',
    }
};

const i18n = {

    currentLang: 'fr',

    init() {
        const urlParam = new URLSearchParams(window.location.search).get('lang');
        const stored   = localStorage.getItem('matlap-lang');

        if (urlParam && translations[urlParam]) {
            this.currentLang = urlParam;
        } else if (stored && translations[stored]) {
            this.currentLang = stored;
        } else {
            this.currentLang = 'fr';
        }

        this.apply();
        this.updateSwitch();
    },

    apply() {
        const lang = this.currentLang;
        const dict = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!dict[key]) return;

            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        });

        document.documentElement.lang = lang;

        if (dict['_meta.title']) {
            document.title = dict['_meta.title'];
        }
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict['_meta.description']) {
            metaDesc.setAttribute('content', dict['_meta.description']);
        }
    },

    toggle() {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('matlap-lang', this.currentLang);
        const url = new URL(window.location);
        url.searchParams.set('lang', this.currentLang);
        window.history.replaceState({}, '', url);
        this.apply();
        this.updateSwitch();
    },
   
    updateSwitch() {
        const btn = document.getElementById('langSwitch');
        if (btn) {
            btn.textContent = this.currentLang === 'fr' ? 'EN' : 'FR';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    i18n.init();

    document.getElementById('langSwitch').addEventListener('click', () => {
        i18n.toggle();
    });

    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));

    const projectItems = document.querySelectorAll('.project-item');

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const i = Array.from(projectItems).indexOf(item);
                item.style.transitionDelay = `${i * 0.1}s`;
                item.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(item);
    });

    const style = document.createElement('style');
    style.textContent = `.project-item.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
