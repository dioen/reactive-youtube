import VideoListService from '../Services/VideoListService';
const _VideoListService = new VideoListService();

export const addRelated = (addRelatedObject) => ({
    "type": "ADD_RELATED",
    "payload": addRelatedObject
});

export const setRelatedFromUser = (element) => {
    return dispatch => {
        _VideoListService.fetchRelatedVideo(element.id)
            .then((response) => {
                dispatch({
                    "type": "USER_SEARCHED",
                    "payload": response[0]
                })
            });
    }
}


export const addRelatedVideo = (relatedVideo) => ({
    "type": "ADD_RELATED_VIDEO",
    "payload": relatedVideo
});