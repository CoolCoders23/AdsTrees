// Desc: this file contains the DonationHistory component
// which is a child of the Profile component
// this component displays the user's donation history
// =========================================================

// import dependencies
// =========================================================
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_PURCHASES, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import {
    Box,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
// =========================================================

// Define DonationHistory component
// =========================================================
const DonationHistory = () => {

    const bg = '#081c15';
    const color = '#e8f5f1';

    const [purchases, setPurchases] = useState([]);
    const [totalDonations, setTotalDonations] = useState(0);

    const profile = Auth.getProfile();
    const userId = profile?.data._id;
    const username = profile?.data.username;

    const { loading, error, data, refetch } = useQuery(QUERY_PURCHASES, {
        variables: { userId: userId },
    });

    const {
        loading: userLoading,
        error: userError,
        data: userData,
        refetch: userRefetch,
    } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    useEffect(() => {
        if (!loading && data) {
            setPurchases(data?.purchases || []);
        }

        if (!userLoading && userData) {
            setTotalDonations(userData?.user?.totalDonations || 0);
        }
    }, [loading, data, userLoading, userData]);

    useEffect(() => {
        if (purchases.length > 0) {
            refetch();
        }
    }, [purchases, refetch]);

    useEffect(() => {
        if (totalDonations > 0) {
            userRefetch();
        }
    }, [totalDonations, userRefetch]);

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                There was an error processing your request.
            </Alert>
        );
    }

    if (userLoading) {
        return <Spinner size="xl" />;
    }

    if (userError) {
        return (
            <Alert status="error">
                <AlertIcon />
                There was an error processing your request.
            </Alert>
        );
    }

    if (!Auth.loggedIn()) {
        return (
            <Box bg={bg} color={color} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading as="h2" size="lg" mb={5}>Donation History</Heading>
                <Text as="strong" fontSize="lg">Please log in to see your donation history.</Text>
            </Box>
        );
    }

    return (
        <Box
            bg={bg}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            fontFamily="Roboto, system-ui, sans-serif"
            fontWeight={'light'}
            color="#f5a61d"
        >
            <Heading
                as="h2"
                size="lg"
                mb={5}
                fontWeight={'light'}
            >
                Donation History
            </Heading>
            {purchases.map((purchase) => (
                <Box key={purchase._id} mb={4}>
                    <Heading
                        as="h3"
                        size="xs"
                        mb={4}
                        fontWeight={'light'}
                        borderTopWidth={2}
                        pt={3}
                    >
                        {purchase.purchaseDate}
                    </Heading>
                    {purchase.donations && (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Donation Type</Th>
                                    <Th>Payment Status</Th>
                                    <Th>Donated Trees</Th>
                                    <Th>Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{purchase.donations.donationType}</Td>
                                    <Td>{purchase.paymentStatus}</Td>
                                    <Td>{purchase.donations.donationAmount}</Td>
                                    <Td>${purchase.donations.price}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    )}
                </Box>
            ))}
            <Box borderTopWidth={2} pt={3}>
                <Text as="strong" fontSize="lg">Total Donated Trees: {totalDonations}</Text>
            </Box>
        </Box>
    );
};
// =========================================================

// export DonationHistory component
// =========================================================
export default DonationHistory;
// =========================================================