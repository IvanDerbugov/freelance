const calculatorTypes = document.querySelector('.calculator__types');

calculatorTypes.addEventListener('click', (e) => {
    const item = e.target.closest('.calculator__types-item');
    if (!item) return;

    calculatorTypes.querySelectorAll('.calculator__types-item').forEach(el => {
        el.classList.remove('active');
    });
    item.classList.add('active');
});

const calculatorBntMinus = document.querySelector('.calculator__bnt-minus');
const calculatorBntPlus = document.querySelector('.calculator__bnt-plus');

