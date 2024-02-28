module.exports = {
    getSongUri: (songUrl) => {
        const song = songUrl.split('/');
        const songIdIndex = song.findIndex((item) => item === 'track') + 1
        const songId = song[songIdIndex].substring(0, song[songIdIndex].indexOf('?'));
        console.log(songId);
        return [`spotify:track:${songId}`]
    }
}