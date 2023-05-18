const express = require('express')
const app =express()
require('dotenv').config()

app.get('/', async (req, res) => {
  try {
    res.send(`Welcome to API BNI Backend! in /`);
  } catch (error) {
    console.log(error);;
  }
});
const PORT = process.env.PORT 
app.listen(PORT, () => {console.log(`Application is running on ${PORT}!! `)})