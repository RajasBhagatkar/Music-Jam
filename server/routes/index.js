const express = require('express')
const testRoutes = require("./test.route")
const authRoutes = require("./auth.route")
const router = express.Router();

const defaultRoutes = [
    {
        path: "/test",
        route: testRoutes,
    },
    {
        path: "/",
        route: authRoutes
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router 