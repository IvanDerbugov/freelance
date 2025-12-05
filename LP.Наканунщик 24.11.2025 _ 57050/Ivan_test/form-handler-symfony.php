<?php
/**
 * Упрощенный обработчик формы для Symfony проекта
 * 
 * Использование:
 * 1. Скопируйте этот файл в src/Controller/Frontend/SimpleFormController.php
 * 2. Добавьте роут в config/routes.yaml или через атрибут
 * 3. Настройте отправку писем через ваш MailManager или напрямую
 * 
 * Форма должна содержать поля:
 * - name (обязательно)
 * - email (обязательно) 
 * - company (опционально)
 * - content (опционально - о проекте)
 */

namespace App\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SimpleFormController extends AbstractController
{
    #[Route("/api/form/submit", name: "simple_form_submit", methods: ["POST"])]
    public function submit(Request $request): Response
    {
        $response = ['success' => false];
        $requestData = $request->request->all();

        // Защита от ботов (скрытое поле login должно быть пустым)
        $bot = isset($requestData['login']) ? trim(htmlspecialchars($requestData['login'], ENT_QUOTES)) : '';
        if ($bot) {
            $response['error']['general'] = 'Доступ запрещен';
            return new Response(json_encode($response), 403, ['Content-Type' => 'application/json']);
        }

        // Валидация и очистка данных
        $name = isset($requestData['name']) ? trim(htmlspecialchars($requestData['name'], ENT_QUOTES)) : '';
        $email = isset($requestData['email']) ? trim(htmlspecialchars($requestData['email'], ENT_QUOTES)) : '';
        $company = isset($requestData['company']) ? trim(htmlspecialchars($requestData['company'], ENT_QUOTES)) : '';
        $content = isset($requestData['content']) ? nl2br(trim(htmlspecialchars($requestData['content'], ENT_QUOTES))) : '';

        // Валидация
        if (!$name) {
            $response['error']['name'] = 'Укажите имя';
        }
        if (!$email) {
            $response['error']['email'] = 'Укажите email';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['error']['email'] = 'Укажите правильный email';
        }

        // Если есть ошибки - возвращаем их
        if (isset($response['error'])) {
            return new Response(json_encode($response, JSON_UNESCAPED_UNICODE), 400, ['Content-Type' => 'application/json']);
        }

        // Формируем содержимое письма
        $subject = 'Новая заявка с сайта';
        $body = '<html><body style="font-family: Arial, sans-serif;">';
        $body .= '<h2>Новая заявка с сайта</h2>';
        $body .= '<table style="border-collapse: collapse; width: 100%; max-width: 600px;">';
        $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Имя:</b></td>';
        $body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $name . '</td></tr>';
        $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Email:</b></td>';
        $body .= '<td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:' . $email . '">' . $email . '</a></td></tr>';

        if ($company) {
            $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Компания:</b></td>';
            $body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $company . '</td></tr>';
        }

        if ($content) {
            $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>О проекте:</b></td>';
            $body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $content . '</td></tr>';
        }

        $body .= '</table>';
        $body .= '<p style="margin-top: 20px; color: #666; font-size: 12px;">';
        $body .= 'Дата: ' . date('d.m.Y H:i:s') . '<br>';
        $body .= 'IP: ' . $request->getClientIp() . '<br>';
        $body .= 'URL: ' . ($request->headers->get('referer') ?? 'не определен');
        $body .= '</p>';
        $body .= '</body></html>';

        // Отправка письма
        // ВАРИАНТ 1: Если у вас есть MailManager (как в kinetica4.su)
        // Раскомментируйте и настройте под ваш проект:
        /*
        $settings = ['from_email' => 'lead@kinetica.su', 'from_name' => 'KINETICA', 'bcc' => 'lead@kinetica.su'];
        $mail = MailManager::doCompile($name, $toEmail, $subject, $body, 23, false, 1, false, $settings, new \DateTimeImmutable());
        $entityManager->persist($mail);
        $entityManager->flush();
        */

        // ВАРИАНТ 2: Простая отправка через mail()
        $toEmail = 'lead@kinetica.su';
        $fromEmail = 'lead@kinetica.su';
        $fromName = 'KINETICA';
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From: " . $fromName . " <" . $fromEmail . ">\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";

        $mailSent = mail($toEmail, '=?utf-8?B?' . base64_encode($subject) . '?=', $body, $headers);

        if ($mailSent) {
            $response['success'] = true;
            $response['message'] = 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.';
        } else {
            $response['error']['general'] = 'Ошибка отправки. Попробуйте позже.';
        }

        return new Response(json_encode($response, JSON_UNESCAPED_UNICODE), 200, ['Content-Type' => 'application/json']);
    }
}

