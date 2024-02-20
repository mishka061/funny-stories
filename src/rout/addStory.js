import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getAddStory(req, res, usersdb) {
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
      res.render("addStory", {
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        userId: userId,
        title: messagesSusses.success.titleCreateStory,
      });
    } else {
      res.redirect("/registration");
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

export async function postAddStory(req, res, usersdb, storiesdb) {
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
      let { text, category, status } = req.body;
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

        await storiesdb.insertOne(form);
        res.redirect("/");
      } else {
        res.render("addStory", {
          textError: messagesErrors.errors.textError,
          title: messagesSusses.success.titleCreateStory,
        });
      }
    } else {
      res.redirect("/registration");
    }
  } catch (error) {
    console.error(messagesErrors.errors.postAddStoryError, error);
    res.status(500).send(messagesErrors.errors.internalServerError);
  }
}
