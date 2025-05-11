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
    const likesButtons = appEl.querySelectorAll('.like-button');

    likesButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', async (event) => {
            event.stopPropagation();

            const postId = likeButton.dataset.postId;
            const isLiked = likeButton.querySelector('img').src.includes('like-active.svg');

            if (!token) {
                alert('Необходимо авторизоваться');
                goToPage(AUTH_PAGE);
                return;
            }

            // Добавляем класс анимации только для авторизованных пользователей
            likeButton.classList.add('-loading-like');

            // Функция задержки
            await delay(2000);

            try {
                const updatePost = isLiked 
                    ? await removeLikePost({ token, postId }) 
                    : await addLikePost({ token, postId });

                updatePostInPosts(updatePost.post, posts);
                renderPostsPageComponent({ appEl, posts });
            } catch (error) {
                handleError(error);
            } finally {
                likeButton.classList.remove('-loading-like');
            }
        });
    });
};

const updatePostInPosts = (updatedPost, posts) => {
    const postIndex = posts.findIndex((post) => post.id === updatedPost.id);
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
    }
};

const handleError = (error) => {
    console.error(error);
    if (error.response && error.response.status === 401) {
        alert('Сессия истекла. Пожалуйста, авторизуйтесь');
        goToPage(AUTH_PAGE);
    } else {
        alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
};


export const renderModalLikesList = (posts) => {
    const likeCountsElements = document.querySelectorAll('.post-likes-count')
    const modalContainer = document.querySelector('.post-modal-container')
    const likesListElement = document.querySelector('.post-modal-list')
    const closeModalButton = document.querySelector('.button-close-modal')

    function renderLikesList(likesList) {
        likesListElement.innerHTML = ''
        likesList.forEach((likes) => {
            const userIdFromLikes = likes.id
            console.log('userIdFromLikes:', userIdFromLikes)
            const userNameFromLikes = likes.name

            const userPost = posts.find(
                (post) => post.user.id === userIdFromLikes,
            )

            if (userPost) {
                const userItem = document.createElement('div')
                userItem.classList.add('user-item')

                const userImage = document.createElement('img')
                userImage.src = userPost.user.imageUrl
                userImage.classList.add('post-header__user-image')

                const userName = document.createElement('p')
                userName.textContent = userNameFromLikes

                userItem.appendChild(userImage)
                userItem.appendChild(userName)
                likesListElement.appendChild(userItem)
            }
        })
    }

    likeCountsElements.forEach((likeCountElement, index) => {
        likeCountElement.addEventListener('click', (event) => {
            event.stopPropagation()
            const likesList = posts[index].likes
            renderLikesList(likesList)
            modalContainer.style.display = 'flex'
        })
    })

    closeModalButton.addEventListener('click', (event) => {
        event.stopPropagation()
        modalContainer.style.display = 'none'
    })
}

export const renderModalLikesListUser = (posts) => {
    const likeCountsElements = document.querySelectorAll('.post-likes-count')
    const modalContainer = document.querySelector('.post-modal-container')
    const likesListElement = document.querySelector('.post-modal-list')
    const closeModalButton = document.querySelector('.button-close-modal')

    function renderLikesList(likesList) {
        likesListElement.innerHTML = ''
        likesList.forEach((like) => {
            const userIdFromLikes = like._id
            console.log('userIdFromLikes:', userIdFromLikes)
            const userNameFromLikes = like.name

            const userItem = document.createElement('div')
            userItem.classList.add('user-item')

            const userImage = document.createElement('img')
            userImage.src = like.imageUrl
            userImage.classList.add('post-header__user-image')

            const userName = document.createElement('p')
            userName.textContent = userNameFromLikes

            userItem.appendChild(userImage)
            userItem.appendChild(userName)
            likesListElement.appendChild(userItem)
        })
    }

    likeCountsElements.forEach((likeCountElement, index) => {
        likeCountElement.addEventListener('click', (event) => {
            event.stopPropagation()
            const likesList = posts[index].likes
            renderLikesList(likesList)
            modalContainer.style.display = 'flex'
        })
    })

    closeModalButton.addEventListener('click', (event) => {
        event.stopPropagation()
        modalContainer.style.display = 'none'
    })
}
