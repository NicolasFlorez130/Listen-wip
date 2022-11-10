import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
   'ugc-image-upload',
   'Spotify Connect',
   'user-read-playback-state',
   'user-modify-playback-state',
   'user-read-currently-playing',
   'Playback',
   'app-remote-control',
   'streaming',
   'Playlists',
   'playlist-read-private',
   'playlist-read-collaborative',
   'playlist-modify-private',
   'playlist-modify-public',
   'Follow',
   'user-follow-modify',
   'user-follow-read',
   'Listening History',
   'user-read-playback-position',
   'user-top-read',
   'user-read-recently-played',
   'Library',
   'user-library-modify',
   'user-library-read',
   'Users',
   'user-read-email',
   'user-read-private',
].join(',');

const params = {
   scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
   clientId: process.env.SPOTIFY_CLIENT_ID,
   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export { LOGIN_URL };
export default spotifyApi;
