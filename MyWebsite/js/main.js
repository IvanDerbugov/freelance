document.addEventListener('DOMContentLoaded', () => {

    const clickSound = document.getElementById('click-sound');

    if (clickSound) {
        clickSound.volume = 0.25; 
    }

    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(error => console.log("Audio play failed:", error));
        }
    }

    const burgerMenu = document.getElementById('burger-menu');
    const navigation = document.querySelector('.navigation');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        navigation.classList.toggle('open');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navigation.classList.contains('open') ? 'hidden' : '';
    }

    let isScrolling = false;

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            if (isScrolling) return;
            
            const h1Element = document.querySelector('h1');
            const targetElement = document.querySelector('.about h2 i');
            
            if (h1Element && targetElement) {
                const h1Rect = h1Element.getBoundingClientRect();
                
                if (h1Rect.top < window.innerHeight && h1Rect.bottom > 0) {
                    isScrolling = true;
                    
                    burgerMenu.style.opacity = '0.6';
                    burgerMenu.style.cursor = 'wait';
                    
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    setTimeout(() => {
                        burgerMenu.style.opacity = '1';
                        burgerMenu.style.cursor = 'pointer';
                        isScrolling = false;
                        toggleMenu();
                    }, 500);
                } else {
                    toggleMenu();
                }
            } else {
                toggleMenu();
            }
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }

    const navLinks = document.querySelectorAll('.LinkItem');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navigation.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navigation.classList.contains('open')) {
            burgerMenu.classList.remove('active');
            navigation.classList.remove('open');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    navLinks.forEach(link => {
        if (link.classList.contains('anchor-link')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                playClickSound();
                
                navLinks.forEach(navLink => {
                    navLink.classList.remove('activeLink');
                });
                
                link.classList.add('activeLink');
                
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                
                if (targetId === 'home-page') {
                    const targetElement = document.querySelector('.about h2 i');
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (typeof window.restartCanvasAnimation === 'function') {
                        window.restartCanvasAnimation();
                    }
                } else {
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    });

    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const header = item.querySelector('.skill-header');
        header.addEventListener('click', () => {
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        });
    });

    const hireMeBtn = document.getElementById('hire-me-btn');
    const projectsBtn = document.getElementById('projects-btn');

    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', () => {
            playClickSound();
            const contactSection = document.getElementById('contact-page');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (projectsBtn) {
        projectsBtn.addEventListener('click', () => {
            playClickSound();
            const portfolioSection = document.getElementById('portfolio-page');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    if (themeToggle) {
        themeToggle.checked = !htmlEl.classList.contains('light-theme');

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                htmlEl.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlEl.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const openDiscountModalBtn = document.getElementById('openDiscountModal');
    const discountModal = document.getElementById('discountModal');
    const closeDiscountModalBtn = document.getElementById('closeDiscountModal');

    if (openDiscountModalBtn && discountModal && closeDiscountModalBtn) {
        openDiscountModalBtn.addEventListener('click', () => {
            discountModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeDiscountModalBtn.addEventListener('click', () => {
            discountModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        discountModal.addEventListener('click', (e) => {
            if (e.target === discountModal) {
                discountModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    const mebelmarketBlock = document.getElementById('project-mebelmarket');
    const zoreliBlock = document.getElementById('project-zoreli');
    const starvinBlock = document.getElementById('project-starvin');
    const rekordikaBlock = document.getElementById('project-rekordika');
    const nftBlock = document.getElementById('project-nft');
    const subsBlock = document.getElementById('project-subs');
    const weddingBlock = document.getElementById('project-wedding');
    const handymarkBlock = document.getElementById('project-handymark');
    
    if (mebelmarketBlock) {
        mebelmarketBlock.style.display = '';
    }
    
    if (portfolioBtns.length && mebelmarketBlock && zoreliBlock && starvinBlock && rekordikaBlock && nftBlock && subsBlock && weddingBlock && handymarkBlock) {
        portfolioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                portfolioBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                mebelmarketBlock.style.display = 'none';
                zoreliBlock.style.display = 'none';
                starvinBlock.style.display = 'none';
                rekordikaBlock.style.display = 'none';
                nftBlock.style.display = 'none';
                subsBlock.style.display = 'none';
                weddingBlock.style.display = 'none';
                handymarkBlock.style.display = 'none';
                
                const rekordikaVideo = rekordikaBlock.querySelector('video');
                const subsVideo = subsBlock.querySelector('video');
                const handymarkVideo = handymarkBlock.querySelector('video');
                if (rekordikaVideo) { rekordikaVideo.pause(); rekordikaVideo.currentTime = 0; }
                if (subsVideo) { subsVideo.pause(); subsVideo.currentTime = 0; }
                if (handymarkVideo) { handymarkVideo.pause(); handymarkVideo.currentTime = 0; }
                
                let mediaElement = null;
                
                if (btn.dataset.project === 'mebelmarket') {
                    mebelmarketBlock.style.display = '';
                    mediaElement = document.getElementById('media-mebelmarket');
                } else if (btn.dataset.project === 'zoreli') {
                    zoreliBlock.style.display = '';
                    mediaElement = document.getElementById('media-zoreli');
                } else if (btn.dataset.project === 'starvin') {
                    starvinBlock.style.display = '';
                    mediaElement = document.getElementById('media-starvin');
                } else if (btn.dataset.project === 'rekordika') {
                    rekordikaBlock.style.display = '';
                    mediaElement = document.getElementById('media-rekordika');
                    if (rekordikaVideo) { rekordikaVideo.play(); }
                } else if (btn.dataset.project === 'handymark') {
                    handymarkBlock.style.display = '';
                    mediaElement = document.getElementById('media-handymark');
                    if (handymarkVideo) { handymarkVideo.play(); }
                } else if (btn.dataset.project === 'wedding') {
                    weddingBlock.style.display = '';
                    mediaElement = document.getElementById('media-wedding');
                } else if (btn.dataset.project === 'subs') {
                    subsBlock.style.display = '';
                    mediaElement = document.getElementById('media-subs');
                    if (subsVideo) { subsVideo.play(); }
                } else if (btn.dataset.project === 'nft') {
                    nftBlock.style.display = '';
                    mediaElement = document.getElementById('media-nft');
                }
                
                if (mediaElement && window.innerWidth <= 480) {
                    setTimeout(() => {
                        mediaElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start'
                        });
                    }, 100);
                }
            });
        });
    }

    const discountForm = document.getElementById('discountForm');
    const discountSuccess = document.getElementById('discountSuccess');
    const discountLoading = document.getElementById('discountLoading');
    const discountSubmitBtn = document.getElementById('discountSubmitBtn');

    const contactOptions = document.querySelectorAll('.contact-option');
    const contactInput = document.getElementById('contactInput');
    
    
    contactOptions.forEach(option => {
        option.addEventListener('click', () => {
            contactOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const type = option.dataset.type;
            
            if (type === 'email') {
                contactInput.type = 'email';
                contactInput.name = 'email';
                contactInput.placeholder = 'example@email.com';
                contactInput.required = true;
            } else if (type === 'phone') {
                contactInput.type = 'tel';
                contactInput.name = 'phone';
                contactInput.placeholder = '+7 (999) 123-45-67';
                contactInput.required = true;
            }
        });
    });

    if (discountForm) {
        discountForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            discountSuccess.style.display = 'none';
            discountLoading.style.display = 'block';
            discountSubmitBtn.disabled = true;

            const formData = new FormData(discountForm);
            const project = formData.get('project');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const deadline = formData.get('deadline');
            const name = 'Заявка с портфолио';
            
            const contact = email || phone;
            const contactType = email ? 'email' : 'phone';

            const result = await window.FormHandler.sendToTelegram(name, contact, project, deadline, contactType);

            discountLoading.style.display = 'none';
            discountSubmitBtn.disabled = false;

            if (result.success) {
                discountForm.style.display = 'none';
                discountSuccess.textContent = 'Спасибо! Ваша заявка отправлена. Я свяжусь с вами в течение дня и предложу скидку!';
                discountSuccess.style.display = 'block';
                discountForm.reset();
            } else {
                discountSuccess.textContent = result.message || 'Ошибка отправки!';
                discountSuccess.style.display = 'block';
            }
        });
    }
}); 