import { sendEmail } from './resend'

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || ''

interface MessageNotificationData {
  clientName: string
  clientEmail: string
  message: string
  propertyTitle?: string
}

interface AdminReplyNotificationData {
  clientName: string
  clientEmail: string
  adminName: string
  message: string
}

// Send notification to admin when client sends a message
export async function sendMessageNotification(data: MessageNotificationData): Promise<boolean> {
  if (!ADMIN_NOTIFICATION_EMAIL) {
    console.warn('ADMIN_NOTIFICATION_EMAIL not configured, skipping email notification')
    return false
  }

  const subject = `💬 Nuevo mensaje de ${data.clientName}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; background: white; border-radius: 0 0 16px 16px; }
        .field { margin-bottom: 20px; padding: 15px; background: #fafafa; border-radius: 12px; border-left: 4px solid #06b6d4; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6d6d6d; margin-bottom: 5px; }
        .value { font-size: 16px; font-weight: 500; }
        .message-box { background: #f0f9ff; padding: 20px; border-radius: 12px; margin-top: 10px; }
        .message-content { font-size: 15px; color: #1d1d1f; white-space: pre-wrap; }
        .cta { margin-top: 25px; }
        .cta a { display: inline-block; padding: 14px 28px; background: #1d1d1f; color: white; text-decoration: none; border-radius: 980px; font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; color: #6d6d6d; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 Nuevo Mensaje Recibido</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">De</div>
            <div class="value">${data.clientName}</div>
            <div style="font-size: 14px; color: #6d6d6d;">${data.clientEmail}</div>
          </div>
          
          ${data.propertyTitle ? `
          <div class="field">
            <div class="label">Relacionado con</div>
            <div class="value">${data.propertyTitle}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Mensaje</div>
            <div class="message-box">
              <div class="message-content">${data.message}</div>
            </div>
          </div>
          
          <div class="cta">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/messages">Responder en el Panel</a>
          </div>
        </div>
        <div class="footer">
          Este mensaje fue enviado a través del portal de clientes de Klonvar.
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: ADMIN_NOTIFICATION_EMAIL, subject, html })
}

// Send notification to client when admin replies
export async function sendAdminReplyNotification(data: AdminReplyNotificationData): Promise<boolean> {
  const subject = `📩 Nueva respuesta de Klonvar`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; background: white; border-radius: 0 0 16px 16px; }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .message-box { background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #06b6d4; }
        .message-content { font-size: 15px; color: #1d1d1f; white-space: pre-wrap; }
        .sender { font-size: 13px; color: #6d6d6d; margin-top: 10px; }
        .cta { margin-top: 25px; text-align: center; }
        .cta a { display: inline-block; padding: 14px 28px; background: #06b6d4; color: white; text-decoration: none; border-radius: 980px; font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; color: #6d6d6d; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 Nueva Respuesta</h1>
        </div>
        <div class="content">
          <div class="greeting">Hola ${data.clientName},</div>
          
          <p>Has recibido una nueva respuesta de nuestro equipo:</p>
          
          <div class="message-box">
            <div class="message-content">${data.message}</div>
            <div class="sender">— ${data.adminName}, Equipo Klonvar</div>
          </div>
          
          <p>Puedes continuar la conversación desde tu portal de cliente.</p>
          
          <div class="cta">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/portal/messages">Ver Conversación</a>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Klonvar Inmobiliaria</p>
          <p style="font-size: 11px;">Si no quieres recibir más notificaciones, puedes configurarlo en tu portal.</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: data.clientEmail, subject, html })
}