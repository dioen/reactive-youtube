const UserSettingsReducer = (state = { "settings": { "items": [], "lists": { "folders": [], "items": [] }, absolute_path: "" }, "user_actual_folder": [{ "folders": [], "items": [], "absolute_path": "" }], show_user_lists: false }, actions) => {
    switch (actions.type) {
        case "SET_USER_SETTINGS":
            return {
                user_settings: actions.payload
            }

        case "SET_USER_ACTUAL_FOLDER":
            return {
                user_actual_folder: Object.values(state.settings.lists).filter(folder => folder.absolute_path == actions.payload),
                settings: state.settings,
                absolute_path: state.absolute_path,
                show_user_lists: state.show_user_lists
            }

        case "SET_USER_SETTINGS_FILE_CONTENT":
            return {
                settings: actions.payload,
                user_actual_folder: state.user_actual_folder,
                absolute_path: state.absolute_path,
                show_user_lists: state.show_user_lists
            }

        case "SET_SHOW_USER_LISTS":
            return {
                settings: state.settings,
                user_actual_folder: state.user_actual_folder,
                absolute_path: state.absolute_path,
                show_user_lists: actions.payload
            }

        default:
            return state;
    }
}

export default UserSettingsReducer;
