import { addLikePost, removeLikePost } from '../api.js'
import { delay } from '../helpers.js'
import { goToPage } from '../index.js'
import { AUTH_PAGE } from '../routes.js'

export const initLikeComponent = (
    renderPostsPageComponent,
    appEl,
    token,
    posts,
) => {
    const likesButtons = appEl.querySelectorAll('.like-button')

    likesButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', async (event) => {
            event.stopPropagation()

            const postId = likeButton.dataset.postId
            const isLiked = likeButton
                .querySelector('img')
                .src.includes('like-active.svg')

            if (!token) {
                alert('Необходимо авторизоваться')
                goToPage(AUTH_PAGE)
                return
            }

            // Добавляем класс анимации только для авторизованных пользователей
            likeButton.classList.add('-loading-like')

            // Функция задержки
            await delay(2000)

            try {
                const updatePost = isLiked
                    ? await removeLikePost({ token, postId })
                    : await addLikePost({ token, postId })

                updatePostInPosts(updatePost.post, posts)
                renderPostsPageComponent({ appEl, posts })
                renderModalLikesList(posts)
            } catch (error) {
                handleError(error)
            } finally {
                likeButton.classList.remove('-loading-like')
            }
        })
    })
}

const updatePostInPosts = (updatedPost, posts) => {
    const postIndex = posts.findIndex((post) => post.id === updatedPost.id)
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost
    }
}

const handleError = (error) => {
    console.error(error)
    if (error.response && error.response.status === 401) {
        alert('Сессия истекла. Пожалуйста, авторизуйтесь')
        goToPage(AUTH_PAGE)
    } else {
        alert('Произошла ошибка. Пожалуйста, попробуйте снова.')
    }
}

export const renderModalLikesList = (posts, isUserLikes = false) => {
    const likeCountsElements = document.querySelectorAll('.post-likes-count')

    // Общая функция для рендера списка лайкнувших
    const renderLikesList = (likesListElement, likesList) => {
        likesListElement.innerHTML = ''

        const userItems = likesList
            .map((likes) => {
                const userId = isUserLikes ? likes._id : likes.id
                const userName = likes.name
                const userImageUrl = isUserLikes ? likes.imageUrl : null

                const userPost = posts.find((post) => post.user.id === userId)

                if (!userPost && !userImageUrl) return null

                const userItem = document.createElement('div')
                userItem.classList.add('user-item')

                const userImage = document.createElement('img')
                userImage.src = userImageUrl || userPost.user.imageUrl
                userImage.classList.add('post-header__user-image')

                const userNameEl = document.createElement('p')
                userNameEl.textContent = userName

                userItem.appendChild(userImage)
                userItem.appendChild(userNameEl)

                return userItem
            })
            .filter((item) => item !== null)

        likesListElement.append(...userItems)
    }

    likeCountsElements.forEach((likeCountElement) => {
        likeCountElement.addEventListener('click', (event) => {
            event.stopPropagation()

            // Находим контейнер поста (например, ближайший родитель с классом 'post')
            const postElement = likeCountElement.closest('.post')
            if (!postElement) return

            // Теперь ищем модалку и элементы внутри этого поста
            const modalContainer = postElement.querySelector('.post-modal-container')
            const likesListElement = postElement.querySelector('.post-modal-list')
            const closeModalButton = postElement.querySelector('.button-close-modal')

            if (!modalContainer || !likesListElement || !closeModalButton) return

            // Получаем postId из data-атрибута
            const postId = likeCountElement.dataset.postId

            // Находим пост по ID
            const post = posts.find((post) => post.id === postId)
            if (!post) return

            // Получаем список лайков
            const likesList = post.likes

            // Рендерим список лайков в найденный элемент
            renderLikesList(likesListElement, likesList)

            // Показываем модальное окно
            modalContainer.style.display = 'flex'

            // Обработчик закрытия модалки
            closeModalButton.onclick = (e) => {
                e.stopPropagation()
                modalContainer.style.display = 'none'
            }
        })
    })
}
