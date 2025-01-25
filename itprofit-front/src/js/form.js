import IMask from 'imask'

const formEl = document.querySelector('#form')
const inputPhoneEl = document.querySelector('#phone')
const successElement = document.querySelector('.form-group__success')
const loaderElement = document.querySelector('.loader')

const maskOptions = {
	mask: '+{375}(00)000-00-00',
}

const mask = IMask(inputPhoneEl, maskOptions)

formEl.addEventListener('submit', event => {
	event.preventDefault()
	isLoading(true)

	const formData = new FormData(formEl)
	formData.set('phone', mask.unmaskedValue)

	fetch('https://itprofit-test-backend.onrender.com/api', {
		method: 'POST',
		body: formData,
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			isLoading(false)
			if (data.status === 'error') {
				for (const key in Object.fromEntries(formData)) {
					console.log(`${key} === ${Object.fromEntries(formData)[key]}`)
					if (data.fields.hasOwnProperty(key)) {
						const fieldInputElement = document.querySelector(`#${key}`)
						setError(fieldInputElement, data.fields[key])
					} else {
						const fieldInputElement = document.querySelector(`#${key}`)
						setSuccess(fieldInputElement)
					}
				}
			}
			if (data.status === 'success') {
				for (const key in Object.fromEntries(formData)) {
					const fieldWithoutError = document.querySelector(`#${key}`)
					setSuccess(fieldWithoutError)
				}
				formEl.reset()

				successElement.classList.remove('hide')
				successElement.classList.add('show')

				successElement.innerHTML = `<span>${data.msg}</span>`

				setTimeout(() => {
					successElement.classList.remove('show')
					successElement.classList.add('hide')
				}, 5000)
			}
		})
		.catch(err => {
			console.log('err ', err)
		})
})

function setError(element, message) {
	const inputControl = element.parentElement
	const errorDisplay = inputControl.querySelector('.form-group__error')

	errorDisplay.innerText = message
	inputControl.classList.add('error')
}

function setSuccess(element) {
	const inputControl = element.parentElement
	const errorDisplay = inputControl.querySelector('.form-group__error')

	errorDisplay.innerText = ''
	inputControl.classList.remove('error')
}

function isLoading(isLoad) {
	if (isLoad) {
		loaderElement.classList.add('show')
		loaderElement.classList.remove('hide')
	} else {
		loaderElement.classList.add('hide')
		loaderElement.classList.remove('show')
	}
}
