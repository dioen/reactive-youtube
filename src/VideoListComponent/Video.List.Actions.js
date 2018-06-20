import VideoListService from '../Services/VideoListService';

const _VideoListService = new VideoListService();

export const loadVideosListSearched = (query) => {
    return function (dispatch) {
        _VideoListService.fetchList(query)
            .then(response => {
                dispatch({
                    "type": "LOAD_VIDEO_LIST_SEARCHED",
                    "payload": {
                        list: response,
                        list_name: 'Wyniki wyszukiwania'
                    }
                });
            });
    }
}

export const loadVideosListUser = (userVideosList) => ({
    "type": "LOAD_VIDEO_LIST_USER",
    "payload": {
        list: userVideosList,
        list_name: 'Aktualnie odtwarzana lista'
    }
});
