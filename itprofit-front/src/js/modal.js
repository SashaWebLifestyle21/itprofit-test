const modalElement = document.querySelector('.modal')
const modalWrapper = document.querySelector('.modal__wrapper')
const closeElement = document.querySelector('.modal__close')
const openElement = document.querySelector('.modal__open')

openElement.addEventListener('click', () => {
	modalElement.classList.add('open')
})

closeElement.addEventListener('click', () => {
	modalElement.classList.remove('open')
})

modalElement.addEventListener('click', event => {
	if (event._isClickWithInModal) return
	event.currentTarget.classList.remove('open')
})

modalWrapper.addEventListener('click', event => {
	event._isClickWithInModal = true
})
