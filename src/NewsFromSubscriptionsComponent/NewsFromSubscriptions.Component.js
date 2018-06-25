import React, { Component } from 'react';
import { connect } from 'react-redux'
import { LastSubscriptionsVideosService } from '../Services/LastSubscriptionsVideos.Service';
import { LocalStorageService } from '../Services/LocalStorage.Service';
import { setActualVideo } from "../ActualVideoComponent/ActualVideo.Actions";

class NewsFromSubscriptionsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

        this._LastSubscriptionsVideosService = new LastSubscriptionsVideosService();
        this._LocalStorageService = new LocalStorageService();

        if (this._LocalStorageService.getUserData()) this._LocalStorageService.setUserData();
    }

    addNotifyClassName = () => {
        document.getElementById('new-subscriptions-notify-bell').classList.add('notify');
    }

    checkForNewSubscriptionsVideos = () => {
        const userData = this._LocalStorageService.getUserData();
        return this._LastSubscriptionsVideosService.queryChannelsForLastVideos()
            .then(channelsLastVideos => {
                const sortedVideos = this.getLatestVideos(channelsLastVideos);
                this.setState({
                    items: sortedVideos
                });
                if (new Date(userData.created_on) < new Date(sortedVideos[0].snippet.publishedAt)) this.addNotifyClassName();
            });
    }

    getLatestVideos = (channelsWithLatestVideos) => {
        const videos = channelsWithLatestVideos.map(channel => channel.items);
        const concatedVideos = [].concat(...videos);
        const sortedVideosByPublishDate = concatedVideos.sort(this.sortByDate);
        return sortedVideosByPublishDate;
    }

    handleSubscribeButtonClick = (e) => {
        e.preventDefault();

        this.checkForNewSubscriptionsVideos()
            .then(() => {
                const list = document.getElementById('subscriptions-list');
                list.classList.toggle('active');
                document.getElementById('new-subscriptions-notify-bell').classList.remove('notify');
                this._LocalStorageService.setUserData();
            });
    }

    removeNotifyClassName = () => {
        document.getElementById('new-subscriptions-notify-bell').classList.remove('notify');
    }

    sortByDate = (firstElement, secondElement) => {
        return new Date(secondElement.snippet.publishedAt) - new Date(firstElement.snippet.publishedAt);
    }

    windowActiveModeEvent = () => {
        const list = document.getElementById('subscriptions-list');
        list.classList.remove('active');
    }

    componentDidMount = () => {
        this.checkForNewSubscriptionsVideos();
        document.body.addEventListener('click', this.windowActiveModeEvent);
        this.checkNewSubscriptionsInterval = setInterval(this.checkForNewSubscriptionsVideos, 1200000);
    }

    componentWillUnmount = () => {
        document.body.removeEventListener('click', this.windowActiveModeEvent);
        clearInterval(this.checkNewSubscriptionsInterval);
    }

    render = () => {
        return (
            <div id="new-subscriptions-notify-bell" className="subscriptions-news-bell-icon-wrapper" onClick={this.handleSubscribeButtonClick}>
                <div className="icon-bell-alt"></div>
                <div id="subscriptions-list" className="user-subscriptionsto-list-wrapper">
                    <div className="user-subscriptionsto-list">
                        {this.state.items.map((item, index) => (
                            <div className="subscription-new-video-card-wrapper" onClick={() => this.props.setActualVideo({
                                video_element: {
                                    id: item.id.videoId,
                                    img: '',
                                    isFromUser: false,
                                    src: '',
                                    title: item.snippet.title
                                },
                                active: true
                            }
                            )} key={index}>
                                <div className="subscription-new-video-img-wrapper">
                                    <img src={item.snippet.thumbnails.default.url} />
                                </div>
                                <div className="subscription-new-video-content-wrapper">
                                    <div className="subscription-new-video-content-description-wrapper">
                                        <span>{item.snippet.title}</span>
                                        <div className="subscription-new-video-content-title-wrapper">
                                            <br />
                                            <span>{item.snippet.channelTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    setActualVideo: videoId => {
        dispatch(setActualVideo(videoId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFromSubscriptionsComponent);
