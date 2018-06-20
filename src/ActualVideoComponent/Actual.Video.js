import React, { Component } from "react";
import { connect } from "react-redux";
import YouTubePlayer from "youtube-player";
import VideoListService from "../Services/VideoListService";
import {
  addRelated,
  addRelatedVideo
} from "../RelatedToActualComponent/Related.Actions";
import { setActualVideo } from "./Actual.Video.Actions";

class ActualVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualVideoClassName: "medium-actual-video",
      medium: false,
      repeatActualVideo: false
    };
    
    this.player;
    this.Service = new VideoListService();
  }

  chooseVideo = (relatedVideosArray) => {
    for (let i = 0; i < relatedVideosArray.length; i++) {
      if (
        this.props.related.alreadyPlayed.indexOf(relatedVideosArray[i].id) < 0
      ) {
        this.relatedVideo = relatedVideosArray[i];
      }
    }

    return this.relatedVideo;
  }

  loadNextVideo = () => {
    if (this.state.repeatActualVideo) {
      this.player.loadVideoById(this.props.actualVideo.video_element.id);
    } else if (this.props.actualVideo.video_element.isFromUser) {
      let videoIndex;

      this.props.videos.user.forEach((videoElement, index) => {
        if (videoElement.id == this.props.actualVideo.video_element.id) {
          videoIndex = index;
        }
      });
      if (videoIndex == this.props.videos.user.length - 1) {
        videoIndex = 0;
      } else {
        videoIndex = videoIndex + 1;
      }

      this.player.loadVideoById(this.props.videos.user[videoIndex].id); //THIS HAS TO BE DONE INSIDE ACTUALVID COMPONENT, NOT HERE!!!!!!!!!
      this.props.setActualVideo({
        video_element: this.props.videos.user[videoIndex],
        active: true
      });

      this.Service.fetchRelatedVideo(
        this.props.videos.user[videoIndex].id
      ).then(response => {
        this.props.addRelatedVideo(this.chooseVideo(response));
      });
    } else {
      this.player.loadVideoById(this.props.related.relatedVideo.id);
      this.props.setActualVideo({
        video_element: this.props.related.relatedVideo,
        active: true
      });
      this.Service.fetchRelatedVideo(this.props.related.relatedVideo.id).then(
        response => {
          this.props.addRelatedVideo(this.chooseVideo(response));
        }
      );
    }
  }

  togglePlayerSize = () => {
    const playerWrapper = document.getElementById("player-wrapper");

    if (playerWrapper.classList.contains("float-actual-video")) {
      playerWrapper.classList.remove("float-actual-video");
      playerWrapper.classList.add("medium-actual-video");
    } else {
      playerWrapper.classList.remove("medium-actual-video");
      playerWrapper.classList.add("float-actual-video");
    }
  }

  toggleRepeatActualVdieo = () => {
    this.setState({
      ...this.state,
      repeatActualVideo: !this.state.repeatActualVideo
    });
  }

  toggleActiveClass = (event) => {
    event.target.classList.toggle('active');
  }

  componentDidMount = () => {
    this.player = YouTubePlayer("player");
    this.player.on("stateChange", event => {
      if (event.data === 0) {
        this.loadNextVideo();
      }
    });
  }

  componentDidUpdate = () => {
    this.player.loadVideoById(this.props.actualVideo.video_element.id);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return !(nextProps.actualVideo == this.props.actualVideo);
  }

  render = () => {
    return (
      <div
        id="player-wrapper"
        className={
          this.props.actualVideo.active
            ? this.state.actualVideoClassName + " active"
            : this.state.actualVideoClassName + ""
        }
      >
        <div
          className="icon-resize-full resize-icon active"
          id="repeat-icon"
          onClick={(event) => { this.togglePlayerSize(); this.toggleActiveClass(event) }}
        />
        <div
          className="icon-cw replay-icon"
          id=""
          onClick={(event) => { this.toggleRepeatActualVdieo(); this.toggleActiveClass(event) }}
        />
        <div id="player" frameBorder="0" type="text/html" allowFullScreen />
        <div className="actual-video-title">
          {this.props.actualVideo.video_element.title}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  actualVideo: state.actualVideo,
  related: state.related,
  videos: state.videos
});

const mapDispatchToProps = dispatch => ({
  addRelated: relatedVideoArray => {
    dispatch(addRelated(relatedVideoArray));
  },
  addRelatedVideo: relatedVideo => {
    dispatch(addRelatedVideo(relatedVideo));
  },
  setActualVideo: actualVideoObject => {
    dispatch(setActualVideo(actualVideoObject));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ActualVideo);
