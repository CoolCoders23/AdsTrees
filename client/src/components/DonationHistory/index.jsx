// Desc: this file contains the DonationHistory component
// which is a child of the Profile component
// this component displays the user's donation history
// =========================================================

// import dependencies
// =========================================================
import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { UPDATE_DONATIONS } from '../../utils/payment-logic/actions';
import { QUERY_PURCHASES, QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import {
    Box,
    Heading,
    Text,
    Image,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    useColorModeValue,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
// =========================================================

// Define DonationHistory component
// =========================================================
const DonationHistory = () => {

    const bg = '#081c15';
    const color = '#e8f5f1';

    const client = useApolloClient();
    const [state, dispatch] = useStateContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalDonations, setTotalDonations] = useState(0);

    const profile = Auth.getProfile();
    const userId = profile?.data._id;
    const username = profile?.data.username;

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoading(true);
                setError(null);

                const { data } = await client.query({
                    query: QUERY_PURCHASES,
                    variables: { userId: userId },
                });

                const { data: userData } = await client.query({
                    query: QUERY_USER,
                    variables: { username: username },
                });

                setTotalDonations(userData?.user?.totalDonations || 0);

                dispatch({
                    type: UPDATE_DONATIONS,
                    donations: data?.purchases || [],
                });

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [client, userId, username, dispatch]);

    const purchases = state.donations;

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
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Donation Type</Th>
                                <Th>Image</Th>
                                <Th>Donated Trees</Th>
                                <Th>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {purchase.donations?.map(({ image, donationType, donationAmount, price }, index) => (
                                <Tr key={index}>
                                    <Td>{donationType}</Td>
                                    <Td>
                                        <Image
                                            boxSize="50px"
                                            src={`/images/${image}`}
                                            alt={donationType} />
                                    </Td>
                                    <Td>{donationAmount}</Td>
                                    <Td>${price}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
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