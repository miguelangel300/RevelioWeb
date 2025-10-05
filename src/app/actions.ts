'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const BookingInquirySchema = z.object({
  clientName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  phone: z.string().optional(),
  weddingDate: z.string().min(1, { message: "Por favor, selecciona una fecha para la boda." }),
  venue: z.string().min(2, { message: "El lugar debe tener al menos 2 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(1000, { message: "El mensaje no puede exceder los 1000 caracteres." }),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad para continuar."
  })
});

export type BookingInquiryData = z.infer<typeof BookingInquirySchema>;

export async function handleBookingInquiry(data: BookingInquiryData) {
  const validationResult = BookingInquirySchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  console.log('Iniciando envío de email...');
  
  // Verificar que tenemos la contraseña (aceptamos SMTP_PASS o GMAIL_APP_PASSWORD)
  const availablePassword = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  if (!availablePassword) {
    console.error('No se encontró la variable de entorno SMTP_PASS ni GMAIL_APP_PASSWORD');
    return {
      success: false,
      message: "Error de configuración del servidor: falta la contraseña SMTP",
    };
  }
  
  // Configuración del transporte SMTP configurable.
  // Preferimos usar variables de entorno del hosting (p.ej. PiensaSolutions):
  // SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM
  // Si no se proporcionan, usamos la configuración temporal de Gmail.

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : undefined;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_SMTP_USER || 'alex.montalvo.carrasco@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  let transporter;

  if (smtpHost) {
    console.log('Usando transporte SMTP desde variables de entorno (SMTP_HOST detectado)');
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort ?? 465,
      secure: smtpSecure ?? true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      debug: true,
      logger: true,
    });
  } else {
    console.log('No se detectó SMTP_HOST — usando configuración temporal de Gmail. Es recomendable configurar SMTP_HOST para enviar desde info@reveliophotography.es');
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      debug: true,
      logger: true,
    });
  }

  console.log('Transporter configurado');

  // Construir el mensaje
  const { clientName, email, phone, weddingDate, venue, message: userMessage } = validationResult.data;
  const messageText = `
Nueva consulta de boda:

DATOS DEL CLIENTE:
----------------
Nombre: ${clientName}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Fecha de la boda: ${weddingDate}
Lugar: ${venue}

MENSAJE DEL CLIENTE:
-----------------
${userMessage}

-------------------
Enviado desde el formulario de contacto de reveliophotography.es
`;

  // Determine the 'from' address. Prefer MAIL_FROM (ej. info@reveliophotography.es)
  const mailFromAddress = process.env.MAIL_FROM || smtpUser || 'alex.montalvo.carrasco@gmail.com';

  const mailOptions = {
    from: {
      name: 'Formulario Revelio Photography',
      address: mailFromAddress
    },
    // Primary recipient should be the official info address. Other internal recipients
    // are moved to BCC so that delivery to the main inbox is prioritized and
    // the email headers do not confuse some spam filters or providers.
    to: 'info@reveliophotography.es',
    bcc: ['alex.montalvo.carrasco@gmail.com', 'elia499@hotmail.com'],
    subject: `Nueva consulta de boda de ${clientName}`,
    replyTo: email,
    headers: {
      'X-Mailer': 'Revelio Photography Website',
      'X-Priority': '1',
      'Importance': 'high',
      'X-Source': 'Contact Form'
    },
    text: messageText
  };

  try {
    console.log('Iniciando verificación de conexión...');
    
    // Verificar la conexión primero
    await transporter.verify();
    console.log('Conexión SMTP verificada correctamente');
    
    console.log('Preparando para enviar email con opciones:', {
      ...mailOptions,
      pass: '***' // Ocultamos la contraseña en los logs
    });
    
    // Intentar enviar el email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente');
    console.log('Detalles de envío:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    // Extra debug: log whether the main info address was accepted or rejected
    try {
      const accepted: string[] = info.accepted || [];
      const rejected: string[] = info.rejected || [];
      if (accepted.includes('info@reveliophotography.es')) {
        console.log('La dirección info@reveliophotography.es fue ACCEPTED por el servidor SMTP');
      } else if (rejected.includes('info@reveliophotography.es')) {
        console.warn('La dirección info@reveliophotography.es fue REJECTED por el servidor SMTP');
      } else {
        console.log('No hay confirmación explícita de aceptación/rechazo para info@reveliophotography.es (puede depender del proveedor)');
      }
    } catch (err) {
      console.error('Error al procesar accepted/rejected:', err);
    }
    
    return {
      success: true,
      message: "¡Gracias por vuestro mensaje! Me pondré en contacto con vosotros muy pronto.",
    };
  } catch (error: any) {
    console.error('=== ERROR DETALLADO DEL ENVÍO DE EMAIL ===');
    console.error('Tipo de error:', error.name);
    console.error('Mensaje de error:', error.message);
    console.error('Código de error:', error.code);
    console.error('Comando:', error.command);
    console.error('Respuesta del servidor:', error.response);
    
    if (error.code === 'EAUTH') {
      console.error('Error de autenticación - Verifica las credenciales');
    } else if (error.code === 'ESOCKET') {
      console.error('Error de conexión - Verifica la configuración del servidor SMTP');
    }
    
    console.error('Stack trace:', error.stack);
    
    return {
      success: false,
      message: `Error al enviar el mensaje: ${error.message || 'Error desconocido'}. Por favor, inténtalo de nuevo más tarde.`,
    };
  }
}