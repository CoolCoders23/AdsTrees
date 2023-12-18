// Desc: This file contains the Header component of the app
// ============================================================

// Importing Dependencies
// ============================================================
import {
    Box,
    Flex,
    Button,
    Link,
    Text,
    Stack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/image/LogoMain/AdsTrees_Logo_64.svg';

const Header = () => {
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

    const NavLink = ({ to, children, isActive }) => (
        <Button as={RouterLink} to={to} px={2} py={1} rounded={'md'} bg={isActive ? 'orange.500' : undefined} _hover={{ bg: 'gray.300' }} transition="0.3s">
            <Text fontSize={['xs', 'sm', 'md', 'lg', 'xl']} fontFamily={'Arial'}>{children}</Text>
        </Button>
    );

    const NavItems = () => (
        <Stack direction={['column', 'row']} align="center" justify="space-between" spacing={4}>
            <NavLink to='/about' isActive={path === '/about'}>About us</NavLink>
            {Auth.loggedIn() && username !== '' ? (
                <>
                    <NavLink to={`/dashboard/${username}`} isActive={path.startsWith('/dashboard')}>Dashboard</NavLink>
                    <NavLink to='/user-profile' isActive={path === '/user-profile'}>{username}&apos;s profile</NavLink>
                    <Button as={RouterLink} to="/" onClick={logout}>Logout</Button>
                </>
            ) : (
                path !== '/' && <NavLink to='/' isActive={path === '/'}>Login</NavLink>
            )}
        </Stack>
    );

    return (
        <Box borderBottomWidth={1} mb={4} pb={2} p={4}>
            <Flex align={'center'} justify={'space-between'} direction={['column', 'row']} spacing={4}>
                <Flex align={'center'}>
                    <img src={logo} alt="logo" width="100" height="100" />
                    <Link as={RouterLink} to='/' fontSize={['lg', 'xl']} fontWeight={'bold'} ml={2}>AdsTrees</Link>
                </Flex>
                <NavItems />
            </Flex>
        </Box>
    );
};

export default Header;
// ============================================================