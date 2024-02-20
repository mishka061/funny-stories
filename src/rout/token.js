import jwt from "jsonwebtoken";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

let secretKey = "12345";
export default secretKey;

export async function getTokenAndCookie(req) {
  try {
    let tokenIsPresent = req.cookies.token ? true : false;
    let decoded, login, userId;
    if (tokenIsPresent) {
      decoded = jwt.verify(req.cookies.token, secretKey);
      login = decoded.login;
      userId = decoded.userId;
      console.log(messagesSusses.success.successfulToken);
      return { decoded, login, tokenIsPresent, userId };
    } else {
      console.error(messagesErrors.errors.tokenVerificationError);
    }
  } catch (error) {
    console.log(error, messagesErrors.errors.tokenAndCookieError);
  }
}
