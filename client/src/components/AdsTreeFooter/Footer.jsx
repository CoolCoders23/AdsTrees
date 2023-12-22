/* Code generated with AutoHTML Plugin for Figma */
import './Footer.css';

export const Footer = ({ className, ...props }) => {
    return (
        <footer className={'footer ' + className}>
            <div className="footer-content">
                <div className="copyright-frame">
                    <div className="copyright">© {new Date().getFullYear()} AdsTrees </div>
                </div>
                <div className="footer-links">
                    <button className="privacy-link-label">Privacy </button>
                    <button className="terms-link-label">Terms </button>
                    <button className="donate-link-label">Donate </button>
                </div>
            </div>
        </footer>
    );
};
