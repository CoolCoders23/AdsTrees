// Desc: This file contains the Footer component of the application
// ============================================================

// Importing Dependencies
// ============================================================
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
// ============================================================

// Define the Footer component
// ============================================================
const Footer = () => {

    // Return the JSX for the Footer component
    return (
        <div>
            <footer>
                <div>
                    <div>

                        <div>
                            <p>
                                &copy; {new Date().getFullYear()} AdsTrees, Inc . Privacy . Terms . Donate
                            </p>
                        </div>

                        <Button
                            leftIcon={<FaGithub />}
                            colorScheme='whatsapp'
                            variant= 'outline'
                            as='a'
                            href='https://github.com/CoolCoders23'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label="Github"
                        >
                                    Github
                        </Button>

                        <div>
                            <Link to='/contact'>Contact us</Link>
                        </div>

                        <div>
                            <Link to='/donations'>Donations</Link>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
};
// ============================================================

// Export the Footer component
// ============================================================
export default Footer;
// ============================================================
