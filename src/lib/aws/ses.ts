import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL || 'info@klonvar.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@klonvar.com';

interface EmailOptions {
  to?: string;
  subject: string;
  htmlBody: string;
  textBody: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to = NOTIFICATION_EMAIL, subject, htmlBody, textBody } = options;

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
        Text: {
          Data: textBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  try {
    await sesClient.send(command);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Send valuation request notification
export async function sendValuationNotification(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}): Promise<boolean> {
  const subject = `🏠 Nueva solicitud de valoración - ${data.name}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .content { padding: 30px; background: #fafafa; border-radius: 0 0 16px 16px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 12px; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6d6d6d; margin-bottom: 5px; }
        .value { font-size: 16px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">Nueva Solicitud de Valoración</h1>
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
  `;

  const textBody = `
Nueva Solicitud de Valoración

Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone}
Dirección: ${data.address}
${data.message ? `Mensaje: ${data.message}` : ''}
  `.trim();

  return sendEmail({ subject, htmlBody, textBody });
}

// Send contact request notification
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  propertyId?: string;
}): Promise<boolean> {
  const emailSubject = `📧 Nuevo contacto - ${data.subject || data.name}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1d1d1f; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1d1d1f, #2d2d2f); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
        .content { padding: 30px; background: #fafafa; border-radius: 0 0 16px 16px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 12px; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6d6d6d; margin-bottom: 5px; }
        .value { font-size: 16px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
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
  `;

  const textBody = `
Nuevo Mensaje de Contacto

Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}` : ''}
${data.subject ? `Asunto: ${data.subject}` : ''}
Mensaje: ${data.message}
${data.propertyId ? `Propiedad: ${data.propertyId}` : ''}
  `.trim();

  return sendEmail({ subject: emailSubject, htmlBody, textBody });
}
