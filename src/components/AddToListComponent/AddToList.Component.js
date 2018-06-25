import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleFileService from '../../services/GoogleFileService';
import { FoldersService } from '../../services/FoldersService';
import { loadUserSettings, setUserActualFolder } from '../ShowUserSettingsComponent/ShowUserSettings.Actions';

class AddToListComponent extends Component {
    constructor(props) {
        super(props)

        this._FoldersService = new FoldersService();
        this._Service = new GoogleFileService();
        this.element = this.props.element;

        this.state = {
            folders_lists: {
                lists: [],
                show: false,
                googleFileContent: {}
            }
        }
    }

    addElement = (elementName) => {
        this._FoldersService.addItemToFolder(this.state.folders_lists.googleFileContent.settings, this.element, elementName, this.props.google_file_id)
            .then(reponse => this._FoldersService.getFolder(this.props.google_file_id, this.props.user_actual_folder.absolute_path)
                .then(response => this.props.setUserActualFolder(this.props.user_actual_folder.absolute_path)))
    }

    getMenu = () => {
        this._FoldersService.getAllFoldersList(this.props.google_file_id)
            .then(response => {
                this.setState({
                    folders_lists: {
                        lists: response.lists,
                        show: true,
                        googleFileContent: response.googleFileContent
                    }
                });
                this.props.loadUserSettings(this.state.folders_lists.googleFileContent.settings);
            });
    }

    mapLists = (element, index) => {
        return <div className="folders-list-element" key={index} onClick={() => this.addElement(element)}>{element.split("/").join("➞").slice(0, element.length - 1)}</div>
    }

    showMenu = (x, y) => {
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.add('show-menu');
    }

    toggleShowMenu = () => {
        this.setState({
            folders_lists: {
                show: false,
                lists: this.state.folders_lists.lists,
                googleFileContent: this.state.folders_lists.googleFileContent
            }
        });
    }

    componentDidMount = () => {
        window.addEventListener('click', this.toggleShowMenu);
    }

    componentWillUnmount = () => {
        window.removeEventListener('click', this.toggleShowMenu);
    }

    componentDidUpdate = () => {
        this.element = this.props.element;
    }

    render = () => {
        return (
            <div>
                <div className="icon-list-add list-add-icon" onClick={this.getMenu}></div>
                <div className="folders-list-wrapper">
                    {(this.state.folders_lists.show) ?
                        this.state.folders_lists.lists.map(this.mapLists)
                        :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ google_file_id: state.user_login.google_file_id });

const mapDispatchToProps = dispatch => ({
    loadUserSettings: userSettings => { dispatch(loadUserSettings(userSettings)) },
    setUserActualFolder: actualFolder => { dispatch(setUserActualFolder(actualFolder)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToListComponent);
