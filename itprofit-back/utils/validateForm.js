export function isEmail(str) {
	const regexEmail =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

	return regexEmail.test(str)
}

export function isPhone(str) {
	const regexPhone = /[0-9]{12}$/

	return regexPhone.test(str)
}

export function isName(str) {
	const regexName = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/

	return regexName.test(str)
}

export function validateForm(name, email, phone) {
	let countErr = 0
	const errors = {}
	if (!isName(name)) {
		errors['name'] = 'Имя должно содержать только буквы'
		countErr++
	}
	if (!isEmail(email)) {
		errors['email'] = 'Некорректный email'
		countErr++
	}
	if (!isPhone(phone)) {
		errors['phone'] = 'Телефон должен содержать 12 цифр'
		countErr++
	}
	if (countErr > 0) {
		return {
			status: 'error',
			fields: errors,
		}
	} else {
		return {
			status: 'success',
			msg: 'Ваша заявка успешно отправлена',
		}
	}
}
