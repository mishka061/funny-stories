import { ObjectId } from "mongodb";
import { getTokenAndCookie } from "./token.js";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getRemoveStory(req, res, usersdb, storiesdb){
  try {
    const { login, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
      login: login,
    });
    if (user && tokenIsPresent) {
      let id = req.params.id;
      await storiesdb.deleteOne({ _id: new ObjectId(id) });
     console.log(messagesSusses.success.deletingTest);
      res.redirect(`/profile`);
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getRemoveStoryError);
    res.status(500).send(messagesSusses.success.internalServerError);
  }
}
