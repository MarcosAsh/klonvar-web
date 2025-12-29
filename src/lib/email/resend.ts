import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@klonvar.com'

interface EmailOptions {
  to?: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to = NOTIFICATION_EMAIL, subject, html, text } = options

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Send valuation request notification
export async function sendValuationNotification(data: {
  name: string
  email: string
  phone: string
  address: string
  message?: string
}): Promise<boolean> {
  const subject = `🏠 Nueva solicitud de valoración - ${data.name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; background: #fafafa; border-radius: 0 0 16px 16px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 12px; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6d6d6d; margin-bottom: 5px; }
        .value { font-size: 16px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nueva Solicitud de Valoración</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nombre</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Teléfono</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">Dirección del inmueble</div>
            <div class="value">${data.address}</div>
          </div>
          ${data.message ? `
          <div class="field">
            <div class="label">Mensaje</div>
            <div class="value">${data.message}</div>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({ subject, html })
}

// Send contact request notification
export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  propertyId?: string
}): Promise<boolean> {
  const emailSubject = `📧 Nuevo contacto - ${data.subject || data.name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; background: #fafafa; border-radius: 0 0 16px 16px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 12px; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6d6d6d; margin-bottom: 5px; }
        .value { font-size: 16px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nuevo Mensaje de Contacto</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nombre</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${data.email}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Teléfono</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          ${data.subject ? `
          <div class="field">
            <div class="label">Asunto</div>
            <div class="value">${data.subject}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Mensaje</div>
            <div class="value">${data.message}</div>
          </div>
          ${data.propertyId ? `
          <div class="field">
            <div class="label">Propiedad relacionada</div>
            <div class="value">${data.propertyId}</div>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({ subject: emailSubject, html })
}

// Send welcome email to new users
export async function sendWelcomeEmail(data: {
  email: string
  name: string
}): Promise<boolean> {
  const subject = `¡Bienvenido a Klonvar, ${data.name}!`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; background: #fafafa; border-radius: 0 0 16px 16px; text-align: center; }
        .button { display: inline-block; padding: 14px 32px; background: #1d1d1f; color: white; text-decoration: none; border-radius: 980px; font-weight: 500; margin-top: 20px; }
        p { margin: 0 0 16px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Bienvenido a Klonvar!</h1>
        </div>
        <div class="content">
          <p>Hola ${data.name},</p>
          <p>Gracias por registrarte en Klonvar. Estamos encantados de tenerte con nosotros.</p>
          <p>Desde tu portal podrás gestionar tus propiedades, documentos y comunicarte directamente con nuestro equipo.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard" class="button">Acceder al Portal</a>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: data.email, subject, html })
}
