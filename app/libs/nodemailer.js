const nodemailer = require('nodemailer');

//async function main(email,password){

    
    
    
  
    let sendMailer=(data,cb)=>{

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: 'mssgsrvc@gmail.com',
          pass: '1234golu'
        }
      });

        transporter.sendMail(data, function (err, info) {
        if(err)
         cb(err,null)
        else
          cb(null,info)
     });
    }


    // send mail with defined transport object
  /*  let info = await transporter.sendMail({
        from: 'noreply@trainingportal.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        //text: "Hello world hi how are you", // plain text body
        html: "<b>Your password request granted.</b><br><p>Login with this password :"+password, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let sendMail=(email,password)=>{
    main(email,password).catch(console.error);
}*/



/* let sendMail = (email, password) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'valerie.torp16@ethereal.email',
            pass: 'tWRx7rwtd8c8ZAP8YY'
        }
    });
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?" + password, // plain text body
        html: "<b>Hello world?</b>" // html body
    });


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}*/

module.exports={
  sendMailer:sendMailer
}




