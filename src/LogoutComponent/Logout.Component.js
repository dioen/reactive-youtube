import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../LoginComponent/Login.Actions.js'

import GoogleFileService from '../Services/GoogleFileService';

class LogoutComponent extends Component {
    constructor(props) {
        super(props)

        this.GoogleFileService = new GoogleFileService();
    }

    logout = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log('User signed out.');
            this.props.logout();
        });
    }

    render = () => {
        return (
            <div className="user-profile-management">
                <div className="user-profile-management-name">
                    <span>Witaj, {this.props.google.given_name}</span>
                </div>
                <div type="button" className="logout-button" onClick={this.logout}>
                    <div className="logout-button-content-wrapper">
                        <div className="image-logout-wrapper">
                            <img src={this.props.google.image_url} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => { dispatch(logout()) }
});

const mapStateToProps = (state) => (state.user_login);

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
