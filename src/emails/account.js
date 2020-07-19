var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhishekt14898@gmail.com',
        pass: 'abhi123#'
    }
});

var mailOptions = {
    from: 'abhishekt14898@gmail.com',
    to: 'abhishekatholi@cet.ac.in',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {

    }
});