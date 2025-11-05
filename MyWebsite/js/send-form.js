const TELEGRAM_BOT_TOKEN = '8439270981:AAFMnuowPXV9SJuu6ydkYdG2hHW4_GT2ahI';
const TELEGRAM_CHAT_ID = '955498826';
async function sendToTelegram(name, contact, project, deadline, contactType = 'email') {
    const contactIcon = contactType === 'phone' ? '📱' : '📧';
    const contactLabel = contactType === 'phone' ? 'Телефон' : 'Email';
    
    const message = `🎨 *НОВАЯ ЗАЯВКА С САЙТА-ПОРТФОЛИО*

👤 *Имя:* ${name || 'Не указано'}
${contactIcon} *${contactLabel}:* ${contact}
💼 *Проект:* ${project}
⏰ *Сроки:* ${deadline || 'Не указаны'}
📅 *Дата:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            logFormSubmission({
                status: 'SUCCESS',
                name,
                contact,
                contactType,
                project,
                deadline,
                timestamp: new Date().toISOString(),
                telegramResponse: 'OK'
            });
            return { success: true, message: 'Заявка успешно отправлена!' };
        } else {
            logFormSubmission({
                status: 'TELEGRAM_ERROR',
                name,
                contact,
                contactType,
                project,
                deadline,
                timestamp: new Date().toISOString(),
                error: data.description || 'Unknown Telegram API error'
            });
            return { success: false, message: 'Ошибка отправки в Telegram: ' + data.description };
        }
    } catch (error) {
        logFormSubmission({
            status: 'NETWORK_ERROR',
            name,
            contact,
            contactType,
            project,
            deadline,
            timestamp: new Date().toISOString(),
            error: error.message
        });
        return { success: false, message: 'Ошибка соединения: ' + error.message };
    }
}

function logFormSubmission(logData) {
    let logs = [];
    try {
        const existingLogs = localStorage.getItem('formSubmissionLogs');
        if (existingLogs) {
            logs = JSON.parse(existingLogs);
        }
    } catch (e) {
        console.error('Error reading logs from localStorage:', e);
    }

    logs.push(logData);

    if (logs.length > 100) {
        logs = logs.slice(-100);
    }

    try {
        localStorage.setItem('formSubmissionLogs', JSON.stringify(logs));
    } catch (e) {
        console.error('Error saving logs to localStorage:', e);
    }

    console.log('Form Submission Log:', logData);
}

async function sendLogToExternalService(logData) {
    const contactIcon = logData.contactType === 'phone' ? '📱' : '📧';
    const contactLabel = logData.contactType === 'phone' ? 'Телефон' : 'Email';
    
    const logMessage = `📊 *LOG ENTRY*
Status: ${logData.status}
${contactIcon} ${contactLabel}: ${logData.contact}
Time: ${new Date(logData.timestamp).toLocaleString('ru-RU')}
${logData.error ? `Error: ${logData.error}` : ''}`;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: logMessage,
                parse_mode: 'Markdown'
            })
        });
    } catch (e) {
        console.error('Failed to send log to Telegram:', e);
    }
}

function getAllLogs() {
    try {
        const logs = localStorage.getItem('formSubmissionLogs');
        return logs ? JSON.parse(logs) : [];
    } catch (e) {
        console.error('Error reading logs:', e);
        return [];
    }
}

function exportLogsToFile() {
    const logs = getAllLogs();
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `form-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function clearLogs() {
    try {
        localStorage.removeItem('formSubmissionLogs');
        console.log('Logs cleared successfully');
        return true;
    } catch (e) {
        console.error('Error clearing logs:', e);
        return false;
    }
}

window.FormHandler = {
    sendToTelegram,
    getAllLogs,
    exportLogsToFile,
    clearLogs
};

