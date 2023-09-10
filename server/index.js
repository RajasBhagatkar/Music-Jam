const app = require('./app');
require("dotenv").config({ path: "./.env.development" })


app.listen(process.env.PORT, () => {
    // message to be shown but instead show or send messge
    // console.log("listening on port ", process.env.PORT);
})