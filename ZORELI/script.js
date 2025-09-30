document.addEventListener('DOMContentLoaded', function() {
    // Обновляем год в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} Zoreli`;
    }
    
    // FAQ functionality for main page
    const dropdownBlocks = document.querySelectorAll('.drop-down-blocks > div');
    
    // Функция для закрытия всех блоков
    function closeAllBlocks() {
        dropdownBlocks.forEach(block => {
            const content = block.querySelector('p');
            const arrow = block.querySelector('svg');
            
            content.style.display = 'none';
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            arrow.style.transform = 'rotate(0deg)';
        });
    }
    
    dropdownBlocks.forEach(block => {
        const content = block.querySelector('p');
        const arrow = block.querySelector('svg');
        
        block.addEventListener('click', function() {
            const isOpen = content.style.display === 'block';
            
            if (isOpen) {
                // Закрываем текущий блок
                content.style.display = 'none';
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                // Сначала закрываем все блоки, потом открываем текущий
                closeAllBlocks();
                
                // Открываем текущий блок
                content.style.display = 'block';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    // FAQ functionality for FAQ page
    const faqItems = document.querySelectorAll('.faq-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // FAQ Toggle functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.arrow-icon');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherArrow = otherItem.querySelector('.arrow-icon');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                    if (otherAnswer) otherAnswer.style.opacity = '0';
                    if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                if (answer) answer.style.maxHeight = '0';
                if (answer) answer.style.opacity = '0';
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                if (answer) answer.style.opacity = '1';
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterFAQItems(category);
        });
    });
    
    
    function filterFAQItems(category) {
        faqItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            const matchesCategory = category === 'all' || itemCategory === category;
            
            if (matchesCategory) {
                item.style.display = 'block';
                item.classList.add('fade-in');
                setTimeout(() => {
                    item.classList.remove('fade-in');
                }, 500);
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        showNoResultsIfNeeded();
    }
    
    function showNoResultsIfNeeded() {
        const visibleItems = Array.from(faqItems).filter(item => 
            item.style.display !== 'none'
        );
        
        let noResultsDiv = document.querySelector('.no-results');
        
        if (visibleItems.length === 0) {
            if (!noResultsDiv) {
                noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results';
                noResultsDiv.innerHTML = `
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="2"/>
                        <path d="M25 40L35 50L55 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3>No questions found</h3>
                    <p>Try adjusting your search terms or browse different categories</p>
                `;
                document.querySelector('.faq-grid').appendChild(noResultsDiv);
            }
        } else if (noResultsDiv) {
            noResultsDiv.remove();
        }
    }
    
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe FAQ items for scroll animations
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
