// Desc: This file contains Team component of the About Us page
// Used the following documentations as reference:
// https://chakra-ui.com/docs/components
// https://www.framer.com/motion/component/
// ============================================================

// Importing Dependencies
// ============================================================
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { motion } from 'framer-motion';
import { pageAnimation } from './pageAnimation';
import teamData from '../../utils/teamData';
// ============================================================

// Team Component
// ============================================================
const Team = () => {

    return (
        <motion.div
            variants={pageAnimation}
            initial='hidden'
            animate='show'
            exit='exit'
        >
            <Flex
                direction='column'
                align='center'
                justify='center'
                minH='100vh'
                bg='gray.100'
            >
                {teamData.map((member, index) => (
                    <Box
                        key={index}
                        maxW='sm'
                        borderWidth='1px'
                        borderRadius='lg'
                        overflow='hidden'
                        boxShadow='lg'
                        bg='white'
                        p='6'
                        m='6'
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            w='100%'
                            h='auto'
                        />
                        <Box p='6'>
                            <Box d='flex' alignItems='baseline'>
                                <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    textTransform='uppercase'
                                    ml='2'
                                >
                                    {member.title}
                                </Text>
                            </Box>

                            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
                                {member.name}
                            </Box>

                            <Box>
                                <Text mt='2' color='gray.500'>
                                    {member.bio}
                                </Text>
                            </Box>

                            <Box d='flex' mt='2' alignItems='center'>
                                <Button
                                    leftIcon={<FaGithub />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as={Link}
                                    to={{ pathname: member.github }}
                                    isExternal
                                    aria-label="Github"
                                >
                                    Github
                                </Button>
                                <Button
                                    leftIcon={<FaLinkedin />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as={Link}
                                    to={{ pathname: member.linkedIn }}
                                    isExternal
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </Button>
                                <Button
                                    leftIcon={<FaBriefcase />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as={Link}
                                    to={{ pathname: member.portfolio }}
                                    isExternal
                                    aria-label="Portfolio"
                                >
                                    Portfolio
                                </Button>
                                <Button
                                    leftIcon={<SiGmail />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as={Link}
                                    to={{ pathname: `mailto:${member.email}` }}
                                    isExternal
                                    aria-label="Email"
                                >
                                    Email
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Flex>
        </motion.div>
    );
};

// Exporting About Page
// ============================================================
export default Team;
// ============================================================