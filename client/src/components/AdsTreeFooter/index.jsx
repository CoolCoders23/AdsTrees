/* Code generated with AutoHTML Plugin for Figma */
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = ({ className }) => {
    return (
        <footer className={'footer ' + className}>
            <div className="footer-content">
                <div className="copyright-frame">
                    <div className="copyright">© {new Date().getFullYear()} AdsTrees </div>
                </div>
                <div className="footer-links">

                    <Link
                        className="privacy-link-label"
                        to='/privacy'>Privacy</Link>

                    <Link
                        className="terms-link-label"
                        to='/terms'>Terms</Link>

                    <Link
                        className="donate-link-label"
                        to='/donations'>Donations</Link>




                </div>
            </div>
        </footer>
    );
};
