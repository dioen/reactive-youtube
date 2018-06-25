import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { setActualVideo } from "../ActualVideoComponent/ActualVideo.Actions";
import { setRelatedFromUser } from "../RelatedToActualComponent/Related.Actions";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FoldersService } from "../Services/Folders.Service";
import { setUserActualFolder } from "../ShowUserSettingsComponent/ShowUserSettings.Actions";

class VideoElementComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context_menu_options: [],
            googleFileContent: {}
        };

        this._FoldersService = new FoldersService();
    }

    addItemToFolder = (folderName, videoElement) => {
        this._FoldersService
            .addItemToFolder(
                this.props.user_settings.settings,
                videoElement,
                folderName,
                this.props.google_file_id
            )
            .then(reponse =>
                this._FoldersService
                    .getFolder(
                        this.props.google_file_id,
                        this.props.user_settings.user_actual_folder[0].absolute_path
                    )
                    .then(response =>
                        this.props.setUserActualFolder(
                            this.props.user_settings.user_actual_folder[0].absolute_path
                        )
                    )
            );
    }

    loadContextMenuElements = () => {
        this._FoldersService
            .getAllFoldersList(this.props.google_file_id)
            .then(response => {
                this.setState({
                    ...this.state,
                    context_menu_options: response.lists,
                    google_file_content: response.googleFileContent
                });
            });
    }

    loadRelated = element => {
        this.props.setRelatedFromUser(element);
        this.setActualVideo(element);
    };

    mapContextMenuElements = (folderName, index, videoElement) => {
        return (
            <MenuItem
                key={index}
                onClick={() => this.addItemToFolder(folderName, videoElement)}
            >
                <div>
                    {folderName
                        .split("/")
                        .join("➞")
                        .slice(0, folderName.length - 1)}
                </div>
            </MenuItem>
        );
    }

    setActualVideo = element => {
        this.props.setActualVideo({
            video_element: element,
            active: true
        });
    };

    render = () => {
        return (
            <div className="video-card-wrapper" title={this.props.element.title}>
                <ContextMenuTrigger
                    id={"video-element-context-menu" + this.props.index.toString()}
                >
                    <div
                        className="video-card"
                        onContextMenu={this.loadContextMenuElements}
                    >
                        <div className="video-card-body">
                            <div title={this.props.element.title}>
                                <img src={this.props.element.img} alt="" />
                            </div>
                            <div className="video-title-wrapper">
                                <div className="video-title">{this.props.element.title}</div>
                            </div>
                            <div
                                className="video-card-click-layer"
                                onClick={() => {
                                    this.loadRelated(this.props.element);
                                }}
                            />
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={"video-element-context-menu" + this.props.index.toString()}>
                    <MenuItem disabled>Dodaj film do:</MenuItem>
                    {this.state.context_menu_options.map((el, index) =>
                        this.mapContextMenuElements(el, index, this.props.element)
                    )}
                </ContextMenu>
            </div>
        );
    }
}

VideoElementComponent.propTypes = {
    element: PropTypes.object
}

const mapStateToProps = state => ({
    actualVideo: state.actualVideo,
    user_settings: state.user_settings,
    google_file_id: state.user_login.google.google_file_id
});
const mapDispatchToProps = dispatch => ({
    setActualVideo: videoId => {
        dispatch(setActualVideo(videoId));
    },
    setRelatedFromUser: videoObj => {
        dispatch(setRelatedFromUser(videoObj));
    },
    setUserActualFolder: folderName => {
        dispatch(setUserActualFolder(folderName));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoElementComponent);
