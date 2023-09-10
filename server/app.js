const express = require('express')
const app = express();
const cors = require('cors')
const routes = require("./routes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.use("/v1", routes)


app.use((req, res) => {
    // if request does not match
    return res.json({ error: "access_denied" })
})

module.exports = app;