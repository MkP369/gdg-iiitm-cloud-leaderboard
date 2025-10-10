import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function IntroVideo() {
  const [videoSrc, setVideoSrc] = useState(() => {
    // Initialize with the correct video based on current screen size
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      const isThin = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
      return (isMobile || isThin) ? "/introvid_faststart_vertical.mp4" : "/introvid_faststart.mp4";
    }
    return "/introvid_faststart.mp4";
  });

  useEffect(() => {
    // Function to determine which video to use based on screen size
    const updateVideoSrc = () => {
      const isMobile = window.innerWidth <= 768; // Mobile breakpoint
      const isThin = window.innerWidth <= 1024 && window.innerHeight > window.innerWidth; // Thin/portrait orientation
      
      const newSrc = (isMobile || isThin) ? "/introvid_faststart_vertical.mp4" : "/introvid_faststart.mp4";
      
      // Only update if the source actually needs to change
      setVideoSrc(currentSrc => currentSrc !== newSrc ? newSrc : currentSrc);
    };

    // Debounce resize events for better performance
    let resizeTimeout;
    const debouncedUpdateVideoSrc = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateVideoSrc, 100);
    };

    // Add resize listener to handle orientation changes and window resizing
    window.addEventListener("resize", debouncedUpdateVideoSrc);
    window.addEventListener("orientationchange", updateVideoSrc);

    // Cleanup listeners
    return () => {
      window.removeEventListener("resize", debouncedUpdateVideoSrc);
      window.removeEventListener("orientationchange", updateVideoSrc);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const intro = document.getElementById("intro-video");
    if (intro) {
      setTimeout(() => {
        intro.style.transition = "opacity 0.5s ease";
        intro.style.opacity = "0";
        setTimeout(() => {
          intro.style.display = "none";
        }, 500);
      }, 2000); // hide after 2s
    }
  }, []);

  return (
    <video
      id="intro-video"
      src={videoSrc}
      autoPlay
      muted
      playsInline
      preload="auto"
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
