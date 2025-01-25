import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { validateForm } from './utils/validateForm.js'

const upload = multer()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(upload.array())

const port = process.env.PORT || 5000

app.post('/api', (req, res) => {
	try {
		const { email, phone, message, name } = req.body

		const validForm = validateForm(name, email, phone)

		res.json({ ...validForm })
	} catch (err) {
		console.error(err)
	}
})

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
