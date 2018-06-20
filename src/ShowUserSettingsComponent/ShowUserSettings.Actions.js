import GoogleFileService from '../Services/GoogleFileService';
import VideoListService from '../Services/VideoListService';

const _GoogleFileService = new GoogleFileService();
const _VideoListService = new VideoListService();

export const setUserSettings = userSettigs => ({
    type: "SET_USER_SETTINGS",
    payload: userSettigs
});

export const loadUserSettings = googleFileContent => ({
    type: "SET_USER_SETTINGS_FILE_CONTENT",
    payload: googleFileContent
});

export const setUserActualFolder = (actualFolderAbsolutePath) => ({
    type: "SET_USER_ACTUAL_FOLDER",
    payload: actualFolderAbsolutePath
});

export const setShowUserLists = (showUserLists) => ({
    type: "SET_SHOW_USER_LISTS",
    payload: showUserLists
});