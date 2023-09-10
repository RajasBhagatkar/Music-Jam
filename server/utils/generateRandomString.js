function generateRandomString() {
    return Math.round(new Date().valueOf() * Math.random(11000)) + ""
}
module.exports = generateRandomString
