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
import { useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/image/LogoMain/AdsTrees_Logo_48.svg';
import { useTheme } from '../../utils/theme/useTheme';
// ============================================================

// Create Header component
// ============================================================
const Header = () => {

    const { theme, darkTheme } = useTheme();

    const location = useLocation();
    const path = location.pathname;

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

    const NavLink = ({ to, children, isActive }) => {

        const colorMode = darkTheme ? 'dark' : 'light';
        const buttonColor = colorMode === 'dark'
            ? theme.colors.dark.greenMedium
            : theme.colors.light.greenMedium;

        return (
            <Button
                as={RouterLink}
                to={to}
                px={2}
                py={1}
                rounded={'md'}
                bg={isActive ? undefined : 'transparent'}
                transition="0.3s"
                color={buttonColor}
                variant="outline"
            >
                <Text
                    fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                    textStyle="mainlogofont"
                >
                    {children}
                </Text>
            </Button>
        );
    };

    const NavItems = () => (

        <Stack
            direction={['column', 'row']}
            align="center"
            justify="space-between"
            spacing={4}
        >
            <NavLink
                to='/about'
                isActive={path === '/about'}
            >
                About us
            </NavLink>

            {Auth.loggedIn() && username !== '' ? (
                <>
                    <NavLink
                        to={`/dashboard/${username}`}
                        isActive={path.startsWith('/dashboard')}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to='/user-profile'
                        isActive={path === '/user-profile'}
                    >
                        {username}&apos;s profile
                    </NavLink>
                    <Button
                        as={RouterLink}
                        to="/" onClick={logout}
                    >
                        Logout
                    </Button>
                </>
            ) : (
                path !== '/'
                    &&
                    <NavLink to='/' isActive={path === '/'}>
                            Login
                    </NavLink>
            )}

        </Stack>
    );

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
                            textStyle="mainlogofont"
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