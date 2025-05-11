import { goToPage, logout, user } from '../index.js'
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    POSTS_PAGE,
    PROFILE_PAGE,
} from '../routes.js'

/**
 * Компонент заголовка страницы.
 * Этот компонент отображает шапку страницы с логотипом, кнопкой добавления постов/входа и кнопкой выхода (если пользователь авторизован).
 *
 * @param {HTMLElement} params.element - HTML-элемент, в который будет рендериться заголовок.
 * @returns {HTMLElement} Возвращает элемент заголовка после рендеринга.
 */
export function renderHeaderComponent({ element }) {
    /**
     * Рендерит содержимое заголовка.
     */
    element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
          user
              ? `<div title="Добавить пост" class="add-post-sign"></div>`
              : 'Войти'
      }
      </button>
      ${
          user
              ? `
              <div class="user-menu">
                  <button class="header-button profile-dropdown-button" title="${user.name}">
                      <span>${user.name}</span> ➤
                  </button>
                  <div class="dropdown-content">
                      <a href="${PROFILE_PAGE}" class="profile-link">Профиль пользователя</a>
                      <button class="logout-button">Выйти</button>
                  </div>
              </div>
              `
              : ''
      }  
  </div>
  `

    /**
     * Обработчик клика по кнопке "Добавить пост"/"Войти".
     * Если пользователь авторизован, перенаправляет на страницу добавления постов.
     * Если пользователь не авторизован, перенаправляет на страницу авторизации.
     */
    element
        .querySelector('.add-or-login-button')
        .addEventListener('click', () => {
            if (user) {
                goToPage(ADD_POSTS_PAGE)
            } else {
                goToPage(AUTH_PAGE)
            }
        })

    /**
     * Обработчик клика по логотипу.
     * Перенаправляет на страницу с постами.
     */
    element.querySelector('.logo').addEventListener('click', () => {
        goToPage(POSTS_PAGE)
    })

   // Обработчик наведения курсора на кнопку профиля.
const profileDropdownButton = element.querySelector('.profile-dropdown-button');
const dropdownContent = element.querySelector('.dropdown-content');

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

    // Обработчик клика по кнопке "Выйти".
    const logoutButton = dropdownContent
        ? dropdownContent.querySelector('.logout-button')
        : null
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const confirmLogout = confirm('Вы действительно хотите выйти?')
            if (confirmLogout) {
                logout()
            }
        })
    }

    // Закрытие выпадающего меню при клике вне его
    window.addEventListener('click', (event) => {
        if (
            profileDropdownButton &&
            dropdownContent &&
            !profileDropdownButton.contains(event.target) &&
            !dropdownContent.contains(event.target)
        ) {
            dropdownContent.classList.remove('show')
        }
    })

    return element
}
