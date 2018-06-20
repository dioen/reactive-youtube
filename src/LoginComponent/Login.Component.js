import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from './Login.Actions.js'

import GoogleFileService from '../Services/GoogleFileService';
import { initTestData } from '../folders_prot';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.GoogleFileService = new GoogleFileService();
    }

    onSuccess = () => {
        gapi.load('auth2', () => {
            const auth2 = gapi.auth2.getAuthInstance();
            const profile = auth2.currentUser.get().getBasicProfile();

            this.GoogleFileService.ifFileExist()
            .then((response) => {
                if (response.response) {
                    this.props.login({
                        'google_file_id': response.id,
                        'user_profile': profile
                    });
                } else {
                    let defaultContent = JSON.stringify(initTestData);
                    this.GoogleFileService.saveFileOnDrive(defaultContent)
                        .then(() => { this.onSuccess() });
                }
            });
        });
    }

    componentDidMount = () => {
        gapi.signin2.render('customBtn', {
            'scope': 'profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/youtube.readonly',
            'onsuccess': () => {this.onSuccess()}
        });
    }

    render = () => {
        return (
            <div id="customBtn" className="" data-onsuccess="onSignIn"></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (loginData) => { dispatch(login(loginData)) },
    logout: () => { dispatch(logout()) }
});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
