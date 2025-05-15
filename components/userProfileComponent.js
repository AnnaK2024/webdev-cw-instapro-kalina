export function renderUserProfile(element) {
    if (!element) {
        console.error('Элемент для рендеринга не был передан или не найден.')
        return // Выходим из функции, если элемент не существует
    }

    const profileContainer = `
    <div class="profile-container" id="profile">
        <h1>Профиль пользователя</h1>
        <div class="profile-image">
            <img id="userImage" src="default-avatar.png" alt="Avatar" aria-label="Аватар пользователя" />
            <input type="file" id="imageUpload" accept="image/*" aria-label="Загрузить изображение" />
        </div>
        <div class="password-change">
            <h2>Сменить пароль</h2>
            <input type="password" id="oldPassword" placeholder="Старый пароль" required aria-label="Старый пароль" />
            <input type="password" id="newPassword" placeholder="Новый пароль" required aria-label="Новый пароль" />
            <button id="changePasswordButton">Сменить пароль</button>
        </div>
    </div>
  `

    element.innerHTML = profileContainer

    // Добавление обработчика события для кнопки смены пароля
    const changePasswordButton = document.getElementById('changePasswordButton')
    changePasswordButton.addEventListener('click', () => {
        const oldPassword = document.getElementById('oldPassword').value
        const newPassword = document.getElementById('newPassword').value

        // Реализация логики смены пароля здесь
        console.log('Старый пароль:', oldPassword)
        console.log('Новый пароль:', newPassword)
        // Здесь можно добавить валидацию и вызовы API по мере необходимости
    })

    // Добавление обработчика события для загрузки изображения
    const imageUpload = document.getElementById('imageUpload')
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                document.getElementById('userImage').src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })

    return element
}
