const videoObject = (element) => ({
        "src": 'https://www.youtube.com/embed/' + element.id.videoId + '?enablejsapi=1&autoplay=1&controls=2',
        "title": element.snippet.title,
        "img": element.snippet.thumbnails.medium.url,
        "id": element.id.videoId,
        "isFromUser": false
    })

export default videoObject;
