# HandyMark Local - Form Handler

This project includes a contact form with AJAX submission, spinner loading, and success modal.

## Features

- **Contact Form**: Name, phone number, and message fields
- **AJAX Submission**: Form submits without page reload
- **Loading Spinner**: Shows during form submission
- **Success Modal**: Beautiful modal with HandyMark branding
- **Email & Telegram Notifications**: Sends notifications to Mark
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Client-side validation for required fields

## Files Structure

```
HandyMarkLocal/
├── index.html              # Main page with form
├── send-form.php           # PHP handler for form submission
├── form-logs.txt           # Log file for form submissions
├── .htaccess              # Server configuration
├── css/
│   ├── form-modal.css     # Styles for modal and spinner
│   └── ...                # Other CSS files
└── js/
    └── form-handler.js    # JavaScript for form handling
```

## How It Works

1. **Form Submission**: User fills out the form and clicks "Submit request"
2. **Spinner**: A loading spinner appears in the button
3. **AJAX Request**: Form data is sent to `send-form.php` via AJAX
4. **Server Processing**: PHP script:
   - Validates form data
   - Sends email to Mark@handymark.us
   - Sends Telegram notification
   - Logs the submission
5. **Success Modal**: Beautiful modal appears with success message
6. **Form Reset**: Form is cleared for next use

## Configuration

### Email Settings
- **To**: Mark@handymark.us
- **Subject**: "New request from HandyMark website"

### Telegram Settings
- **Bot Token**: 8189134089:AAHenhnIexEBe16jQ90goRyOBpFnXgQvqUY
- **Chat ID**: 6169313997

### Form Fields
- **Name**: Required text field
- **Contact**: Required phone number field
- **Message**: Required textarea field

## Success Modal Features

- **Design**: Matches HandyMark brand colors (#FF6100)
- **Content**: "Thank you! Your request has been sent successfully! I will contact you soon. Best regards, Mark"
- **Close Options**:
  - X button in top-right corner
  - "Close" button
  - Click outside modal
  - Press Escape key
- **Responsive**: Adapts to mobile and tablet screens

## Requirements

- PHP server with mail() function enabled
- Internet connection for Telegram notifications
- Modern web browser with JavaScript enabled

## Testing

1. Open `index.html` in a web browser
2. Fill out the form with test data
3. Submit the form
4. Verify spinner appears
5. Check for success modal
6. Verify email and Telegram notifications

## Troubleshooting

- **Form not submitting**: Check PHP server configuration
- **No email received**: Verify mail() function is enabled
- **No Telegram notification**: Check internet connection and bot token
- **Modal not showing**: Check JavaScript console for errors

## Logs

Form submissions are logged in `form-logs.txt` with format:
```
YYYY-MM-DD HH:MM:SS - Status from Name (Contact) [Email: OK/FAIL, Telegram: OK/FAIL]
``` 