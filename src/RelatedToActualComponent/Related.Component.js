import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import VideoListService from '../Services/VideoListService';
import { addRelatedVideo } from './Related.Actions';
import { setActualVideo } from '../ActualVideoComponent/Actual.Video.Actions';

class RelatedComponent extends Component {
    constructor(props) {
        super(props)

        this._VideoListService = new VideoListService();
    }

    chooseVideo = (relatedVideosArray) => {
        let relatedVideo;
        for (let i = 0; i < relatedVideosArray.length; i++) {
            if (this.props.related.alreadyPlayed.indexOf(relatedVideosArray[i].id) < 0) {
                relatedVideo = relatedVideosArray[i];
            }
        }
        return relatedVideo;
    }

    setActualVideo = (videoElement) => {
        this.props.setActualVideo({
            'video_element': videoElement,
            'active': true
        });

        this._VideoListService.fetchRelatedVideo(videoElement.id)
            .then(response => {
                this.props.addRelatedVideo(this.chooseVideo(response));
            });
    }

    render = () => {
        return (
            (this.props.related.relatedVideo.id !== '') ?
                <div className="next-video-wrapper col-md-12">
                    <div className="next-video-statement col-md-12">Następnie:</div>
                    <div className="next-video-card col-md-12 margin-top-20" onClick={() => { this.setActualVideo(this.props.related.relatedVideo) }}>
                        <img className="next-video-image" src={this.props.related.relatedVideo.img} alt="" />
                        <div className="next-video-title">{this.props.related.relatedVideo.title}</div>
                    </div>
                </div>
                :
                <div></div>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => ({
    setActualVideo: (videoElement) => { dispatch(setActualVideo(videoElement)) },
    addRelatedVideo: (relatedVideo) => { dispatch(addRelatedVideo(relatedVideo)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedComponent);
