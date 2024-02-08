/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the footer component of the application.
// Used the followings as reference:
// https://chakra-ui.com/docs/styled-system/chakra-factory
// https://chakra-ui.com/docs/components/switch/usage
// https://chakra-ui.com/docs/styled-system/style-props
// https://chakra-ui.com/docs/styled-system/customize-theme
// ================================================================

// Import dependencies
// ================================================================
import './Footer.css';
import { Link } from 'react-router-dom';
import { useColorMode, Switch, Box, IconButton, chakra } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
// ================================================================

// Footer component
// ================================================================
export const Footer = ({ className }) => {

    const StyledModeBox = chakra(Box, {
        base: {
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 1,
            position: 'relative',
        },
        md: {
            justifyContent: 'flex-end',
            flexGrow: 1,
        },
    });

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <Box className={'footer ' + className}>
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
            <StyledModeBox>
                <SunIcon mr={2} />
                <Switch colorScheme="green" isChecked={isDark} onChange={toggleColorMode} />
                <MoonIcon ml={2} />
            </StyledModeBox>
        </Box>
    );
};
// ================================================================
