document.addEventListener('DOMContentLoaded', function() {
    // Обновляем год в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = `© ${currentYear} Zoreli`;
    }
    
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
});
