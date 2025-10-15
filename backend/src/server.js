import app from "./app.js"

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server successfully run on http://localhost:${PORT}`)
})