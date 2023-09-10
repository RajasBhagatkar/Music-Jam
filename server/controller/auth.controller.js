const generateRandomString = require("../utils/generateRandomString")
const SpotifyWebApi = require('spotify-web-api-node');

/**
 * @method GET
 * @route /v1/login
 * @param {*} req 
 * @param {*} res 
 * @returns AUTH_URL
 */
async function login(req, res) {
    let AUTH_URL = new URL("https://accounts.spotify.com/authorize")

    AUTH_URL.searchParams.set("client_id", process.env.CLIENT_ID)
    AUTH_URL.searchParams.set("response_type", "code")
    AUTH_URL.searchParams.set("redirect_uri", process.env.REDIRECT_URI)
    // ! scope is important
    AUTH_URL.searchParams.set("scope", "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state")
    AUTH_URL.searchParams.set("state", generateRandomString())
    AUTH_URL.searchParams.set("show_dialog", true)
    AUTH_URL = AUTH_URL.toString()

    return res.redirect(AUTH_URL)
}


/**
 * @method POST
 * @route /v1/login
 * @param {code, state} req 
 * @body {accessToken, refreshToken, expiresIn} res 
 */
async function getTokens(req, res) {
    const { code, state } = req.body;

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    })

    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            return res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(err => {
            console.log(err.body);
            console.log("error occured oops");
            res.status(400).redirect(process.env.REDIRECT_URI)
        })

}


/**
 * @method POST
 * @param {refreshToken} req 
 * @param {accreshToken} req  
 */
async function refreshToken(req, res) {
    const { refreshToken } = req.body
    // console.log({ refreshToken });

    console.log({ refreshToken });

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        refreshToken
    })


    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken()
        .then((data) => {
            console.log('The access token has been refreshed!');
            // Save the access token so that it's used in future calls
            // data.body['access_token']
            console.log(data.body.access_token);

            return res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })

        })
        .catch((err) => {
            console.log('Could not refresh access token', err);
        })

}


module.exports = { login, getTokens, refreshToken }