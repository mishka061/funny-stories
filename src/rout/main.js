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

export async function getMain(req, res, usersdb, storiesdb) {
  console.log('getMain')
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const {userId,login, tokenIsPresent } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let stories = await storiesdb
        .find({ status: messagesSusses.success.messageApproved })
        .toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map(
            (cat) => categoryTranslations[cat]
          );
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
      });
  
      let role = user ? user.role : null;
      let activeUser = await getactiveUser(usersdb, storiesdb);
    
      activeUser.sort((a, b) => b.publicationCount - a.publicationCount);
      const topUsers = activeUser.slice(0, 10);
      res.render("main", {
        activeUsers: topUsers,
        stories: stories,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: role,
        title: messagesSusses.success.titleHome,
      });
    } else {
      let stories = await storiesdb
        .find({ status: messagesSusses.success.messageApproved })
        .toArray();
      stories.forEach((story) => {
        if (Array.isArray(story.category)) {
          story.categoryElem = story.category.map(
            (cat) => categoryTranslations[cat]
          );
        } else {
          story.categoryElem = categoryTranslations[story.category];
        }
      });
      res.render("main", {
        stories: stories,
        title: messagesSusses.success.titleHome,
      });
    }
    } catch (error) {
    console.error(messagesErrors.errors.getMainError, error);
  }
}

async function getactiveUser(usersdb, storiesdb) {
  const users = await usersdb.find().toArray();
  const activeUser = users.map(async (user) => {
    const publicationCount = await storiesdb.countDocuments({
      userId: user._id.toString(),
    });
    return {
      ...user,
      publicationCount,
    };
  });

  return Promise.all(activeUser);
}
