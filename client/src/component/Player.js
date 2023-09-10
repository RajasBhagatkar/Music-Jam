import React from 'react'

import SpotifyPlayer from 'react-spotify-web-playback';


export default function Player({ accessToken, trackUri }) {
    console.log(accessToken);

    if (!accessToken) return;
    return (

        <SpotifyPlayer
            token={accessToken}
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        />
    )
}
/**
 
    if (!accessToken) return null; // this will terminate the player
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon // save icon 
            uris={trackUri ? [trackUri] : []}
        />
    )
 */