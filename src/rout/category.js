import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesErrors } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

const categoryTranslations = {
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
  army: "Армия",
  adults: "Взрослые",
  doctors: "Врачи",
  money: "Деньги",
  animals: "Животные",
  from: "Из жизни",
  movie: "Киногерои",
  computer: "Компьютер",
};

export async function getCategory(req, res, usersdb, storiesdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      console.log('req.params.category', req.params.category)
      let category = req.params.category;
      let stories = await storiesdb
        .find({
          category: category,
          status: messagesSusses.success.messageApproved,
        })
        .toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map(
            (cat) => categoryTranslations[cat]
          );
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
        story.category = Array.isArray(story.category)
          ? story.category
          : [story.category];
      });
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let role = user ? user.role : null;
      res.render("main", {
        stories: stories,
        selectedCategories: categoryTranslations[req.params.category],
        categoryTranslations: categoryTranslations,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: role,
        title: messagesSusses.success.titleCategory + category,
      });
    } else {
      let category = req.params.category;
      let stories = await storiesdb
        .find({
          category: category,
          status: messagesSusses.success.messageApproved,
        })
        .toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map(
            (cat) => categoryTranslations[cat]
          );
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
        story.category = Array.isArray(story.category)
          ? story.category
          : [story.category];
      });
      res.render("main", {
        categoryTranslations: categoryTranslations,
        stories: stories,
        title: messagesSusses.success.titleCategory + category,
      });
    }
  } catch (error) {
    console.error(messagesErrors.errors.getCategoryError, error);
  }
}
