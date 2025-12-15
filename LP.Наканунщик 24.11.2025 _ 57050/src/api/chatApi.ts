/**
 * API для работы с чатом AI-ассистента "Наканунщик"
 * 
 * Реальный формат API бэкенда:
 * - URL: https://amp.kinetica.su/clientservices/kinetica/bot/
 * - Формат: { "messages": [{ "role": "bot" | "user", "content": string }] }
 */

type Message = {
  text: string;
  isBot: boolean;
};

type ApiMessage = {
  role: "bot" | "user";
  content: string;
};

// Используем прокси через веб-сервер (работает и в dev, и в production)
// В dev режиме Vite проксирует, в production нужно настроить прокси на веб-сервере
const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

/**
 * Конвертирует внутренний формат сообщений в формат API
 */
function convertMessagesToApi(messages: Message[]): ApiMessage[] {
  return messages.map((msg) => ({
    role: msg.isBot ? "bot" : "user",
    content: msg.text,
  }));
}

/**
 * Конвертирует формат API во внутренний формат сообщений
 */
function convertApiToMessage(apiMessage: ApiMessage): Message {
  return {
    text: apiMessage.content,
    isBot: apiMessage.role === "bot",
  };
}

/**
 * Отправляет запрос к API чата и получает ответ от бота
 * 
 * @param messages - Полная история сообщений в чате (включая новое сообщение пользователя)
 * @returns Promise с ответом от API или null в случае ошибки
 */
export async function sendChatMessage(messages: Message[]): Promise<Message | null> {
  try {
    // Конвертируем сообщения в формат API
    const apiMessages = convertMessagesToApi(messages);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: apiMessages,
      }),
    });

    let data;
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      // Пытаемся получить текст ошибки
      try {
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
      } catch (parseError) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      // Если это JSON с ошибкой, пробуем извлечь сообщение
      if (data && typeof data === 'object') {
        const errorMessage = data.message || data.error || data.detail || JSON.stringify(data);
        throw new Error(`API Error: ${errorMessage}`);
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Если это успешный ответ, парсим JSON
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Если не JSON, пытаемся как текст
      const text = await response.text();
      data = text;
    }

    // Проверяем формат ответа
    // API может вернуть разные форматы
    if (Array.isArray(data)) {
      // Если вернулся массив, берем последнее сообщение от бота
      const botMessages = data.filter((msg: ApiMessage) => msg.role === "bot");
      if (botMessages.length > 0) {
        return convertApiToMessage(botMessages[botMessages.length - 1]);
      }
    } else if (data.reply_to_user) {
      // Формат: { reply_to_user: string, options: [], debug_error?: string }
      // Это может быть как успешный ответ, так и ошибка (429 и т.д.)
      if (data.debug_error && data.debug_error.includes('429')) {
        // Ошибка 429 - слишком много запросов
        return {
          text: "Извините, слишком много запросов. Подождите немного и попробуйте снова.",
          isBot: true,
        };
      }
      // Возвращаем ответ пользователю
      return {
        text: data.reply_to_user,
        isBot: true,
      };
    } else if (data.content) {
      // Если вернулся объект с полем content
      return convertApiToMessage({ role: "bot", content: data.content });
    } else if (data.role && data.content) {
      // Если вернулся объект с role и content
      return convertApiToMessage(data as ApiMessage);
    } else if (typeof data === 'string') {
      // Если вернулась просто строка
      return { text: data, isBot: true };
    }

    throw new Error('Неожиданный формат ответа от API');
  } catch (error) {
    // Логируем только критичные ошибки
    if (error instanceof Error && !error.message.includes('429')) {
      console.error('Chat API error:', error.message);
    }
    return null;
  }
}

