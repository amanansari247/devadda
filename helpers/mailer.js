import nodemailer from 'nodemailer'
import User from '@/models/useModel'
import bcryptjs from 'bcryptjs'

export const sendemail = async ({email,emailtype,userId})=>{
    try {
        const hashedtoken = await bcryptjs.hash(userId.toString(), 10)
        
        

       if(emailtype==='VERIFY'){
        await User.findByIdAndUpdate(userId,{
            verifyToken:hashedtoken,
            verifyTokenExpiry:Date.now() + 3600000
        } , {new:true, runValidators:true})
       }
       else if(emailtype==='RESET'){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedtoken,
            forgotPasswordTokenExpiry:Date.now() + 3600000
        } , {new:true, runValidators:true})
       }
       const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreply.pgdost@gmail.com',
          pass: 'mdmqfmthffantqoc', // Use the app password generated in Step 1
        },
      });

      const responseEmail = await transporter.sendMail({
        from : 'noreply.pgdost@gmail.com',
        to : email,
        subject: emailtype === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
        html: `<p>Click <a href="${process.env.domain}/${emailtype=== 'VERIFY' ? 'verifyemail':'resetpassword'}?token=${hashedtoken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/${emailtype=== 'VERIFY' ? 'verifyemail':'resetpassword'}?token=${hashedtoken}
            </p>`
      })
     ;
        return responseEmail;

        
    } catch (error) {
        throw new Error(error.message)
    }

}