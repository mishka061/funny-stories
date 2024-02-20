import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getProfileAdministrator(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);

    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let stories = await storiesdb
        .find({ status: messagesSusses.success.messageWaiting })
        .toArray();
      res.render("profileAdministrator", {
        stories: stories,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messagesSusses.success.titleProfileAdministrator,
      });
    } else {
      console.error(messagesErrors.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.getProfileAdministratorError);
    res.redirect("/registration");
  }
}

export async function postProfileAdminApproved(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);

    if (tokenInfo) {
      const { userId } = tokenInfo;

      await storiesdb.updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { status: messagesSusses.success.messageApproved } }
      );

      await storiesdb.find({ userId: userId }).toArray();

      res.redirect("/profile/Administrator");
    } else {
      console.error(messagesErrors.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.postProfileAdminApprovedError);
    res.redirect("/registration");
  }
}

export async function postAdminReject(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);

    if (tokenInfo) {
      let existingStory = await storiesdb.findOne({
        _id: new ObjectId(req.body.id),
      });
      if (existingStory) {
        await storiesdb.updateOne(
          { _id: new ObjectId(req.body.id) },
          {
            $set: {
              status: messagesSusses.success.messageDraft,
              rejectComment: req.body.rejectComment,
            },
          }
        );
      }
      res.redirect("/profile/Administrator");
    } else {
      console.error(messagesErrors.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.log(err,messagesErrors.errors.postAdminRejectError);
    res.redirect("/registration");
  }
}
