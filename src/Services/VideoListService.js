import videoObject from '../Models/Video.Object';
const YouTube = require('youtube-node');

class VideoListService {
    constructor() {
        this.youtube = new YouTube();
    }

    fetchList = (query) => {
        return new Promise((resolve, reject) => {
            this.youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            this.youtube.search(query, 50, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    let tempResults = result.items.filter(element => element.id.videoId != undefined);
                    tempResults = tempResults.map(videoObject);

                    resolve(tempResults);
                }
            });
        });
    }

    fetchRelatedVideo = (videoId) => {
        return new Promise((resolve, reject) => {
            this.youtube.setKey('AIzaSyCG4TkK-ABOZU0KisXMiFWhDm7e4S9v3QM');
            this.youtube.addParam('type', 'video');
            this.youtube.addParam('part', 'snippet,id');

            this.youtube.related(videoId, 10, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    let temp = result.items.filter(this.filter);
                    temp = temp.map(videoObject);

                    resolve(temp);
                }
            });
        });
    }

    filter = (element) => {
        if (element.id.videoId != undefined) {
            return element;
        }
    }
}

export default VideoListService;
