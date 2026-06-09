import nodemailer from 'nodemailer';

export interface LeadEmailData {
  name: string;
  email: string;
  service_type: string;
  message: string;
  budget?: string;
  phone?: string;
}

export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.NOTIFICATION_EMAIL;

    // Check if configuration is available
    if (!host || !user || !pass || !to) {
      console.warn('⚠️ SMTP notification email is not fully configured. Missing env variables.');
      return { success: false, error: 'SMTP environment variables are not configured.' };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for other ports like 587
      auth: {
        user,
        pass,
      },
    });

    const subject = `New Project Request: ${lead.name} (${lead.service_type})`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Lead Notification</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f8fafc;
              margin: 0;
              padding: 0;
              color: #1e293b;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
              border: 1px solid #e2e8f0;
            }
            .header {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              color: #ffffff;
              padding: 32px 24px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: -0.025em;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 14px;
              color: #94a3b8;
            }
            .content {
              padding: 32px 24px;
            }
            .section-title {
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #64748b;
              margin-bottom: 8px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 24px;
            }
            .grid-item {
              background-color: #f8fafc;
              padding: 16px;
              border-radius: 8px;
              border: 1px solid #f1f5f9;
            }
            .grid-item-label {
              font-size: 11px;
              font-weight: 600;
              color: #64748b;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .grid-item-value {
              font-size: 15px;
              font-weight: 500;
              color: #0f172a;
            }
            .message-box {
              background-color: #f8fafc;
              padding: 20px;
              border-radius: 12px;
              border: 1px solid #f1f5f9;
              margin-bottom: 24px;
            }
            .message-text {
              font-size: 14px;
              line-height: 1.6;
              color: #334155;
              white-space: pre-wrap;
              margin: 0;
            }
            .footer {
              background-color: #f8fafc;
              padding: 24px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer a {
              display: inline-block;
              background-color: #3b82f6;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 9999px;
              font-weight: 600;
              font-size: 14px;
              transition: background-color 0.2s;
            }
            .footer a:hover {
              background-color: #2563eb;
            }
            .footer p {
              margin: 16px 0 0 0;
              font-size: 12px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Request Received</h1>
              <p>A user submitted a new inquiry on Dixon Digital</p>
            </div>
            <div class="content">
              <div class="grid">
                <div class="grid-item">
                  <div class="grid-item-label">Client Name</div>
                  <div class="grid-item-value">${lead.name}</div>
                </div>
                <div class="grid-item">
                  <div class="grid-item-label">Service Type</div>
                  <div class="grid-item-value" style="text-transform: capitalize;">${lead.service_type}</div>
                </div>
                <div class="grid-item" style="grid-column: span 2;">
                  <div class="grid-item-label">Email Address</div>
                  <div class="grid-item-value"><a href="mailto:${lead.email}" style="color: #3b82f6; text-decoration: none;">${lead.email}</a></div>
                </div>
                ${lead.phone ? `
                <div class="grid-item" style="grid-column: span 2;">
                  <div class="grid-item-label">Phone Number</div>
                  <div class="grid-item-value"><a href="tel:${lead.phone}" style="color: #3b82f6; text-decoration: none;">${lead.phone}</a></div>
                </div>
                ` : ''}
                ${lead.budget ? `
                <div class="grid-item" style="grid-column: span 2;">
                  <div class="grid-item-label">Estimated Budget</div>
                  <div class="grid-item-value">${lead.budget}</div>
                </div>
                ` : ''}
              </div>

              <div class="section-title">Message details</div>
              <div class="message-box">
                <p class="message-text">${lead.message}</p>
              </div>
            </div>
            <div class="footer">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" target="_blank">Open Admin Dashboard</a>
              <p>This is an automated notification from Axion.Digital. Do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `Dixon Digital Notifications <${user}>`,
      to,
      subject,
      text: `New Request from ${lead.name} (${lead.service_type})\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nBudget: ${lead.budget || 'N/A'}\n\nMessage:\n${lead.message}`,
      html: htmlContent,
    });

    console.log('✅ Lead email notification sent successfully:', info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to send lead email notification:', error);
    return { success: false, error: error.message || String(error) };
  }
}
