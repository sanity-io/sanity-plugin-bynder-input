import React from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

export default class VideoPlayer extends React.Component<
  VideoJsPlayerOptions,
  any
> {
  videoNode?: HTMLVideoElement;
  player?: VideoJsPlayer;
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
        <div data-vjs-player style={{ marginBottom: '16px' }}>
          <video
            className="video-js vjs-16-9 vjs-big-play-centered"
            ref={node => {
              if (node) {
                this.videoNode = node;
              }
            }}
          ></video>
        </div>
      </div>
    );
  }
}
