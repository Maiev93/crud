import uuid from "uuid";
import ROUTES from "./api";
import DATABASE from "./db";

// POST api/users используется для создания записи о новом пользователе и сохранения ее в базе данных.
// Сервер должен ответить status code 201 и вновь созданной записью.
// Сервер должен ответить status code 400 и соответствующим сообщением, если запрос body не содержит обязательных полей.

// id— уникальный идентификатор ( string, uuid), сгенерированный на стороне сервера
// username— имя пользователя ( string, обязательно )
// age— возраст пользователя ( number, обязательно )
// hobbies— хобби пользователя ( arrayили stringsпусто array, обязательно )

export const handlerPost = function (request, response) {
const condition = Object.hasOwn(request.body, 'username') && Object.hasOwn(request.body, 'age') && Object.hasOwn(request.body, 'hobbies')
    
    if (condition) { request.body } 
}