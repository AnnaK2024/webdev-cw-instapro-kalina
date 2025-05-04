export function saveUserToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user))
}

export function getUserFromLocalStorage(user) {
    try {
        return JSON.parse(window.localStorage.getItem('user'))
    } catch (error) {
        return null
    }
}

export function removeUserFromLocalStorage(user) {
    window.localStorage.removeItem('user')
}

export function clearingHtml(unsafe) {
    const clearingTag = unsafe.replace(/<[^>]*>/g, '')
    const clearingChars = clearingTag
        .replace(/&lt;/g, '')
        .replace(/\//g, '')
        .replace(/b&gt;/g, '')
        .replace(/&/g, '')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')

    return clearingChars.trim().replace(/\s+/g, ' ')
}

// Функция для добавления обработчика клика на все изображения
export const addImageClickListener = () => {
    const images = document.querySelectorAll('img') // Находим все изображения на странице
    images.forEach((img) => {
        img.style.cursor = 'pointer' // Устанавливаем курсор указателя
        img.addEventListener('click', (event) => {
            event.stopPropagation()
            window.open(img.src, '_blank') // Открываем изображение в новой вкладке
        })
    })
}
