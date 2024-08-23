import React from 'react';
import { useRive } from '@rive-app/react-canvas';
import { useState } from 'react';

interface RiveAnimationPreviewProps {
  riveUrl: string;
  previewImg: string;
  aspectRatio: number;
}

export default function RiveAnimationPreview({
  riveUrl,
  previewImg,
  aspectRatio,
}: RiveAnimationPreviewProps) {
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive({
    src: riveUrl,
    autoplay: true,
    onLoad: () => setLoaded(true),
  });
  return (
    <div style={{ width: '100%', aspectRatio: `1/${aspectRatio}` }}>
      {!loaded && (
        <img src={previewImg} style={{ width: '100%', objectFit: 'cover' }} />
      )}
      {
        <RiveComponent
          style={{
            width: '100%',
            objectFit: 'cover',
            display: loaded ? 'block' : 'none',
          }}
        />
      }
    </div>
  );
}
