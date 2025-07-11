
import nodemailer from "nodemailer";
class Mailer {

    private transporter!: nodemailer.Transporter;
    constructor() {
        this.mailerConfiguration()
    }
    //regular class methods
    mailerConfiguration = () => {
        // this.transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 2525,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: "maddison53@ethereal.email",
        //         pass: "jn7jnAPss4f63QBp6D",
        //     },
        // });

        // Looking to send emails in production? Check out our Email API/SMTP product!
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b32cb06ba4670a",
                pass: "1137771c6859fe"
            }
        });


    }
    async sendEmail(verificationToken: string, email: string) {
        try {

            const info = await this.transporter.sendMail({
                from: 'rinshu679@gmail.com',
                to: email,
                subject: "Please verify your email",
                html: `<p><a href="http://localhost:${process.env.PORT}/auth/verifyemail?token=${verificationToken}">Click here</a> to ${"verify your email"}
                or copy and paste the link below in your browser. <br> http://localhost:${process.env.PORT}/auth/verifyemail?token=${verificationToken}
                </p>`
            });
           // console.log(info)
        }
        catch (ex) {
            if (ex instanceof Error) {

                console.log(ex.message)
                console.log(ex.name)
            }

        }
    }
}

export default Mailer

