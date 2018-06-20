import GoogleFileService from "../Services/GoogleFileService";

const actualVideoReducer = (state = { video_element: { id: '', img: '', isFromUser: false, src: '', title: ''}, active: false }, actions) => {
    switch (actions.type) {
        case "SET_ACTUAL_VIDEO":
            return {
                video_element: actions.payload.video_element,
                active: actions.payload.active
            }

        // case "SET_IF_FROM_USER_LIST":
        //     return {
        //         id: state.id,
        //         isFromUserList: actions.payload.isFromUserList,
        //         active: state.active
        //     }
        default:
            return state;
    }
}

export default actualVideoReducer;