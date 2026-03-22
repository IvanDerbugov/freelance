const calculatorTypes = document.querySelector('.calculator__types');



if (calculatorTypes) {

    calculatorTypes.addEventListener('click', (e) => {

        const item = e.target.closest('.calculator__types-item');

        if (!item || !item.dataset.calculatorTab) return;



        const tabId = item.dataset.calculatorTab;



        calculatorTypes.querySelectorAll('.calculator__types-item').forEach((el) => {

            const isActive = el === item;

            el.classList.toggle('active', isActive);

            el.setAttribute('aria-selected', isActive ? 'true' : 'false');

        });



        document.querySelectorAll('[data-calculator-panel]').forEach((panel) => {

            const isActive = panel.dataset.calculatorPanel === tabId;

            panel.classList.toggle('calculator__panel--active', isActive);

            panel.hidden = !isActive;

        });

    });

}



const TRANSPORT_OPTIONS = {

    'furniture-gazelle': { label: 'Газель с грузчиками', priceRub: 2000 },

    'debris-container': { label: 'Контейнер', priceRub: 8000 },

    'debris-porter': { label: 'Hyundai Porter', priceRub: 6000 },

    'debris-gazelle-10': { label: 'Газель (10 м³)', priceRub: 6000 },

    'debris-gazelle-flatbed': { label: 'Бортовая газель для паркинга', priceRub: 6000 },

    'debris-largus': { label: 'Лада Ларгус', priceRub: 6000 },

};



const CALCULATOR_ITEM_SELECTOR = [

    '.calculator__wardrobes-item',

    '.calculator__soft-furniture-item',

    '.calculator__frame-furniture-item',

    '.calculator__windows-doors-item',

    '.calculator__building-debris-item',

    '.calculator__appliances-item',

].join(',');



function formatRub(amount) {

    return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;

}



function escapeBillHtml(text) {

    return String(text)

        .replace(/&/g, '&amp;')

        .replace(/</g, '&lt;')

        .replace(/>/g, '&gt;')

        .replace(/"/g, '&quot;');

}



function getSelectedTransportBill() {

    const calculator = document.getElementById('calculator-quiz');

    const key = calculator?.dataset.transportOption;

    if (key && TRANSPORT_OPTIONS[key]) return TRANSPORT_OPTIONS[key];

    return { label: 'Транспорт', priceRub: 0 };

}



function updateBill() {

    const bill = document.getElementById('calculator-bill');

    if (!bill) return;



    const transport = getSelectedTransportBill();

    const rows = document.querySelectorAll(CALCULATOR_ITEM_SELECTOR);

    const lines = [];

    let goodsTotal = 0;



    rows.forEach((row) => {

        const input = row.querySelector('.calculator__input-number');

        const qty = Math.max(0, Math.floor(Number(input?.value) || 0));

        if (qty <= 0) return;



        const raw = row.getAttribute('data-unit-price');

        const parsed = raw != null && raw !== '' ? parseInt(raw, 10) : NaN;

        const unitPrice = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_UNIT_PRICE_RUB;



        const info = row.querySelector('[class$="-item-left-info"]');

        const h5 = info?.querySelector('h5');

        const name = h5 ? h5.textContent.replace(/\s+/g, ' ').trim() : 'Позиция';

        const lineTotal = unitPrice * qty;

        goodsTotal += lineTotal;

        lines.push({ name, qty, lineTotal });

    });



    const transportFee = lines.length > 0 ? transport.priceRub : 0;

    const total = transportFee + goodsTotal;



    let html = '';



    html += `<div class="calculator__bill-row calculator__bill-row--service">

            <span class="calculator__bill-name">${escapeBillHtml(transport.label)}</span>

            <span class="calculator__bill-price">${formatRub(transportFee)}</span>

        </div>`;



    if (lines.length === 0) {

        html += `<div class="calculator__bill-empty">Выберите позиции во вкладках и укажите количество</div>`;

    } else {

        lines.forEach((line) => {

            html += `<div class="calculator__bill-row calculator__bill-row--item">

                <span class="calculator__bill-name">${escapeBillHtml(line.name)}</span>

                <div class="calculator__bill-meta">

                    <span class="calculator__bill-qty">${line.qty} шт</span>

                    <span class="calculator__bill-price">${formatRub(line.lineTotal)}</span>

                </div>

            </div>`;

        });

    }



    html += `<div class="calculator__bill-row calculator__bill-row--total">

            <span class="calculator__bill-name">Итого</span>

            <span class="calculator__bill-price">${formatRub(total)}</span>

        </div>`;



    bill.innerHTML = html;

}



const calculatorRoot = document.querySelector('.calculator');



function handleQtyInputClick(event) {

    const target = event.target;

    const wrapper = target.closest('.calculator__wardrobes-item-right-input, .calculator__soft-furniture-item-right-input, .calculator__frame-furniture-item-right-input, .calculator__windows-doors-item-right-input, .calculator__building-debris-item-right-input, .calculator__appliances-item-right-input');

    if (!wrapper) return;

    const input = wrapper.querySelector('.calculator__input-number');

    if (!input) return;

    let valueInput = Number(input.value) || 0;



    if (target.classList.contains('calculator__bnt-plus')) {

        input.value = ++valueInput;

    }



    if (target.classList.contains('calculator__bnt-minus')) {

        if (input.value <= 0) return;

        input.value = --valueInput;

    }



    updateBill();

}



if (calculatorRoot) {

    calculatorRoot.addEventListener('click', handleQtyInputClick);

    calculatorRoot.addEventListener('input', (e) => {

        if (e.target.classList?.contains('calculator__input-number')) {

            updateBill();

        }

    });

    calculatorRoot.addEventListener('change', (e) => {

        if (e.target.classList?.contains('calculator__input-number')) {

            updateBill();

        }

    });

}



function initTransportQuizStep() {

    const stepRoot = document.getElementById('what-take-out-step');

    const grid = document.getElementById('what-take-out-grid');

    const continueBtn = document.getElementById('what-take-out-continue');

    const calculator = document.getElementById('calculator-quiz');

    const stepEl = document.getElementById('number-step');

    const stepLines = document.querySelectorAll('.what-take-out__header-steps-line');

    if (!stepRoot || !grid || !calculator) return;



    function setQuizStep(step) {

        if (stepEl) stepEl.textContent = String(step);

        stepLines.forEach((line, i) => {

            line.classList.toggle('active', i === step - 1);

        });

    }



    function getTransportCards() {

        return grid.querySelectorAll('.what-take-out__grid-item');

    }



    function chooseTransport(card) {

        const key = card.dataset.transportOption;

        if (!key) return;

        calculator.dataset.transportOption = key;

        getTransportCards().forEach((el) => {

            const selected = el === card;

            el.classList.toggle('what-take-out__grid-item--selected', selected);

            el.setAttribute('aria-checked', selected ? 'true' : 'false');

            el.tabIndex = selected ? 0 : -1;

        });

        if (continueBtn) continueBtn.disabled = false;

    }



    function confirmTransport() {

        const selected = grid.querySelector('.what-take-out__grid-item--selected');

        const key = selected?.dataset.transportOption || calculator.dataset.transportOption;

        if (!key) return;

        calculator.dataset.transportOption = key;

        stepRoot.hidden = true;

        stepRoot.setAttribute('aria-hidden', 'true');

        calculator.hidden = false;

        setQuizStep(2);

        updateBill();

    }



    grid.addEventListener('click', (e) => {

        const card = e.target.closest('.what-take-out__grid-item');

        if (card) chooseTransport(card);

    });



    grid.addEventListener('keydown', (e) => {

        if (e.key !== 'Enter' && e.key !== ' ') return;

        const card = e.target.closest('.what-take-out__grid-item');

        if (!card) return;

        e.preventDefault();

        chooseTransport(card);

    });



    if (continueBtn) {

        continueBtn.addEventListener('click', () => {

            confirmTransport();

        });

    }

}



initTransportQuizStep();



updateBill();


