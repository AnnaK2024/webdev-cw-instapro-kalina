import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { posts, goToPage } from '../index.js'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { clearingHtml } from '../helpers.js'

export function renderPostsPageComponent({ appEl }) {
    const postsHtml = posts
        .map((post, index) => {
            const createdPostDate = post.createdAt

            const result = formatDistanceToNow(createdPostDate, {
                addSuffix: true,
                locale: ru,
            })

            let likeButtonImg = post.isLiked
                ? '<img src="./assets/images/like-active.svg"></img>'
                : '<img src="./assets/images/like-not-active.svg"></img>'

            let likeCountText

            if (post.likes.length === 0) {
                likeCountText = '0'
            } else if (post.likes.length === 1) {
                likeCountText = `${clearingHtml(post.likes[0].name)}`
            } else if (post.likes.length === 2) {
                likeCountText = `${clearingHtml(post.likes[0].name)} и еще 1`
            } else {
                likeCountText = `${post.likes.length}`
            }
            return `<li class="post" data-post-index="${index}"> 
                    <div class="post-header" data-user-id="${post.user.id}">
                        <div class="post-header__user-data">
                            <img src="${post.user.imageUrl}" class="post-header__user-image">
                            <p class="post-header__user-name">${clearingHtml(post.user.name)}</p>
                        </div>
                        <div>
                            <button data-post-id="${post.id}" class="header-button delete-post-button">удалить пост</button>
                        </div>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                      ${likeButtonImg}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong class="post-likes-count">${likeCountText}</strong>
                      </p>
                      <div class="post-modal-container" style="display: none">
                        <div class="post-modal-content">
                            <p class="post-modal-header">Пользователи, которым понравился пост</p>
                            <span class="button-close-modal">&times;</span>
                        </div>
                        <div class="post-modal-list"></div>
                      </div>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${clearingHtml(post.user.name)}</span>
                      ${clearingHtml(post.description)}
                    </p>
                    <p class="post-date">
                      ${result}
                    </p>
                  </li>`
        })
        .join('')

    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`

    appEl.innerHTML = appHtml

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    })

    for (let userEl of document.querySelectorAll('.post-header')) {
        userEl.addEventListener('click', () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            })
        })
    }
}
