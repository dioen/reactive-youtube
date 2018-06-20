import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadVideosListSearched } from '../VideoListComponent/Video.List.Actions';
import LoginComponent from '../LoginComponent/Login.Component';
import LogoutComponent from '../LogoutComponent/Logout.Component';
import NewsFromSubscriptionsComponent from '../NewsFromSubscriptionsComponent/news-from-subscriptions.component';

class SearchComponent extends Component {
    constructor(props) {
        super(props)
    }

    loadList() {
        this.props.loadVideosListSearched(this.refs.searchValue.value);
    }

    render() {
        return (
            <div className="form-wrapper">
                <div className="col-md-3 nav-logo-wrapper">
                    <img className="nav-logo-img" src="/reactive-youtube/assets/images/logo.png" />
                </div>
                <form className="search-form col-md-6">
                    <input id="search-input" type="text" placeholder="Szukaj..." ref="searchValue" autoFocus />
                    <button className="search-button icon-search" onClick={(e) => { e.preventDefault(), this.loadList() }}></button>
                    <div id="mobile-menu" className="icon-menu mobile-menu-icon"></div>

                </form>
                <div className="col-md-3">
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
