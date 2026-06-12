# Email Configuration Guide

To enable the contact form functionality, you need to configure email settings.

## Using Gmail

1. **Generate an App Password:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled
   - Go to "App passwords"
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

2. **Set Environment Variables:**
   ```
   Windows (Command Prompt):
   set EMAIL_USER=your-email@gmail.com
   set EMAIL_PASSWORD=your-16-char-app-password
   npm start

   Windows (PowerShell):
   $env:EMAIL_USER="your-email@gmail.com"
   $env:EMAIL_PASSWORD="your-16-char-app-password"
   npm start

   Linux/Mac:
   export EMAIL_USER=your-email@gmail.com
   export EMAIL_PASSWORD=your-16-char-app-password
   npm start
   ```

3. **Or Create .env file:**
   Create a `.env` file in the root directory:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## Using Other Email Services

The app uses Nodemailer, which supports:
- Gmail
- Outlook/Hotmail
- Yahoo Mail
- Custom SMTP servers

Refer to [Nodemailer documentation](https://nodemailer.com/smtp/) for other services.

## Starting the Server

After setting environment variables, run:
```
npm start
```

The server will start on http://localhost:3000
