import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserActualFolder, loadUserSettings, setShowUserLists } from '../ShowUserSettingsComponent/ShowUserSettings.Actions';
import { FoldersService } from '../Services/Folders.Service';

class ShowUserListComponent extends Component {
    constructor(props) {
        super(props)

        this._FoldersService = new FoldersService();
    }

    createFolder = () => {
        this._FoldersService.getFolder(this.props.user_login.google.google_file_id).then(response => {
            this._FoldersService.createFolder("test", "testFolderName", this.props.user_login.google.google_file_id);
        });
    }

    loadUserList = () => {
        this._FoldersService.getGoogleFileContent(this.props.user_login.google.google_file_id)
            .then(response => {
                this.props.loadUserSettings(response.settings);
            })
            .then(() => {
                this.props.setUserActualFolder("root/");
                this.props.setShowUserLists(true);
            });
    }

    removeActiveClassFromSiblings = (element) => {
        element.target.parentNode.childNodes.forEach(child => child.classList.remove('active'));
    }

    setActiveClass = (e) => {
        this.removeActiveClassFromSiblings(e);
        e.target.classList.add('active');
    }

    render = () => {
        return (
            <div className="user-settings-folder">
                {(this.props.user_login.google.logged_in) ?
                    (<div className="margin-top-20 user-settings-panel-icons-wrapper">
                        <div className="icon-cog user-dashboard-tile-wrapper" title="Jeszcze nie działam... :(" onClick={this.setActiveClass}></div>
                        <div className="icon-th-list user-dashboard-tile-wrapper" onClick={(e) => {
                            this.setActiveClass(e);
                            this.loadUserList();
                        }}></div>
                    </div>)
                    : (<div className="col-md-12">
                        <h4>Proszę zaloguj się na swoje konto Google, by w pełni korzystać z funkcji aplikacji.</h4>
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = dispatch => ({
    loadVideosListUser: userList => { dispatch(loadVideosListUser(userList)) },
    setUserActualFolder: elements => { dispatch(setUserActualFolder(elements)) },
    loadUserSettings: googleFileContent => { dispatch(loadUserSettings(googleFileContent)) },
    setShowUserLists: showUserLists => { dispatch(setShowUserLists(showUserLists)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserListComponent);
