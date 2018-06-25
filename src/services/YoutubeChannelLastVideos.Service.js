export class YoutubeChannelLastVideosService {
    constructor() {
        this.apiKey = 'AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM';
    }

    getLastChannelVideos = (channelId) => {
        return fetch('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channelId + '&part=snippet&order=date&maxResults=5');
    }
}
