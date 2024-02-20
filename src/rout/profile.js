import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

const categoryTranslations = {
  army: "Армия",
  adults: "Взрослые",
  doctors: "Врачи",
  money: "Деньги",
  animals: "Животные",
  from: "Из жизни",
  movie: "Киногерои",
  computer: "Компьютер",
  crime: "Криминал",
  rzhevsky: "Ржевский",
  family: "Семейные",
  fabulous: "Сказочные",
  social: "Соцсети",
  sport: "Спорт",
  students: "Студенты",
  transport: "Транспорт",
  humor: "Черный юмор",
  school: "Школа",
};

export async function getProfile(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
  
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let stories = await storiesdb.find({ userId: userId }).toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map((cat) => categoryTranslations[cat]);
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
      });
      res.render("profile", {
        stories: stories,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messagesSusses.success.titleProfile
      });
    } else {
      let stories = await storiesdb.find().toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map((cat) => categoryTranslations[cat]);
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
      });
      res.render("profile", {
        stories: stories,
        title: messagesSusses.success.titleProfile
      });
    }
  } catch (error) {
    console.error(messagesErrors.errors.getProfileError, error);
  }
}

export async function postSubmitModerationStory(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      await storiesdb.updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { status: messagesSusses.success.messageWaiting } }
      );

      let stories = await storiesdb.find({ userId: userId }).toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map((cat) => categoryTranslations[cat]);
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
      });
      res.render("profile", {
        stories: stories,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
      });
    } else {
      console.error(messagesErrors.errors.tokenVerificationError);
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(err, messagesErrors.errors.postSubmitModerationStoryError);
    res.redirect("/registration");
  }
}

