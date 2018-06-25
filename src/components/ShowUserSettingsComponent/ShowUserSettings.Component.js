import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { setUserActualFolder } from './ShowUserSettings.Actions';
import { setActualVideo } from '../ActualVideoComponent/ActualVideo.Actions';
import { setRelatedFromUser } from '../RelatedToActualComponent/Related.Actions';
import { loadVideosListUser } from '../VideoListComponent/VideoList.Actions';
import { FoldersServiceHoc } from '../../coreHocs/FoldersService.Hoc';

class ShowUserSettingsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            folderNameVisible: false,
            rightClickedElementCached: {
                id: "",
                value: ""
            }
        }
    }

    createFolder = () => {
        const folderNamePrompt = prompt("Wprowadź nazwę folderu");

        (folderNamePrompt.length > 0) ?
            this.props.FoldersService.createFolder(this.props.user_settings.settings,
                this.props.user_settings.user_actual_folder[0].absolute_path, folderNamePrompt, this.props.google_file_id)
                .then(() => this.props.FoldersService.getFolder(this.props.google_file_id, this.props.user_settings.user_actual_folder[0].absolute_path)
                    .then(response => this.props.setUserActualFolder(this.props.user_settings.user_actual_folder[0].absolute_path)))
            :
            null
    }

    handleRightClickOnElement = (element, elementType, event) => {
        this.setState({
            rightClickedElementCached: {
                id: element.id,
                value: event.target.innerHTML,
                element_type: elementType
            }
        });
    }

    loadFolder = (chosenFolderName) => {
        this.props.setUserActualFolder(this.props.user_settings.user_actual_folder[0].absolute_path + chosenFolderName + "/");
    }

    moveFolderUp = () => {
        this.props.setUserActualFolder(this.props.user_settings.user_actual_folder[0].parent_path);
    }

    loadActualVideo = (videoObject) => {
        this.props.setActualVideo(videoObject)
    }

    loadRelatedVideo = (videoObject) => {
        this.props.setRelatedFromUser(videoObject);
    }

    loadUserList = () => {
        this.props.loadVideosListUser(this.props.user_settings.user_actual_folder[0].items);
    }

    mapFolders = (element, index) => {
        return <li id="user-list-folder" className="user-settings-list-element" key={index}
            onClick={() => this.loadFolder(element)}
            onContextMenu={(event) => this.handleRightClickOnElement(element, "user-list-folder", event)}>
            <div className="icon-folder-youtube"></div>
            <div className="user-settings-folder-title">{element}
            </div>
        </li>;
    }

    mapVideos = (element, index) => {
        element.isFromUser = true;
        return <li id="user-list-item" className="user-settings-list-element" key={index}
            onContextMenu={(event) => this.handleRightClickOnElement(element, "user-list-item", event)}
            onClick={() => {
                this.loadActualVideo({
                    'video_element': element,
                    'active': true
                });
                this.loadUserList();
                this.loadRelatedVideo(element);
            }}><span className=""></span>
            <div className="user-settings-video-img-wrapper">
                <img className="user-settings-video-img" src={element.img}></img>
            </div><div className="user-settings-video-title">{element.title}
            </div>
        </li>;
    }

    removeFolder = (event) => {
        this.props.FoldersService.removeFolder(this.props.user_settings.settings,
            this.props.user_settings.user_actual_folder[0].absolute_path, this.state.rightClickedElementCached.value, this.props.google_file_id)
            .then(response => this.props.FoldersService.getFolder(this.props.google_file_id, this.props.user_settings.user_actual_folder[0].absolute_path)
                .then(response => this.props.setUserActualFolder(this.props.user_settings.user_actual_folder[0].absolute_path)));
    }

    removeItem = () => {
        this.props.FoldersService.removeItemFromFolder(this.props.user_settings.settings,
            this.state.rightClickedElementCached.id, this.props.user_settings.user_actual_folder[0].absolute_path, this.props.google_file_id)
            .then(response => this.props.FoldersService.getFolder(this.props.google_file_id, this.props.user_settings.user_actual_folder[0].absolute_path)
                .then(response => this.props.setUserActualFolder(this.props.user_settings.user_actual_folder[0].absolute_path)));
    }

    render = () => {
        return (
            (this.props.user_settings.show_user_lists) ? (<div id="user-settings-wrapper" className="user-settings-wrapper">
                <ContextMenu id="user-settings-context-menu">
                    <MenuItem onClick={this.createFolder}>
                        Stwórz folder
                        </MenuItem>
                    {(this.state.rightClickedElementCached.element_type === "user-list-folder") ?
                        (
                            <MenuItem onClick={this.removeFolder}>
                                Usuń folder
                            </MenuItem>
                        )
                        : null
                    }

                    {(this.state.rightClickedElementCached.element_type === "user-list-item") ?
                        (
                            <MenuItem onClick={this.removeItem}>
                                Usuń film
                            </MenuItem>
                        )
                        : null
                    }
                </ContextMenu>
                <ContextMenuTrigger id="user-settings-context-menu">
                    <ul className="user-settings-list">
                        {(this.props.user_settings.user_actual_folder[0].parent_path.length > 0) ? (<div className="go-folder-up user-settings-list-element" onClick={this.moveFolderUp}>...</div>) : (<div></div>)}
                        {this.props.user_settings.user_actual_folder[0].folders.map(this.mapFolders, this)}
                        {this.props.user_settings.user_actual_folder[0].items.map(this.mapVideos, this)}
                    </ul>
                </ContextMenuTrigger>
            </div>) : (<div></div>)
        )
    }
}

const mapStateToProps = state => ({ user_settings: state.user_settings, google_file_id: state.user_login.google.google_file_id });
const mapDispatchToProps = dispatch => ({
    setUserActualFolder: folderObject => { dispatch(setUserActualFolder(folderObject)) },
    setActualVideo: videoObject => { dispatch(setActualVideo(videoObject)) },
    loadVideosListUser: videosList => { dispatch(loadVideosListUser(videosList)) },
    setRelatedFromUser: videoObject => { dispatch(setRelatedFromUser(videoObject)) }
});

const ShowUserSettingsComponentHOC = FoldersServiceHoc(ShowUserSettingsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(ShowUserSettingsComponentHOC);
