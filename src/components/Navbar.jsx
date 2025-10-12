import "../styles/Navbar.css";
import rightLogo from "../assets/Study-Jams-Logo.webp";
import midLogo from "../assets/Cloud-logo.webp";

export default function Navbar() {
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
            src="/GDGLOGOGIF.mp4"
            autoPlay
            muted
            playsInline
            loop={true}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplay"
            width="100"
            height="100"
            style={{ pointerEvents: "auto" }}
          />
        </a>
      </div>

      <a
        href="https://www.cloudskillsboost.google/catalog"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-logo mid navbar-link"
      >
        <img src={midLogo} alt="Cloud Skills Boost Catalog" />
      </a>

      <div className="navbar-logo right">
        <img src={rightLogo} alt="Study Jams Logo" />
      </div>
    </nav>
  );
}
