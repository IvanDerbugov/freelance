<?php
session_start();

// Инициализация корзины
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Добавление товара в корзину
if (isset($_POST['add_to_cart'])) {
    $product_id = $_POST['product_id'];
    $product_name = $_POST['product_name'];
    $product_price = $_POST['product_price'];
    $quantity = $_POST['quantity'] ?? 1;
    
    // Если товар уже есть в корзине - увеличиваем количество
    if (isset($_SESSION['cart'][$product_id])) {
        $_SESSION['cart'][$product_id]['quantity'] += $quantity;
    } else {
        // Добавляем новый товар
        $_SESSION['cart'][$product_id] = [
            'name' => $product_name,
            'price' => $product_price,
            'quantity' => $quantity
        ];
    }
    
    echo "Товар добавлен в корзину!";
}

// Удаление товара из корзины
if (isset($_GET['remove'])) {
    $product_id = $_GET['remove'];
    unset($_SESSION['cart'][$product_id]);
}

// Очистка корзины
if (isset($_GET['clear'])) {
    $_SESSION['cart'] = [];
}

// Подсчет общей суммы
function getTotalPrice() {
    $total = 0;
    if (isset($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $item) {
            $total += $item['price'] * $item['quantity'];
        }
    }
    return $total;
}

// Количество товаров в корзине
function getCartCount() {
    $count = 0;
    if (isset($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $item) {
            $count += $item['quantity'];
        }
    }
    return $count;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Корзина товаров</title>
    <style>
        .cart-item { 
            border: 1px solid #ddd; 
            padding: 10px; 
            margin: 5px 0; 
        }
        .cart-total { 
            font-size: 20px; 
            font-weight: bold; 
            color: red; 
        }
        .btn { 
            background: #ff6b6b; 
            color: white; 
            padding: 5px 10px; 
            border: none; 
            cursor: pointer; 
        }
    </style>
</head>
<body>

<h1>Корзина (<?= getCartCount() ?> товаров)</h1>

<!-- Добавление товара (пример) -->
<form method="POST">
    <h3>Добавить товар:</h3>
    <input type="hidden" name="product_id" value="1">
    <input type="hidden" name="product_name" value="Кухня Флэт-03">
    <input type="hidden" name="product_price" value="10890">
    <input type="number" name="quantity" value="1" min="1">
    <button type="submit" name="add_to_cart" class="btn">Добавить в корзину</button>
</form>

<hr>

<!-- Отображение корзины -->
<?php if (empty($_SESSION['cart'])): ?>
    <p>Корзина пуста</p>
<?php else: ?>
    
    <?php foreach ($_SESSION['cart'] as $id => $item): ?>
        <div class="cart-item">
            <strong><?= $item['name'] ?></strong><br>
            Цена: <?= $item['price'] ?> руб.<br>
            Количество: <?= $item['quantity'] ?><br>
            Сумма: <?= $item['price'] * $item['quantity'] ?> руб.<br>
            <a href="?remove=<?= $id ?>" class="btn">Удалить</a>
        </div>
    <?php endforeach; ?>
    
    <div class="cart-total">
        Общая сумма: <?= getTotalPrice() ?> руб.
    </div>
    
    <p>
        <a href="?clear=1" class="btn">Очистить корзину</a>
        <button class="btn" onclick="orderCart()">Оформить заказ</button>
    </p>
    
<?php endif; ?>

<script>
function orderCart() {
    // Здесь ваш код отправки заявки
    // Можете использовать тот же способ, что уже умеете
    let cartData = <?= json_encode($_SESSION['cart'] ?? []) ?>;
    let total = <?= getTotalPrice() ?>;
    
    alert('Заказ на сумму ' + total + ' руб. будет отправлен!');
    
    // Отправляете данные корзины в вашу форму заявки
}
</script>

</body>
</html>
