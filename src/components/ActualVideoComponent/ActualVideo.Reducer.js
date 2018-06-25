const actualVideoReducer = (state = { video_element: { id: '', img: '', isFromUser: false, src: '', title: '' }, active: false }, actions) => {
    switch (actions.type) {
        case "SET_ACTUAL_VIDEO":
            return {
                video_element: actions.payload.video_element,
                active: actions.payload.active
            }

        default:
            return state;
    }
}

export default actualVideoReducer;
