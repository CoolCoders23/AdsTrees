/* Code generated with AutoHTML Plugin for Figma */
import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = ({ className }) => {
    return (
        <footer className={'footer ' + className}>
            <div className="footer-content">
                <div className="copyright-frame">
                    <div className="copyright">
                        © {new Date().getFullYear()} AdsTrees
                    </div>
                </div>
                <div className="footer-links">

                    <span className="privacy-link-label">
                        Privacy
                    </span>

                    <span className="terms-link-label">
                        Terms
                    </span>

                    <Link
                        className="donate-link-label"
                        to='/donations'>
                        Donations
                    </Link>

                    <Link
                        className="donate-link-label"
                        to='/contact'>
                        Contact
                    </Link>

                    <Link
                        className="donate-link-label"
                        to='/about'>
                        About
                    </Link>

                    <a
                        className="donate-link-label"
                        href='https://github.com/CoolCoders23/AdsTrees'
                        target='_blank'
                        rel='noopener noreferrer'>
                        GitHub
                    </a>

                </div>
            </div>
        </footer>
    );
};
