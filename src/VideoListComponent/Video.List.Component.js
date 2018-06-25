import React, { Component } from "react";
import { connect } from "react-redux";
import { loadVideosListSearched, loadVideosListUser } from "./Video.List.Actions";
import VideoElementComponent from '../VideoElement/video-element.component';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableVideoElement = SortableElement(({ element, elementIndex }) =>
  <VideoElementComponent element={element} index={elementIndex} />);

const SortableVideosList = SortableContainer(({ items, localProps }) => {
  return (
    <div className="video-list-view">
      <div className="video-list-name-title">
        {localProps.videos.list_name}
        <span title="To jest twoja lista. Przytrzymaj myszą element i przenieś go w inne miejsce, żeby zmienić kolejność listy.">
          &#9432;
        </span>
      </div>
      {
        items.map((element, index) => {
          return <SortableVideoElement element={element} key={`item-${index}`} elementIndex={index} index={index} />
        })
      }
    </div>
  )
});

class VideoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.videos.searched
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    }, () => this.props.loadVideosListUser(this.state.items));
  };

  componentDidMount = () => {
    this.props.loadVideosListSearched("");
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      items: nextProps.videos.searched
    });
  }

  render = () => {
    return (
      <div className="video-list-view-wrapper">
        {
          (this.props.videos.list_name === 'Wyniki wyszukiwania' || window.isMobile) ?
            (
              <div className="video-list-view">
                <div className="video-list-name-title">
                  {this.props.videos.list_name}
                </div>
                {
                  this.props.videos.searched.map((element, index) => (<VideoElementComponent element={element} index={index} key={index} />))
                }
              </div>
            )
            :
            <SortableVideosList items={this.state.items} onSortEnd={this.onSortEnd} axis={'xy'} localProps={this.props} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  videos: state.videos
});

const mapDispatchToProps = dispatch => ({
  loadVideosListSearched: query => {
    dispatch(loadVideosListSearched(query));
  },
  loadVideosListUser: videosList => {
    dispatch(loadVideosListUser(videosList));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
