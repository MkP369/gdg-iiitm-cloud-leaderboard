import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";

export default function IntroVideo() {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(() => {

    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      const isThin = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
      return (isMobile || isThin) ? "/introvid_faststart_vertical.mp4" : "/introvid_faststart.mp4";
    }
    return "/introvid_faststart.mp4";
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      return video.play().catch(error => {
        console.log("Video autoplay failed:", error);
        return false;
      });
    };

    const handleCanPlay = () => {
      attemptPlay();
    };

    const handleLoadedData = () => {
      attemptPlay();
    };

    const handleLoadedMetadata = () => {
      attemptPlay();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const playInterval = setInterval(() => {
      if (video.readyState >= 2) { 
        attemptPlay().then(success => {
          if (success !== false) {
            clearInterval(playInterval);
          }
        });
      }
    }, 50);

    setTimeout(() => clearInterval(playInterval), 2000);

    if (video.readyState >= 2) {
      attemptPlay();
    }

    return () => {
      clearInterval(playInterval);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSrc]);

  useEffect(() => {

    const updateVideoSrc = () => {
      const isMobile = window.innerWidth <= 768; 
      const isThin = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth; 

      const newSrc = (isMobile || isThin) ? "/introvid_faststart_vertical.mp4" : "/introvid_faststart.mp4";

      setVideoSrc(currentSrc => currentSrc !== newSrc ? newSrc : currentSrc);
    };

    let resizeTimeout;
    const debouncedUpdateVideoSrc = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateVideoSrc, 100);
    };

    window.addEventListener("resize", debouncedUpdateVideoSrc);
    window.addEventListener("orientationchange", updateVideoSrc);

    return () => {
      window.removeEventListener("resize", debouncedUpdateVideoSrc);
      window.removeEventListener("orientationchange", updateVideoSrc);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setTimeout(() => {
        video.style.transition = "opacity 0.5s ease";
        video.style.opacity = "0";
        setTimeout(() => {
          video.style.display = "none";
        }, 500);
      }, 2000); 
    }
  }, []);

  return (
    <video
      ref={videoRef}
      id="intro-video"
      src={videoSrc}
      autoPlay
      muted
      playsInline
      preload="metadata"
      loop={false}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}