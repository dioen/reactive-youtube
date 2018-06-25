const videoListReducer = (state = { searched: [], user: [], list_name: '' }, actions) => {
    switch (actions.type) {
        case "LOAD_VIDEO_LIST_USER":
            return {
                user: actions.payload.list,
                searched: actions.payload.list,
                list_name: actions.payload.list_name
            }

        case "LOAD_VIDEO_LIST_SEARCHED":
            return {
                user: state.user,
                searched: actions.payload.list,
                list_name: actions.payload.list_name
            }

        default:
            return state;
    }
}

export default videoListReducer;
