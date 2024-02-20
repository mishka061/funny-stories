import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getEditStory(req, res, usersdb , storiesdb) {
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
      let stories = await storiesdb.findOne({_id: new ObjectId(req.params.id)})
      res.render("edit", {
        stories: stories,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        userId: userId,
        title: messagesSusses.success.titleCreateStory,
      });
    } else {
      res.redirect("/registration");
      console.error(messagesSusses.errors.userNotDefined)
    }
  } catch (err) {
    console.error(messagesErrors.errors.getAddStoryError, err);
    res.status(500).send(messagesErrors.errors.internalServerError);
  }
}

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

export async function postEditStory(req, res, usersdb, storiesdb) {
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
      let {id, text, category, status } = req.body;
      
      let date = new Date();
      let datePublication =
        addZero(date.getFullYear()) +
        "-" +
        addZero(date.getMonth() + 1) +
        "-" +
        addZero(date.getDate());

      if (text !== "") {
        let form = {
          text: text,
          category: category,
          status: status,
          login: login,
          userId: userId,
          datePublication: datePublication,
        };
        
        await storiesdb.updateOne({ _id: new ObjectId(id) },{$set:form});
        res.redirect("/");
      } else {
        res.render("edit", {
          textError: messagesErrors.errors.textError,
          title: messagesSusses.success.titleCreateStory,
        });
      }
    } else {
      res.redirect("/registration");
      console.error(messagesErrors.errors.userNotDefined)
    }
  } catch (error) {
    console.error(messagesErrors.errors.postAddStoryError, error);
    res.status(500).send(messagesErrors.errors.internalServerError);
  }
}











