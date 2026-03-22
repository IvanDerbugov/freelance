const DESCRIPTION = 'Описание типа мусора для вывоза';
const DEFAULT_UNIT_PRICE_RUB = 1000;

function formatRubDisplay(amount) {
    return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;
}

const CALCULATOR_WARDROBE_ITEMS = [
    { img: 'closet/closet1.jpg', title: 'Сервант' },
    { img: 'closet/closet2.jpg', title: 'Хельга' },
    { img: 'closet/closet3.jpg', title: 'Угловой шкаф' },
    { img: 'closet/closet4.jpg', title: 'Шкаф', size: '(0.5 х 2)' },
    { img: 'closet/closet5.jpg', title: 'Шкаф', size: '(1 х 2)' },
    { img: 'closet/closet6.jpg', title: 'Шкаф', size: '(1 х 2.5)' },
    { img: 'closet/closet7.jpg', title: 'Шкаф', size: '(1,5 х 2)' },
    { img: 'closet/closet8.jpg', title: 'Шкаф', size: '(1.5 х 2.5)' },
    { img: 'closet/closet9.jpg', title: 'Шкаф', size: '(2х створчатый с антресолями)' },
    { img: 'closet/closet10.jpg', title: 'Шкаф', size: '(2х створчатый без антресолей)' },
    { img: 'closet/closet11.jpg', title: 'Шкаф', size: '(3х створчатый с антресолей)' },
    { img: 'closet/closet12.jpg', title: 'Шкаф', size: '(3х створчатый без антресолей)' },
    { img: 'closet/closet13.jpg', title: 'Шкаф купе', size: '(2 двери)' },
    { img: 'closet/closet14.jpg', title: 'Шкаф купе', size: '(3 двери)' },
    { img: 'closet/closet15.jpg', title: 'Шкаф купе', size: '(4 двери)' },
    { img: 'closet/closet16.jpg', title: 'Шкаф купе', size: '(5 двери)' },
];

const CALCULATOR_SOFT_ITEMS = [
    { img: 'soft/soft1.jpg', title: 'Диван', size: '(2х местный)' },
    { img: 'soft/soft2.jpg', title: 'Диван', size: '(3х местный)' },
    { img: 'soft/soft3.jpg', title: 'Кресла' },
    { img: 'soft/soft4.jpg', title: 'Диван угловой' },
    { img: 'soft/soft5.jpg', title: 'Диван угловой', size: 'из 2х частей' },
    { img: 'soft/soft6.jpg', title: 'Диван угловой', size: 'из 3х частей' },
    { img: 'soft/soft7.jpg', title: 'Кровать' },
    { img: 'soft/soft8.jpg', title: 'Матрас' },
    { img: 'soft/soft9.jpg', title: 'Кухонный уголок' },
];

const CALCULATOR_FRAME_ITEMS = [
    { img: 'karkasnaya/karkasnaya1.jpg', title: 'Пианино' },
    { img: 'karkasnaya/karkasnaya2.jpg', title: 'Стол обеденный' },
    { img: 'karkasnaya/karkasnaya3.jpg', title: 'Кухня', size: '(Низ)' },
    { img: 'karkasnaya/karkasnaya4.jpg', title: 'Кухня', size: '(верх)' },
    { img: 'karkasnaya/karkasnaya5.jpg', title: 'Комод' },
    { img: 'karkasnaya/karkasnaya6.jpg', title: 'Тумба' },
    { img: 'karkasnaya/karkasnaya7.jpg', title: 'Книжная полка' },
    { img: 'karkasnaya/karkasnaya8.jpg', title: 'Книжная полка', size: '(маленькая)' },
    { img: 'karkasnaya/karkasnaya9.jpg', title: 'Письменный стол' },
    { img: 'karkasnaya/karkasnaya10.jpg', title: 'Столик журнальный' },
    { img: 'karkasnaya/karkasnaya11.jpg', title: 'Комод' },
    { img: 'karkasnaya/karkasnaya12.jpg', title: 'Стул' },
];

const CALCULATOR_WINDOWS_DOORS_ITEMS = [
    { img: 'window-door/window-door1.jpg', title: 'Балконное окно' },
    { img: 'window-door/window-door2-3.jpg', title: 'Окно', size: '(до 1.5 метра)' },
    { img: 'window-door/window-door2-3.jpg', title: 'Окно', size: '(до 1 метра)' },
    { img: 'window-door/window-door4.jpg', title: 'Двери' },
    { img: 'window-door/window-door5.jpg', title: 'Двери входные' },
    { img: 'window-door/window-door6.jpg', title: 'Окно', size: '(до 2 метров)' },
    { img: 'window-door/window-door7.jpg', title: 'Откосы' },
];

const CALCULATOR_BUILDING_DEBRIS_ITEMS = [
    { img: 'building-debris/building-debris1.jpg', title: 'Мешок мусора', size: '(до 25 кг)' },
    { img: 'building-debris/building-debris2.jpg', title: 'Мешок мусора', size: '(до 15 кг)' },
    { img: 'building-debris/building-debris3.jpg', title: 'Душевая кабина' },
    { img: 'building-debris/building-debris4.jpg', title: 'Раковина' },
    { img: 'building-debris/building-debris5.jpg', title: 'Унитаз' },
    { img: 'building-debris/building-debris6.jpg', title: 'Ванна' },
    { img: 'building-debris/building-debris7.jpg', title: 'Доски' },
];

const CALCULATOR_APPLIANCES_ITEMS = [
    { img: 'appliances/appliances1.jpg', title: 'Холодильник' },
    { img: 'appliances/appliances2.jpg', title: 'Газовая плита' },
    { img: 'appliances/appliances3.jpg', title: 'Стиральная машина' },
    { img: 'appliances/appliances4.jpg', title: 'Велосипед' },
    { img: 'appliances/appliances5.jpg', title: 'Телевизор' },
    { img: 'appliances/appliances6.jpg', title: 'Колонки' },
    { img: 'appliances/appliances7.jpg', title: 'Принтер' },
    { img: 'appliances/appliances8.jpg', title: 'Кулер' },
    { img: 'appliances/appliances9.jpg', title: 'Швейная машина' },
    { img: 'appliances/appliances10.jpg', title: 'Тренажер' },
];

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderCalculatorItemRow(blockClass, item) {
    const unitPrice = item.unitPrice ?? DEFAULT_UNIT_PRICE_RUB;
    const price = item.price ?? formatRubDisplay(unitPrice);
    const sizeClass = `${blockClass}-item-left-info-size`;
    const h5 = item.size
        ? `<h5><span>${escapeHtml(item.title)} <span class="${sizeClass}">${escapeHtml(item.size)}</span></span></h5>`
        : `<h5><span>${escapeHtml(item.title)}</span></h5>`;
    const altText = item.size ? `${item.title} ${item.size}` : item.title;

    return `
                <div class="${blockClass}-item" data-unit-price="${unitPrice}">
                    <div class="${blockClass}-item-left">
                        <img src="img/${escapeHtml(item.img)}" alt="${escapeHtml(altText)}">
                        <div class="${blockClass}-item-left-info">
                            ${h5}
                            <p>
                                ${DESCRIPTION}
                            </p>
                        </div>
                    </div>
                    <div class="${blockClass}-item-right">
                        <p><span>Цена за ед.:</span> ${price}</p>
                        <div class="${blockClass}-item-right-input">
                            <button class="calculator__bnt-minus" type="button">-</button>
                            <input class="calculator__input-number" type="number" placeholder="0">
                            <button class="calculator__bnt-plus" type="button">+</button>
                        </div>
                    </div>
                </div>`;
}

function mountCalculatorLists() {
    const wardrobesEl = document.getElementById('wrapper-items');
    const softEl = document.getElementById('wrapper-soft-furniture');
    const frameEl = document.getElementById('wrapper-frame-furniture');
    const windowsDoorsEl = document.getElementById('wrapper-windows-doors');
    const buildingDebrisEl = document.getElementById('wrapper-building-debris');
    const appliancesEl = document.getElementById('wrapper-appliances');

    if (wardrobesEl) {
        wardrobesEl.innerHTML = CALCULATOR_WARDROBE_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__wardrobes', row)
        ).join('');
    }

    if (softEl) {
        softEl.innerHTML = CALCULATOR_SOFT_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__soft-furniture', row)
        ).join('');
    }

    if (frameEl) {
        frameEl.innerHTML = CALCULATOR_FRAME_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__frame-furniture', row)
        ).join('');
    }

    if (windowsDoorsEl) {
        windowsDoorsEl.innerHTML = CALCULATOR_WINDOWS_DOORS_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__windows-doors', row)
        ).join('');
    }

    if (buildingDebrisEl) {
        buildingDebrisEl.innerHTML = CALCULATOR_BUILDING_DEBRIS_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__building-debris', row)
        ).join('');
    }

    if (appliancesEl) {
        appliancesEl.innerHTML = CALCULATOR_APPLIANCES_ITEMS.map((row) =>
            renderCalculatorItemRow('calculator__appliances', row)
        ).join('');
    }
}

mountCalculatorLists();
