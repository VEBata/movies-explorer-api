const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const applicationStartMsg = 'Приложение запущено, порт:';
const connectedDbMsg = 'Подключен к БД.';
const invalidLoginOrPasswordMsg = 'Неверный логин или пароль.';
const authRequiredMsg = 'Необходима авторизация.';
const serverErrorMsg = 'На сервере произошла ошибка:';
const pageNotFoundMsg = 'Запрашиваемая страница не существует.';
const incorrectDataMovieMsg = 'Переданы некорректные данные фильма.';
const impossibleDeleteSomeoneMovieMsg = 'Вы не можете удалять фильмы другого пользователя.';
const movieNotFoundMsg = 'Фильм с указанным _id не найден.';
const incorrectDataDeleteMovieMsg = 'Переданы некорректные данные для удаления фильма.';
const incorrectDataUserMsg = 'Переданы некорректные данные пользователя.';
const userNotFoundMsg = 'Пользователь с указанным _id не найден.';
const userAlreadyExistsMsg = 'Пользователь с таким email уже существует.';

module.exports = {
  urlRegExp,
  applicationStartMsg,
  connectedDbMsg,
  invalidLoginOrPasswordMsg,
  authRequiredMsg,
  serverErrorMsg,
  pageNotFoundMsg,
  incorrectDataMovieMsg,
  impossibleDeleteSomeoneMovieMsg,
  movieNotFoundMsg,
  incorrectDataDeleteMovieMsg,
  incorrectDataUserMsg,
  userNotFoundMsg,
  userAlreadyExistsMsg,
};
