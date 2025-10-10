import { h } from 'preact';
import { useEffect } from 'preact/hooks';

export default function IntroVideo() {
  useEffect(() => {
    const intro = document.getElementById('intro-video');
    if (intro) {
      setTimeout(() => {
        intro.style.transition = 'opacity 0.5s ease';
        intro.style.opacity = '0';
        setTimeout(() => {
          intro.style.display = 'none';
        }, 500);
      }, 2000); // hide after 2s
    }
  }, []);

  return (
    

    <video
      id="intro-video"
      src='\public\introvid_faststart.mp4'
      autoPlay
      muted
      playsInline
      preload="auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
   
  );
}
