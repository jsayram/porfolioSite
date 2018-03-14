const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET api listing. */
router.get('/', (req, res) => {
  res.render('index.html');
});

router.post('/send', (req, res) =>{  
    // console.log(req.body
    const output =
    `
    <h3> Contact Details </h3>
    <ul> 
        <li>${req.body.value.name}</li>
        <li>${req.body.value.email}</li>
        <li>${req.body.value.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.value.message}</p>
    `;
   
   // THIS IS THE NODEMAILER STUFF
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joseramirezporfolio@gmail.com', // generated ethereal user
            pass: 'Ramirez123' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"New Contact From Portfolio" <joseramirezporfolio@gmail.com>', // sender address
        to: 'joseramirezporfolio@gmail.com', // list of receivers
        subject: 'Sent Form Portfolio Site', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        //when the form is submitted
        res.render('/api/contacts/',{msg:'EMAIL HAS BEEN SENT'}); 
        console.log('EMAIL WAS SENT')

    });

});


module.exports = router;