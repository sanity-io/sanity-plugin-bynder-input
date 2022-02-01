import React, {useEffect, useRef, useState} from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

const VideoPlayer = (props:VideoJsPlayerOptions) => {
  const videoNode = useRef<HTMLVideoElement>(null)
  const [player, setPlayer] = useState<VideoJsPlayer>()

  useEffect(() => {
    if (videoNode.current) {
      setPlayer(videojs(videoNode.current, props))
    }
    return () => player?.dispose()
  }, [videoNode])

    return (
      <div>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
        <div data-vjs-player style={{ marginBottom: '16px' }}>
          <video
            className="video-js vjs-16-9 vjs-big-play-centered"
            ref={videoNode}
          ></video>
        </div>
      </div>
    );
}

export default VideoPlayer
