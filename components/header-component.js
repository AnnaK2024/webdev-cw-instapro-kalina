import { goToPage, logout, user } from '../index.js';
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    POSTS_PAGE,
} from '../routes.js';
import { greet } from './userProfileComponent.js';

/**
 * Компонент заголовка страницы.
 * Этот компонент отображает шапку страницы с логотипом, кнопкой добавления постов/входа и кнопкой выхода (если пользователь авторизован).
 *
 * @param {HTMLElement} params.element - HTML-элемент, в который будет рендериться заголовок.
 * @returns {HTMLElement} Возвращает элемент заголовка после рендеринга.
 */
export function renderHeaderComponent({ element }) {
    element.innerHTML = `
        <div class="page-header">
            <h1 class="logo">instapro</h1>
            <button class="header-button add-or-login-button">
                ${user ? `<div title="Добавить пост" class="add-post-sign"></div>` : 'Войти'}
            </button>
            ${user ? `
                <div class="user-menu">
                    <button class="header-button profile-dropdown-button" title="${user.name}">
                        <span>${user.name}</span> ➤
                    </button>
                    <div class="dropdown-content">
                        <button class="profile-button">Профиль пользователя</a>
                        <button class="logout-button">Выйти</button>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    const addOrLoginButton = element.querySelector('.add-or-login-button');
    const logo = element.querySelector('.logo');
    const profileDropdownButton = element.querySelector('.profile-dropdown-button');
    const dropdownContent = element.querySelector('.dropdown-content');
    const logoutButton = dropdownContent?.querySelector('.logout-button');
    const userProfileButton = document.getElementById('.profile-button');

    addOrLoginButton.addEventListener('click', () => {
        goToPage(user ? ADD_POSTS_PAGE : AUTH_PAGE);
    });

    logo.addEventListener('click', () => {
        goToPage(POSTS_PAGE);
    });

    if (profileDropdownButton) {
        profileDropdownButton.addEventListener('mouseenter', () => {
            dropdownContent.classList.add('show');
        });

        profileDropdownButton.addEventListener('mouseleave', () => {
            dropdownContent.classList.remove('show');
        });

        dropdownContent.addEventListener('mouseenter', () => {
            dropdownContent.classList.add('show');
        });

        dropdownContent.addEventListener('mouseleave', () => {
            dropdownContent.classList.remove('show');
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (confirm('Вы действительно хотите выйти?')) {
                logout();
            }
        });
    }

    if (userProfileButton) {
        userProfileButton.addEventListener('click', (event) => {
            console.log(click)
            event.preventDefault();
            greet()
            
        });
    }

    return element;
}
