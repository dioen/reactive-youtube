import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import videoListReducer from './VideoListComponent/Video.List.Reducers';
import actualVideoReducer from './ActualVideoComponent/Actual.Video.Reducer';
import RelatedReducer from './RelatedToActualComponent/Related.Reducer';
import LoginReducer from './LoginComponent/Login.Reducer';
import UserSettingsReducer from './ShowUserSettingsComponent/ShowUserSettings.Reducer.js';
import ShowUserSettingsComponent from './ShowUserSettingsComponent/ShowUserSettings.Component';
import VideoList from './VideoListComponent/Video.List.Component';
import ActualVideo from './ActualVideoComponent/Actual.Video';
import SearchComponent from './SearchComponent/Search.Component';
import RelatedComponent from './RelatedToActualComponent/Related.Component';

import ShowUserListComponent from './ShowUserListComponent/ShowUserList.Component';
import { applyMiddleware } from 'redux';
import Hammer from 'hammerjs';

class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState();

        /* Uncomment when in dev mode */
        // store.subscribe(() => {
        //     console.log(store.getState());
        //     this.setState(store.getState());
        //     console.log('set state');
        // });
    }

    onLeftSwipe = () => {
        // alert('udalo sie! LEFT');

        const sideNavTag = document.getElementById('side-nav-id');
        sideNavTag.classList.add('active');
    }

    onRightSwipe = () => {
        // alert('udalo sie! RIGHT');

        const sideNavTag = document.getElementById('side-nav-id');
        sideNavTag.classList.remove('active');
    }

    componentDidMount = () => {
        const bodyTag = document.getElementById('App');
        // const swipeLeftOptions = {
        //     event: 'swipeleft',
        //     treshold: '15',
        //     velocity: '0.3'
        // }
        const swipe = new Hammer.Manager(bodyTag, {
            touchAction: 'auto',
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
            recognizers: [
                [Hammer.Swipe, {
                    direction: Hammer.DIRECTION_HORIZONTAL
                }]
            ]
        });

        swipe.on('swipeleft', this.onLeftSwipe);
        swipe.on('swiperight', this.onRightSwipe);
    }

    render = () => {
        return (
            <div className="main-window">
                <SearchComponent />
                <div className="main-window-wrapper">
                    <div className="right-side-wrapper">
                        <ActualVideo />
                        <VideoList />
                    </div>
                    <div id="side-nav-id" className="side-nav">
                        <RelatedComponent />
                        <div className="user-settings-panel-wrapper">
                            <ShowUserListComponent />
                            <ShowUserSettingsComponent />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const reducers = combineReducers({
    "videos": videoListReducer,
    "actualVideo": actualVideoReducer,
    "related": RelatedReducer,
    "user_login": LoginReducer,
    "user_settings": UserSettingsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><MainComponent /></Provider>
    , document.getElementById('App'));