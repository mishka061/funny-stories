import express from "express";
import expressHandlebars from "express-handlebars";
import __dirname from "./__dirname.js";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from 'path';
import { getRegistration, postRegistration } from "./src/rout/registration.js";
import { getAuthorisation, postAuthorisation } from "./src/rout/authorization.js";
import { getMain } from "./src/rout/main.js";
import { messagesErrors } from "./src/messages/messagesError.js";
import { getAddStory, postAddStory } from "./src/rout/addStory.js";
import { getCategory } from "./src/rout/category.js";
import { getProfile, postSubmitModerationStory } from "./src/rout/profile.js";
import { getEditStory, postEditStory } from "./src/rout/edit.js";
import { getRemoveStory } from "./src/rout/removeStory.js";
import {
  getProfileAdministrator,
  postProfileAdminApproved,
  postAdminReject,
} from "./src/rout/profileAdministrator.js";

const handlebars = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  layoutsDir: path.join(__dirname, "/src/views/layouts/"),
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
    eq: function (arg1, arg2) {
      return arg1 === arg2;
    },
    isArray: function (value, options) {
      return Array.isArray(value) ? options.fn(this) : options.inverse(this);
    },
  },
});

let app = express();
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs"); 
app.set("views", path.join(__dirname, "/src/views/")); 



app.use(express.static(__dirname + "/dist/"));
app.use(express.static(__dirname + "/dist/images/"));


// app.use(express.static(__dirname + "/public/"));
// app.use(express.static(__dirname + "/public/js/"));
// app.use(express.static(__dirname + "/public/styles/"));
// app.use(express.static(__dirname + "/public/images/"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let mongoClient = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

try {
  let mongo = await mongoClient.connect();
  let db = mongo.db("funny-stories");
  let usersdb = db.collection("users");
  let storiesdb = db.collection("stories");
  let usersCount = await usersdb.countDocuments();
  let storiesCount = await storiesdb.countDocuments();

  console.log(`Количество пользователей в коллекции: ${usersCount}`);
  console.log(`Количество историй в коллекции: ${storiesCount}`);
  app.get("/", async function (req, res) {
    await getMain(req, res, usersdb, storiesdb);
  });

  app.get("/registration", async function (req, res) {
    await getRegistration(req, res);
  });

  app.post("/registration", async function (req, res) {
    await postRegistration(req, res, usersdb);
  });
  app.get("/authorization", async function (req, res) {
    await getAuthorisation(req, res, usersdb);
  });

  app.post("/authorization", async function (req, res) {
    await postAuthorisation(req, res, usersdb);
  });

  app.get("/addStory", async function (req, res) {
    await getAddStory(req, res, usersdb);
  });
  app.post("/addStory", async function (req, res) {
    await postAddStory(req, res, usersdb, storiesdb);
  });
  app.get("/edit/:id", async function (req, res) {
    await getEditStory(req, res, usersdb, storiesdb);
  });
  app.post("/edit/:id", async function (req, res) {
    await postEditStory(req, res, usersdb, storiesdb);
  });

  app.get("/category/:category", async function (req, res) {
    await getCategory(req, res, usersdb, storiesdb);
  });
  app.get("/profile", async function (req, res) {
    await getProfile(req, res, usersdb, storiesdb);
  });
  app.post("/profile", async function (req, res) {
    await postSubmitModerationStory(req, res, usersdb, storiesdb);
  });
  app.get("/remove/:id", async function (req, res) {
    await getRemoveStory(req, res, usersdb, storiesdb);
  });

  app.get("/profile/Administrator", async function (req, res) {
    await getProfileAdministrator(req, res, usersdb, storiesdb);
  });
  app.post("/profile/Administrator", async function (req, res) {
    const action = req.body.action;
    if (action === "AdminApproved") {
      await postProfileAdminApproved(req, res, usersdb, storiesdb);
    } else if (action === "AdminReject") {
      await postAdminReject(req, res, usersdb, storiesdb);
    }
  });
} catch (err) {
  console.error(err, messagesErrors.errors.mongodbError);
}

app.use(function (req, res) {
  res.status(404).render("404", {
    layout: "404",
    title: messagesErrors.errors.titleError,
  });
});

app.listen(3000, function () {
  console.log("running");
});




