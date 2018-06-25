import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadVideosListSearched } from '../VideoListComponent/VideoList.Actions';
import LoginComponent from '../LoginComponent/Login.Component';
import LogoutComponent from '../LogoutComponent/Logout.Component';
import NewsFromSubscriptionsComponent from '../NewsFromSubscriptionsComponent/NewsFromSubscriptions.Component';

class SearchComponent extends Component {
    constructor(props) {
        super(props)
    }

    loadList = () => {
        this.props.loadVideosListSearched(this.refs.searchValue.value);
    }

    render = () => {
        return (
            <div className="nav-wrapper">
                <div className="nav-logo-wrapper">
                    <img className="nav-logo-img" src="/reactive-youtube/assets/images/logo.png" />
                </div>
                <form className="search-form">
                    <input id="search-input" type="text" placeholder="Szukaj..." ref="searchValue" autoFocus />
                    <button className="search-button icon-search" onClick={(e) => { e.preventDefault(), this.loadList() }}></button>
                    {/* <div id="mobile-menu" className="icon-menu mobile-menu-icon"></div> */}

                </form>
                <div className="user-profile-panel-wrapper">
                    {
                        (this.props.google.logged_in) ?
                            (<LogoutComponent />)
                            :
                            (<LoginComponent />)
                    }
                    {(this.props.google.logged_in) ?
                        <NewsFromSubscriptionsComponent />
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadVideosListSearched: (list) => { dispatch(loadVideosListSearched(list)) }
});

const mapStateToProps = (state) => (state.user_login);

export default connect(() => (mapStateToProps), mapDispatchToProps)(SearchComponent);
