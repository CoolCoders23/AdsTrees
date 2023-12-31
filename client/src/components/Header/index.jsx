// Desc: This file contains the Header component of the app
// Used the following as a reference:
// https://chakra-ui.com/docs/layout/stack
// https://chakra-ui.com/docs/layout/flex
// https://chakra-ui.com/docs/getting-started
// https://chakra-ui.com/docs/components
// https://chakra-ui.com/docs/theming/theme
// https://chakra-ui.com/docs/features/responsive-styles
// ============================================================

// Importing Dependencies
// ============================================================
import {
    Box,
    Flex,
    Button,
    Link,
    Text,
    Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/image/LogoMain/AdsTrees_Logo_48.svg';
// ============================================================

// Create Header component
// ============================================================
const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    let username = '';
    try {
        const profile = Auth.getProfile();
        if (profile !== null) {
            username = profile.data.username;
        }
    } catch (error) {
        console.error('Failed to get username', error);
    }

    const NavLink = ({ to, children}) => {

        return (

            <Button
                as={RouterLink}
                to={to}
                px={2}
                py={1}
                rounded={'md'}
                transition="0.3s"
            >

                <Text
                    fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                    fontFamily={'Poppins, Georgia, serif'}
                >
                    {children}
                </Text>

            </Button>

        );
    };

    const NavItems = () => {

        return (

            <Stack
                direction={['column', 'row']}
                align="center"
                justify="space-between"
                spacing={4}
            >

                {Auth.loggedIn() && username !== '' ? (
                    <>

                        <NavLink to={`/dashboard/${username}`}>Dashboard</NavLink>

                        <NavLink to='/user-profile'>{username}&apos;s profile</NavLink>

                        <Button
                            as={RouterLink}
                            to="/"
                            onClick={logout}
                            fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                            fontFamily={'Poppins, Georgia, serif'}
                        >
                            Logout
                        </Button>

                    </>

                ) : null}

            </Stack>
        );
    };

    return (
        <Box mx={{ base: 4, md: 80 }} p={8} >
            <Flex
                align={'center'}
                justify={'space-between'}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
            >
                <Flex align={'center'}>
                    <img
                        src={logo}
                        alt="logo"
                    />
                    <Link
                        as={RouterLink}
                        to='/'
                        fontSize={['lg', 'xl']}
                        fontWeight={'bold'}
                        ml={2}
                    >
                        <Text
                            fontSize={['lg', 'xl']}
                            fontFamily={'Poppins, Georgia, serif'}
                        >
                            AdsTrees
                        </Text>
                    </Link>
                </Flex>
                <NavItems />
            </Flex>
        </Box>
    );
};
// ============================================================

// Exporting component
// ============================================================
export default Header;
// ============================================================
