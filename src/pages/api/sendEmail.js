const nodemailer = require('nodemailer');

export default function handler(req, res) {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "info.bottak@gmail.com",
            pass: "jfqt lhab kpwz lmza",
        },
    });

    async function handlerSendEmail() {
        try {
            await transporter.sendMail({
                from: req.body.correo,
                to: "info.bottak@gmail.com",
                subject: `${req.body.correo} : ${req.body.referencia}`,
                // text: req.body.mensaje,
                html: `<div>
                 <p style="font-weight: bold; text-align: center; text-transform:uppercase">${req.body.referencia}</p>
                 <br/>
                <p><span style="font-weight: bold">De: ${req.body.nombre}</span> ${req.body.nombre}</p>
                <p><span style="font-weight: bold">Correo:</span>  ${req.body.correo}</p>
                <br/>
                <p><span style="font-weight: bold">Mensaje: </span> ${req.body.mensaje}</p>
                </div>`,
            });
            return res.json({ msg: 'Send Email SuccessFull' })
        } catch (err) {
            console.log(err)
            return res.json({ msg: `error ${err}` })
        }
    }

    handlerSendEmail()
}