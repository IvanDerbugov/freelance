<?php
$backGroundIndex = 0;
$totalArray = [];
?>
<table class="table table-striped table-bordered statistic-detail-view" style="overflow-x:scroll; width:90%; padding-top: 16px;">



    <tr class="day-header" >
        <td></td>
        <td>Итого</td>

        <?php foreach ($model['days'] as $key => $item) { ?>
            <td class="text-center">
            <?php if ($filter == 'week') {?>
                <?=$key?>
            <?php } else if ($filter == 'month') {?>
                <?=$key?>
            <?php } else { ?>
                <?= date('d.m',strtotime($key)) ?>&nbsp;
            <?php } ?>
            </td>

        <?php } ?>
    </tr>
    
    <?php
    // echo '<pre>';
    // var_dump($model);
    // echo '</pre>';
    // exit();
    foreach ($model as $funnel => $item) {
        $backGroundIndex = 0;

        if ($funnel == 'days' || $funnel == '') {
            continue;
        }?>
        <td><b style="font-size:16px"><?= $funnel ?></b></td>
        <tr >
        <?php foreach ($item as $indicator => $days) {
            $addRubleSign = false;
            $trClass = '';
            if ($backGroundIndex % 2 == 0) {
                $trClass = 'grey-backgroud-tr'; 
            }
            $backGroundIndex++;
            $isLoss = false;
            if ($indicator == 'Потери') {
                $childs = $days['childs'];
                $days = $days['days'];
                $isLoss = true;
            }?>
            <tr class="<?=$trClass?>">
                <td><?=$indicator?> <?= $isLoss ? '<a href="javascript:;" data-name="'.$indicator. $dispatcherId .'"><i class="fa fa-plus-square" aria-hidden="true"></i></a>' : ''?></td>
                
            <?php $total = array_reduce($days, function($sum, $item){
                return $sum + $item;
            });
            $totalArray[$funnel][$indicator] = $total;
            $addPercent = false;
            if ($indicator == 'Конверсия повторных ЛИДОВ') {
                $total = (int)($totalArray[$dispatcherId]['Повторные лиды'] / $totalArray[$dispatcherId]['Оценки качества'] * 100); 
                $totalArray[$dispatcherId][$indicator] = $total;
                $addPercent = true;
            }
            if ($indicator == 'Конверсия повторных ПРОДАЖ') {
                $total = (int)($totalArray[$dispatcherId]['Повторные заказы'] / $totalArray[$dispatcherId]['Повторные лиды'] * 100); 
                $totalArray[$dispatcherId][$indicator] = $total;
                $addPercent = true;
            }
            if ($indicator == 'Конверсия продаж') {
                $total = (int)($totalArray[$funnel]['Новые заказы'] / $totalArray[$funnel]['Новые лиды'] * 100); 
                $totalArray[$funnel][$indicator] = $total;
                $addPercent = true;
            }
            if ($indicator == 'Средний чек повторных') {
                $total = (int)($totalArray[$dispatcherId]['Выручка повторных'] / $totalArray[$dispatcherId]['Повторные заказы']);
                $totalArray[$dispatcherId][$indicator] = $total;
            }
            if ($indicator == 'Средний чек') {
                $total = (int)($totalArray[$funnel]['Выручка'] / $totalArray[$funnel]['Новые заказы']);
                $totalArray[$funnel][$indicator] = $total;
            }
            if ($indicator == 'Средняя ГП новых') {
                $total = (int)($totalArray[$dispatcherId]['Грязная прибыль'] / $totalArray[$dispatcherId]['Новые заказы']);
                $totalArray[$dispatcherId][$indicator] = $total;
            }
            if ($indicator == 'Средняя ГП повторных') {
                $total = (int)($totalArray[$dispatcherId]['Грязная прибыль повторных'] / $totalArray[$dispatcherId]['Повторные заказы']);
                $totalArray[$dispatcherId][$indicator] = $total;
            }
            if ($indicator == 'Процент повторных продаж') {
                $total = (int)($totalArray[$dispatcherId]['Выручка повторных'] / ($totalArray[$dispatcherId]['Выручка новых'] / 100));
                $totalArray[$dispatcherId][$indicator] = $total;
                $addPercent = true;
            }
            // $planValue = $plan->getPlanForIndicator($indicator, $totalArray[$dispatcherId]);
            // $percentOfCompletion = round($plan->getPercentageOfCompletion($indicator, $total, $totalArray[$dispatcherId]), 0);
            if (in_array($indicator, ['Выручка новых', 'Грязная прибыль', 'Средняя ГП новых', 'Выручка', 'Грязная прибыль повторных', 'Средняя ГП повторных', 'Средний чек', 'Средний чек повторных'])) {
                $total = number_format((int)$total, 0, ',', ' ');
                // $planValue = number_format((int)$planValue, 0, ',', ' ');
                $addRubleSign = true;
            }
            // if ($percentOfCompletion >= 100) {
            //     $color = 'lightgreen';
            // } else if ($percentOfCompletion > 80 && $percentOfCompletion < 100) {
            //     $color = 'lightblue';
            // } else if ($percentOfCompletion > 60 && $percentOfCompletion < 80) {
            //     $color = 'yellow';
            // } else if ($percentOfCompletion < 60 && $percentOfCompletion > 0) {
            //     $color = 'lightsalmon';
            // } else if ($percentOfCompletion == 0) {
            //     $color = '';
            // }

            ?>
            <!-- <td class="text-center"><?=$planValue . ($addPercent ? '%' : '') . ($addRubleSign ? ' ₽' : '') ?></td> -->
            <td class="text-center"><b><?=($addRubleSign ? $total : round($total, 0)). ($addPercent ? '%' : '') . ($addRubleSign ? ' ₽' : '')?></b></td>
            <!-- <td class="text-center" style="background-color:<?=$color?>"><b><?=$percentOfCompletion?>%</b></td> -->
            <?php 
            
            foreach ($days as $date => $value) {
                $addPercent = false;
                $addRubleSign = false;
                if ($indicator == 'Конверсия повторных ЛИДОВ') {
                    $value = $model[$dispatcherId]['Повторные лиды'][$date] / $model[$dispatcherId]['Оценки качества'][$date] * 100;
                    $addPercent = true;
                }
                if ($indicator == 'Конверсия повторных ПРОДАЖ') {
                    $value = $model[$dispatcherId]['Повторные заказы'][$date] / $model[$dispatcherId]['Повторные лиды'][$date] * 100;
                    $addPercent = true;
                }
                if ($indicator == 'Конверсия продаж') {
                    $value = $model[$funnel]['Новые заказы'][$date] / $model[$funnel]['Новые лиды'][$date] * 100;
                    $addPercent = true;
                }
                // if ($indicator == 'Средний чек повторных') {
                //     $value = $model[$dispatcherId]['Выручка повторных'][$date] / $model[$dispatcherId]['Повторные заказы'][$date];
                // }
                if ($indicator == 'Средний чек') {
                    $value = $model[$funnel]['Выручка'][$date] / $model[$funnel]['Новые заказы'][$date];
                }
                if ($indicator == 'Средняя ГП новых') {
                    $value = $model[$dispatcherId]['Грязная прибыль'][$date] / $model[$dispatcherId]['Новые заказы'][$date];
                }
                if ($indicator == 'Средняя ГП повторных') {
                    $value = $model[$dispatcherId]['Грязная прибыль повторных'][$date] / $model[$funnel]['Повторные заказы'][$date];
                }
                if ($indicator == 'Процент повторных продаж') {
                    $value = (float)( $model[$dispatcherId]['Выручка повторных'][$date] / ($model[$funnel]['Выручка новых'][$date] / 100));
                    $addPercent = true;
                }
                
                ?>
                <td class="text-center" >
                <?php 
                if (in_array($indicator, ['Выручка новых', 'Грязная прибыль', 'Средняя ГП новых', 'Выручка', 'Грязная прибыль повторных', 'Средняя ГП повторных', 'Средний чек', 'Средний чек повторных'])) {
                    $value = number_format((int)$value, 0, ',', ' ');
                    $addRubleSign = true;
                }
                ?>
                <?= ($addRubleSign ? $value : (int)round($value, 0)) . ($addPercent ? '%' : '') . ($addRubleSign ? ' ₽' : '')?>&nbsp;
                </td>
            <?php }
            ?>
            </tr>
            <?php if ($indicator == 'Потери') {?>
                <?php foreach ($childs as $key => $values) { ?>
                    <tr style="display: none" data-child="<?=$indicator. $dispatcherId?>">
                        <td style="text-align: right;"><?=$key?></td>
                        <?php $total = array_reduce($values, function($sum, $item){
                            return $sum + $item;
                        }); ?>
                        <td class="text-center"><b><?=(int)$total?></b></td>
                        <?php foreach($values as $value) {?>
                            <td class="text-center"><?=(int)$value?></td>
                        <?php } ?>
                    </tr>
                <?php } ?> 
            <?php } ?>

            
        <?php } ?>
        </tr>


    <?php } ?>






</table>

<!-- Подключаем CSS для sticky -->
<link href="/css/sticky-fix.css?v=<?= time() ?>" rel="stylesheet">


<!-- Вторая таблица для теста-->
    <div class="tableIvan">
        <div class="header-tableIvan">
            <div>1 шапка</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>1 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>2 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>3 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>4 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>5 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>6 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>

        <div class="rowIvan">
            <div>7 ряд</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
        </div>
    </div>