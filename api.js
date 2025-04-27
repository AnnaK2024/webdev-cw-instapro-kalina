// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = 'kalina'
const baseHost = 'https://wedev-api.sky.pro'
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`

export let token = ''
export const setToken = (newToken) => {
    token = newToken
}

export function getPosts({ token }) {
    return fetch(postsHost, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации')
            }

            return response.json()
        })
        .then((data) => {
            return data.posts
        })
}

export function registerUser({ login, password, name, imageUrl }) {
    return fetch(baseHost + '/api/user', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Такой пользователь уже существует')
        }
        return response.json()
    })
}

export function loginUser({ login, password }) {
    return fetch(baseHost + '/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный логин или пароль')
        }
        return response.json()
    })
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
    const data = new FormData()
    data.append('file', file)

    return fetch(baseHost + '/api/upload/image', {
        method: 'POST',
        body: data,
    }).then((response) => {
        return response.json()
    })
}

export const addPost = ({ description, imageUrl }) => {
    return fetch(postsHost, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`, // Если требуется авторизация
        },
        body: JSON.stringify({ description, imageUrl }), // Отправляем данные поста
    }).then((response) => {
        if (!response.ok) {
            throw new Error(
                'Ошибка при добавлении поста: ' + response.statusText,
            )
        }
        return response.json() // Возвращаем данные о новом посте
    })
}
