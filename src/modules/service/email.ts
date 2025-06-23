// import { Resend } from 'resend';

// const resend = new Resend(process.env.API_KEY_RESEND);

// export async function enviarEmail(to: string, subject: string, text: string) {
//   try {
//     const response = await resend.emails.send({
//       from: process.env.EMAIL_FROM as string,
//       to,
//       subject,
//       text,
//     });

//     console.log('E-mail enviado:', response);
//     return response;
//   } catch (error) {
//     console.error('Erro ao enviar e-mail:', error);
//     throw error;
//   }
// }
