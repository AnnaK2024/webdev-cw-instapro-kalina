
import { user } from '../index.js';

/**
 * Компонент страницы профиля пользователя.
 * Этот компонент отображает информацию о пользователе.
 *
 * @returns {HTMLElement} Возвращает элемент страницы профиля после рендеринга.
 */
export function renderProfilePage() {
    // Проверяем, авторизован ли пользователь
    if (!user) {
        // Если пользователь не авторизован, перенаправляем на страницу авторизации
        goToPage(AUTH_PAGE);
        return;
    }

    const profileElement = document.createElement('div');
    profileElement.className = 'profile-page';

    profileElement.innerHTML = `
        <h2>Профиль пользователя</h2>
        <div class="profile-info">
            <p><strong>Имя:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Посты:</strong></p>
            <ul>
                ${user.posts.map(post => `<li>${post.title}</li>`).join('')}
            </ul>
        </div>
        <button class="edit-profile-button">Редактировать профиль</button>
    `;

    // Обработчик клика по кнопке редактирования профиля
    profileElement.querySelector('.edit-profile-button').addEventListener('click', () => {
        // Здесь вы можете добавить логику для редактирования профиля
        alert('Редактирование профиля еще не реализовано.');
    });

    return profileElement;
}
