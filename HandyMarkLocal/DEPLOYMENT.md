# Deployment Instructions

## Local Development Setup

### Option 1: Using PHP Built-in Server
```bash
cd HandyMarkLocal
php -S localhost:8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Using XAMPP/WAMP/MAMP
1. Copy the entire `HandyMarkLocal` folder to your web server directory
2. Start your local server (Apache + PHP)
3. Open http://localhost/HandyMarkLocal in your browser

### Option 3: Using Live Server (VS Code Extension)
1. Install Live Server extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. Note: This will only serve static files, PHP won't work

## Production Deployment

### Requirements
- Web server with PHP support (Apache/Nginx)
- PHP 7.4 or higher
- mail() function enabled
- Internet connection for Telegram notifications

### Steps
1. Upload all files to your web server
2. Ensure `send-form.php` has execute permissions
3. Test the form submission
4. Check `form-logs.txt` for any errors

### File Permissions
```bash
chmod 644 *.html *.css *.js
chmod 755 *.php
chmod 666 form-logs.txt
```

## Testing the Form

1. **Basic Test**: Fill out the form and submit
2. **Validation Test**: Try submitting with empty fields
3. **Network Test**: Check browser console for errors
4. **Email Test**: Verify email is received
5. **Telegram Test**: Check Telegram for notifications
6. **Log Test**: Check `form-logs.txt` for entries

## Troubleshooting

### Common Issues

**Form not submitting:**
- Check if PHP is enabled on server
- Verify `send-form.php` exists and is accessible
- Check browser console for JavaScript errors

**No email received:**
- Verify mail() function is enabled in PHP
- Check server mail configuration
- Look for errors in server logs

**No Telegram notification:**
- Check internet connection
- Verify bot token is correct
- Check if bot is active

**Modal not showing:**
- Check if `form-modal.css` is loaded
- Verify JavaScript console for errors
- Ensure all required files are present

### Debug Mode

Add this to the top of `send-form.php` for debugging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Security Notes

- The form includes basic validation
- Data is sanitized before processing
- CORS headers are set for cross-origin requests
- Consider adding CSRF protection for production use

## Performance

- CSS and JS files are minified for production
- Images are optimized
- Form uses efficient AJAX submission
- Modal animations are hardware-accelerated 