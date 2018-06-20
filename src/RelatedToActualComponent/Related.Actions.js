import { VideoListService } from '../Services/VideoListService';

const _VideoListService = new VideoListService();

/*
* when actual video is set by user, the state of already played videos is cleared
*/
export const setRelatedFromUser = (element) => (
    dispatch => {
        _VideoListService.fetchRelatedVideo(element.id)
            .then((response) => {
                dispatch({
                    "type": "USER_SEARCHED",
                    "payload": response[0]
                })
            });
    });

export const addRelatedVideo = (relatedVideo) => ({
    "type": "ADD_RELATED_VIDEO",
    "payload": relatedVideo
});
