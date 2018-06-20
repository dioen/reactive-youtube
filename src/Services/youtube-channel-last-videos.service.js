export class YoutubeChannelLastVideosService {
    constructor() { }

    settings = () => ({
        apiKey: 'AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM'
    });

    getLastChannelVideos(channelId) {
        const { apiKey } = this.settings();

        return fetch('https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelId + '&part=snippet&order=date&maxResults=5');
    }
}
