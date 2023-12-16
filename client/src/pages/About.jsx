// Desc: This file contains About Us page of the app
// =====================================================

// Import dependencies
// =====================================================
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
// =====================================================

// Import component
// =====================================================
import TeamComponent from '../components/About/Team.jsx';
// =====================================================

// About Component
// =====================================================
const About = () => {
    return (
        <Container maxW='container.xl'>
            <VStack spacing={10} align='stretch'>

                {/* Mission Section */}
                <Box>
                    <Heading as='h2' size='xl' mb={4}>Our Mission</Heading>
                    <Text fontSize='lg'>Inspiring Change Through Engagement: AdsTrees combines digital advertising with environmental sustainability, empowering individuals and businesses to contribute to global reforestation efforts.</Text>
                </Box>

                {/* How It Works Section */}
                <Box>
                    <Heading as='h2' size='xl' mb={4}>How It Works</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <VStack align='start'>
                            <Heading as='h3' size='lg'>For Viewers</Heading>
                            <Text>Viewers can watch ads and contribute to tree planting. Each ad view leads to a tangible environmental impact.</Text>
                        </VStack>
                        <VStack align='start'>
                            <Heading as='h3' size='lg'>For Advertisers</Heading>
                            <Text>Advertisers get premium ad space and showcase their commitment to sustainability, with direct impact on environmental initiatives.</Text>
                        </VStack>
                    </SimpleGrid>
                </Box>

                {/* Team Section */}
                <Box>
                    <Heading as='h2' size='xl' mb={4}>Meet the Team</Heading>
                    <Text>Meet the passionate individuals behind AdsTrees, dedicated to merging technology, advertising, and environmental sustainability.</Text>
                    <TeamComponent />
                </Box>

                {/* Environmental Impact Section */}
                <Box>
                    <Heading as='h2' size='xl' mb={4}>Environmental Impact</Heading>
                    <Text>AdsTrees has made significant contributions to reforestation and carbon offset. Here are some of our achievements:</Text>
                    {/* Impact statistics and stories can be added here */}
                </Box>

            </VStack>
        </Container>
    );
};
// =====================================================

// Exports
// =====================================================
export default About;
// =====================================================