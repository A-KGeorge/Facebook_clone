import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="login_footer" style={{ marginTop: "60px" }}>
      <div className="login_footer_wrap">
        <Link to="/">English (US)</Link>
        <Link to="/">Français (Canada)</Link>
        <Link to="/">Español</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">한국어</Link>
        <Link to="/">日本語</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Italiano</Link>
        <Link to="/">العربية</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
        <div className="footer_splitter"></div>
        <div className="login_footer_wrap">
          <Link to="/">Sign Up</Link>
          <Link to="/">Log In</Link>
          <Link to="/">Messenger</Link>
          <Link to="/">Facebook Lite</Link>
          <Link to="/">Watch</Link>
          <Link to="/">Places</Link>
          <Link to="/">Games</Link>
          <Link to="/">Marketplace</Link>
          <Link to="/">Meta Pay</Link>
          <Link to="/">Meta Store</Link>
          <Link to="/">Meta Quest</Link>
          <Link to="/">Instagram</Link>
          <Link to="/">Fundraisers</Link>
          <Link to="/">Services</Link>
          <Link to="/">Voting Information Center</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Privacy Center</Link>
          <Link to="/">Groups</Link>
          <Link to="/">About</Link>
          <Link to="/">Create</Link>
          <Link to="/">
            AdChoices
            <i className="adChoices_icon"></i>
          </Link>
          <Link to="/">Terms</Link>
          <Link to="/">Help</Link>
        </div>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2023
        </Link>
      </div>
    </footer>
  );
}
