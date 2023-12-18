// Desc: This file contains Team component of the About Us page
// Used the following documentations as reference:
// https://chakra-ui.com/docs/components
// https://www.framer.com/motion/component/
// ============================================================

// Importing Dependencies
// ============================================================
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { motion } from 'framer-motion';
import pageAnimation from './pageAnimation';
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
                direction={{ base: 'column', md: 'row' }}
                align='stretch'
                justify='center'
                minH='100vh'
                bg='inherit'
                flexWrap='wrap'
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
                        flexBasis={{ base: '100%', md: '45%' }}
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            w='100%'
                            h='auto'
                        />
                        <Box p='6'>
                            <Box
                                d='flex'
                                alignItems='baseline'
                                justifyContent={{ base: 'center', md: 'flex-start' }}
                                flexWrap='wrap'
                            >
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

                            <Box
                                mt='1'
                                fontWeight='semibold'
                                as='h4'
                                lineHeight='tight'
                            >
                                {member.name}
                            </Box>

                            <Box>
                                <Text mt='2' color='gray.500'>
                                    {member.bio}
                                </Text>
                            </Box>

                            <Box
                                d='flex'
                                m='2'
                                p='2'
                                alignItems='center'
                                justifyContent={{ base: 'center', md: 'flex-start' }}
                                flexWrap='wrap'
                            >
                                <Button
                                    leftIcon={<FaGithub />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as='a'
                                    href={ member.github }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label="Github"
                                    m={2}
                                >
                                    Github
                                </Button>
                                <Button
                                    leftIcon={<FaLinkedin />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as='a'
                                    href={ member.linkedIn }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </Button>
                                <Button
                                    leftIcon={<FaBriefcase />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as='a'
                                    href={ member.portfolio }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label="Portfolio"
                                    m={2}
                                >
                                    Portfolio
                                </Button>
                                <Button
                                    leftIcon={<SiGmail />}
                                    colorScheme='teal'
                                    variant='outline'
                                    as='a'
                                    href={ `mailto:${member.email}` }
                                    target='_blank'
                                    rel='noopener noreferrer'
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