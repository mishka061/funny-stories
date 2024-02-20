import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getRegistration(req, res) {
  try {
    res.render("registration", {
      layout: "registration",
      title: messagesSusses.success.titleRegistration,
    });
  } catch (error) {
    console.error(error, messagesSusses.errors.getRegistrationError);
  }
}
export async function postRegistration(req, res, usersdb) {
  try {
    let { login, email, password , visibility} = req.body;
    if (req.body.submit) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const existingEmail = await usersdb.findOne({ email: email });
      const existingLogin = await usersdb.findOne({ login: login });
      if(existingEmail && existingLogin){
        let errorLoginEndEmail = messagesErrors.errors.loginEndEmailError;
        res.render('registration', {
          layout: 'registration',
          title: messagesSusses.success.titleRegistration,
          errorLoginEndEmail: errorLoginEndEmail
        });
      }else if (existingEmail || existingLogin) {
        let errorEmail = messagesErrors.errors.notEmailError;
        let errorLogin = messagesErrors.errors.notLoginError
        res.render('registration', {
          layout: 'registration',
          title: messagesSusses.success.titleRegistration,
          errorEmail: existingEmail ? errorEmail : '',
          errorLogin: existingLogin ? errorLogin : '',
        });
      }else {
        let user = {
          login: login,
          email: email,
          role: visibility,
          password: hashedPassword,
        };
        await usersdb.insertOne(user);
        res.redirect("/authorization");
        console.log(messagesSusses.success.successfulRegistration);
      }
    } else {
      console.error(messagesErrors.errors.registrationError);
    }
  } catch (error) {
    console.error(error, messagesErrors.errors.postRegistrationError);
  }
}


  