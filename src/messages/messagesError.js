export const messagesErrors = {
  errors: {
    registrationError: "Регистрация не выполнена",
    postRegistrationError: "Ошибка в функции postRegistration",
    getRegistrationError: "Ошибка в функции getRegistration",
    getAuthorisationError: "Авторизация не выполнена",
    postAuthorizationError: "Ошибка в функции postAuthorization",
    internalServerError: "Внутренняя ошибка сервера",
    getAddStoryError: "Ошибка в функции getAddStory",
    getRemoveStoryError: "Ошибка в функции getRemoveStory",
    postAddStoryError: "Ошибка в функции postAddStory",
    textError: "Нельзя добавить пустую строку",
    loginEndEmailError:
      "Пользователь с таким логином и электронной почтой уже существует",
    emailEndLoginlNotFoundError:
      "Пользователь с такой почтой или паролем не найден",
    notLoginError: "Пользователь с таким логином уже существует",
    notEmailError: "Пользователь с такой электронной почтой уже существует",
    getCategoryError: "Ошибка в функции getCategory",
    getMainError: "Ошибка в функции getMain",
    getProfileError: "Ошибка в функции getProfile",
    userNotDefined: "Пользователь не определен",
    tokenVerificationError: "Ошибка при верификации токена",
    postSubmitModerationStoryError:
      "Ошибка в функции postSubmitModerationStory",
    tokenAndCookieError: "Ошибка в функции tokenAndCookie",
    getProfileAdministratorError: "Ошибка в функции getProfileAdministrator",
    postProfileAdminApprovedError: "Ошибка в функции postProfileAdminApproved",
    postAdminRejectError: "Ошибка в функции postAdminReject",
    deletingTest: "Запись удалена из базы данных",
    mongodbError: "Нет соединения с базой данных",
    titleError: "Страница не существует",
  },
};

console.log("messages.js has been imported");
