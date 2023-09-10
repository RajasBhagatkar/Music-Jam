import React from 'react'
import useAuth from '../hooks/useAuth'
import { Container, Form } from 'react-bootstrap';
import { useEffect, useState } from 'preact/hooks';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from '../component/TrackSearchResult';
import Player from '../component/Player';


const spotifyApi = new SpotifyWebApi({
    clientId: "e24b4153140c47b3a3f5f1db4abe6e7f"
})


const Home = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([])

    // if accesstoken modifies put the accesstoken in spotifyapi object
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    console.log(searchResult)
    // search functionality
    useEffect(() => {
        let cancel = false
        if (!search) return setSearchResult([])
        if (!accessToken) return

        spotifyApi.searchTracks(search).then(res => {

            if (!cancel) {
                // console.log(res.body.tracks.items)
                // name
                // url
                // artistname
                setSearchResult(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            }

        })


        return () => cancel = true

    }, [search, accessToken])

    return (
        <Container className='d-flex flex-column py-2 ' style={{ height: '100vh' }}>
            <Form.Control type='search' placeholder='Search Songs/Artists' value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResult.map(track => (
                    <TrackSearchResult track={track} key={track.uri} />
                ))}
            </div>
            <div>
                <Player accessToken={accessToken} />
                {/* trackUri={"spotify:track:3l3BzT3Ovdx2mQK366r5Ei"} */}
            </div>
        </Container>
    )
}

export default Home 