// Desc: this file contains the DonationHistory component
// which is a child of the Profile component
// this component displays the user's donation history
// =========================================================

// import dependencies
// =========================================================
import { useQuery } from '@apollo/client';
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
    useColorModeValue
} from '@chakra-ui/react';
// =========================================================

// Define DonationHistory component
// =========================================================
const DonationHistory = () => {

    const bg = useColorModeValue('gray.200', 'gray.700');
    const color = useColorModeValue('black', 'white');

    const profile = Auth.getProfile();
    const userId = profile?.data._id;
    const username = profile?.data.username;

    const { loading, data } = useQuery(QUERY_PURCHASES, {
        variables: { userId: userId },
        skip: !Auth.loggedIn()
    });
    console.log(data);

    const { data: userData } = useQuery(QUERY_USER, {
        variables: { username: username },
        skip: !Auth.loggedIn()
    });
    console.log(userData);

    if (!Auth.loggedIn()) {
        return (
            <Box bg={bg} color={color} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading as="h2" size="lg" mb={5}>Donation History</Heading>
                <Text as="strong" fontSize="lg">Please log in to see your donation history.</Text>
            </Box>
        );
    }

    const totalDonations = userData?.user.totalDonations || 0;
    const purchases = data?.purchases || [];

    return (
        <Box bg={bg} color={color} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading as="h2" size="lg" mb={5}>Donation History</Heading>
            {purchases.map((purchase) => (
                <Box key={purchase._id} mb={5}>
                    <Heading as="h3" size="md" mb={3}>{purchase.purchaseDate}</Heading>
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
                                    <Td><Image boxSize="50px" src={`/images/${image}`} alt={donationType} /></Td>
                                    <Td>{donationAmount}</Td>
                                    <Td>${price}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            ))}
            <Box>
                <Text as="strong" fontSize="lg">Total Donated Trees: {totalDonations}</Text>
            </Box>
            {loading ? <Spinner size="xl" /> : null}
        </Box>
    );
};
// =========================================================

// export DonationHistory component
// =========================================================
export default DonationHistory;
// =========================================================