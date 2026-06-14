import nodemailer from 'nodemailer';

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }, 
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: '"Open Job Apps" <openjob@mail.com>',
            to: targetEmail,
            subject: `New Application Received for ${content.job_title} Position`,
            text:  `Hello,

You have received a new application for your job posting.

Job Title: ${content.job_title}
Applicant Name: ${content.applicant_name}
Applicant Email: ${content.applicant_email}
Applied At: ${
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(content.applied_at))
}

The applicant has submitted their application and is awaiting your review.

You can view the application details and manage candidates through your employer dashboard.

Thank you for using OpenJob.

Best regards,
OpenJob Team`,
        };
        
        return this._transporter.sendMail(message);
    }
}

export default MailSender;