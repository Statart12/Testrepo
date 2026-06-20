/**
 * Netlify Function - Send Case Notification Email
 * Sends email notification when a case is matched to a lawyer
 */
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { lawyerEmail, lawyerName, clientName, caseType } = JSON.parse(event.body);

    // Validate required fields
    if (!lawyerEmail || !lawyerName || !clientName || !caseType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // 
    // const msg = {
    //   to: lawyerEmail,
    //   from: process.env.SENDER_EMAIL,
    //   subject: `New Case Matched: ${caseType}`,
    //   html: `
    //     <h2>New Case Matched!</h2>
    //     <p>Hi ${lawyerName},</p>
    //     <p>A new ${caseType} case from ${clientName} has been matched to you.</p>
    //     <p>Log in to your dashboard to view the case details.</p>
    //   `,
    // };
    //
    // await sgMail.send(msg);

    console.log(`Notification would be sent to ${lawyerEmail}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Notification queued successfully',
        sent_to: lawyerEmail,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notification' }),
    };
  }
};
