import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { goToPage } from '../index.js'
import { formatDistanceToNow } from 'date-fns'

export async function renderPostsPageComponent({ appEl }) {
    console.log('Получение постов из API...')

    try {
        // Получение постов из API
        const response = await fetch('https://your-api-endpoint.com/posts') // Замените на ваш API-эндпоинт
        if (!response.ok) {
            throw new Error('Сетевая ошибка')
        }

        const posts = await response.json() // Предполагается, что API возвращает JSON-массив постов
        console.log('Полученные посты:', posts)

        const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          ${posts
              .map(
                  (post) => `
          <li class="post">
            <div class="post-header" data-user-id="${post.userId}">
                <img src="${post.userImage}" class="post-header__user-image">
                <p class="post-header__user-name">${post.userName}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.image}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
                <img src="${post.liked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.userName}</span>
              ${post.text}
            </p>
            <p class="post-date">
              ${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} назад
            </p>
          </li>
          `,
              )
              .join('')}
        </ul>
      </div>`

        appEl.innerHTML = appHtml

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        })

        // Добавление обработчиков событий для кликов по заголовкам пользователей
        for (let userEl of document.querySelectorAll('.post-header')) {
            userEl.addEventListener('click', () => {
                goToPage(USER_POSTS_PAGE, {
                    userId: userEl.dataset.userId,
                })
            })
        }
    } catch (error) {
        console.error('Ошибка при получении постов:', error)
        appEl.innerHTML = `<p>Ошибка загрузки постов: ${error.message}</p>`
    }
}
