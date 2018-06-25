const RelatedReducer = (state = { 'relatedVideo': { 'id': '', 'src': '', 'title': '', 'img': '' }, 'relatedVideos': [], 'alreadyPlayed': [] }, actions) => {
    switch (actions.type) {
        case "USER_SEARCHED":
            return {
                'alreadyPlayed': [],
                'relatedVideo': actions.payload
            }

        case "ADD_RELATED_VIDEO":
            return {                
                'alreadyPlayed':  [...state.alreadyPlayed, actions.payload.id],
                'relatedVideo': actions.payload
            }

        default:
            return state;
    }
}

export default RelatedReducer;
