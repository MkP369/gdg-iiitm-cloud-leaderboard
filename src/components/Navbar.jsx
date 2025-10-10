import { useRef, useEffect } from 'preact/hooks';
import '../styles/Navbar.css';
import rightLogo from '../assets/Study-Jams-Logo.png';
import midLogo from '../assets/Cloud-logo.png'
export default function Navbar() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 1);
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo left">
        <a
          href="https://gdg.community.dev/gdg-on-campus-atal-bihari-vajpayee-indian-institute-of-information-technology-and-management-gwalior-india/"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-link"
        >
          <video
  ref={videoRef}
  src="/GDGLOGOGIF.mp4"
  autoPlay
  muted
  playsInline
  disablePictureInPicture
  controlsList="nodownload nofullscreen noremoteplay"
  width="100"
  height="100"
  style={{ pointerEvents: 'auto' }}
/>
        </a>
      </div>

      <div className="navbar-logo mid">
        <img src={midLogo} alt="Cloud Logo" />
      </div>
    
      <div className="navbar-logo right">
        <img src={rightLogo} alt="Study Jams Logo" />
      </div>
    </nav>
  );
}
