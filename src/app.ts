import express from 'express';
// import mongoMiddleware from './middleware/mongomiddleware'
// import router from './router/mainRouter';
import 'dotenv/config'

const port = process.env.PORT;
const app = express()

app.use(express.json())

// app.use(mongoMiddleware)
// app.use(router)

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
  })