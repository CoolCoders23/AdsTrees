// Desc: This file contains the ProfilePic component that is responsible for rendering the user profile picture.
// Used the followings as reference:
// https://chakra-ui.com/docs/components/modal
// https://docs.imagekit.io/getting-started/quickstart-guides/react
// ================================================================

// Importing the necessary packages
// ================================================================
import './ImageUpload.css';
import { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    CloseButton
} from '@chakra-ui/react';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import Auth from '../../utils/auth';
// ================================================================

// Define urlEndpoint, publicKey, privateKey and ImageKIt Configurations
// ================================================================
const urlEndpoint = 'https://ik.imagekit.io/AdsTrees/';
const publicKey = 'public_RlGVX/xg/V+550gldyvIPawTwII=';

const authenticator = async () => {
    try {
        const response = await fetch('http://localhost:3001/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
// ================================================================

// Define a function to use fetch to send a request to the server with delete method and body set to send the fileId, to remove profile picture from imagekit
// ================================================================
const deleteProfilePicture = async (fileId) => {
    try {
        const response = await fetch('http://localhost:3001/delete-profile-picture', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId }),
        });

        if (response.ok) {
            console.log(`File ${fileId} deleted successfully.`);
            localStorage.removeItem('fileId');
        } else {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

    } catch (error) {
        throw new Error(`Delete request failed: ${error.message}`);
    }

};
// ================================================================

// ImageUpload component
// ================================================================
const ImageUpload= () => {

    // Define username
    const username = Auth.getProfile().data.username;

    // State to manage modal visibility
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Define state to store the uploaded image path
    const [imagePath, setImagePath] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const [message, setMessage] = useState('');

    const onSuccess = res => {
        console.log('Success', res);
        setImagePath(res.filePath);
        setUploadStatus('success');
        setMessage(
            'Your profile picture has been updated! Please refresh the page.'
        );
        localStorage.setItem('profilePicture', res.filePath);
        localStorage.setItem('fileId', res.fileId);
    };

    const onError = err => {
        console.log('Error', err);
        setMessage(
            'An error occurred while uploading your profile picture.Please refresh try again.'
        );
        setUploadStatus('error');
    };

    useEffect(() => {
        const profilePicture = localStorage.getItem('profilePicture');
        if (profilePicture) {
            setImagePath(profilePicture);
        }
    }, []);

    const imageRemoveHandler = async () => {
        const fileId = localStorage.getItem('fileId');
        setImagePath('');
        setUploadStatus('removed');
        setMessage(
            'Your profile picture has been removed! Please refresh the page.'
        );
        localStorage.removeItem('profilePicture');
        await deleteProfilePicture(fileId);
    };

    // Styling
    // ============================================================
    const imageKitStyle={
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        height: '100%',
        backgroundColor: '#49454f',
        border: '2px solid #b4b4b429',
        borderRadius: '10px',
        color: '#d9d9d9',
        padding: '15px',
        marginTop: '5px',
        boxShadow: '0 2px 5px 3px rgba(0,0,0,0.2)',
        fontSize: '20px',
    };

    const closeBtStyle = {
        backgroundColor: '#49454f',
        border: '2px solid #b4b4b429',
        borderRadius: '7px',
        color: '#d9d9d9',
        padding: '10px',
        boxShadow: '0 2px 5px 3px rgba(0,0,0,0.2)',
        fontSize: '18px',
        cursor: 'pointer',
        width: '100%',
    };

    const ikImageStyle = {
        objectFit: 'cover',
        borderRadius: '50%',
    };
    // ============================================================

    return (
        <Box className="profile-picture-frame">

            {imagePath ? (
                <Box className="picture">
                    <IKContext
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticator={authenticator}
                    >
                        <IKImage
                            path={imagePath}
                            transformation={[
                                {
                                    cropMode: 'pad_resize',
                                    quality: '85',
                                    focus: 'face',
                                    zoom: '0.5',
                                    dpr: 'dpr-auto',
                                    trim: 't-10',
                                    width: '150',
                                    height: '150',
                                },
                            ]}
                            lqip={{ active:true }}
                            alt='Profile Picture'
                            loading='lazy'
                            width="150"
                            height="150"
                            style={ikImageStyle}
                        />
                    </IKContext>
                </Box>
            ) : (
                <svg
                    className="picture"
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M38.0002 6.33331C29.6016 6.33331 21.5471 9.66961 15.6084 15.6083C9.6698 21.5469 6.3335 29.6015 6.3335 38C6.3335 46.3985 9.6698 54.453 15.6084 60.3917C21.5471 66.3303 29.6016 69.6666 38.0002 69.6666C46.3987 69.6666 54.4532 66.3303 60.3919 60.3917C66.3305 54.453 69.6668 46.3985 69.6668 38C69.6668 29.6015 66.3305 21.5469 60.3919 15.6083C54.4532 9.66961 46.3987 6.33331 38.0002 6.33331Z"
                        fill="#EDE7F6"
                    />
                    <path
                        d="M44.3332 49.0833C44.3332 49.0833 44.3332 55.4166 37.9998 55.4166C31.6665 55.4166 31.6665 49.0833 31.6665 49.0833"
                        fill="#FF9800"
                    />
                    <path
                        d="M38.0002 69.6666C45.0967 69.6666 51.6248 67.3043 56.9036 63.3618C55.9235 51.3823 43.9377 49.0833 43.9377 49.0833L38.0002 50.3025L32.0627 49.0833C32.0627 49.0833 20.0737 51.338 19.0952 63.3618C24.3756 67.3043 30.9037 69.6666 38.0002 69.6666Z"
                        fill="#673AB7"
                    />
                    <path
                        d="M37.9998 58.5833C42.8432 58.5833 46.8316 54.9543 47.4175 50.2708C46.0178 49.6407 44.8794 49.3097 44.3236 49.1736C44.2746 52.6268 41.4657 55.4167 37.9998 55.4167C34.5323 55.4167 31.7235 52.6268 31.676 49.1704C31.1171 49.3066 29.9802 49.6343 28.5806 50.2597C29.1601 54.9496 33.1516 58.5833 37.9998 58.5833Z"
                        fill="#311B92"
                    />
                    <path
                        d="M50.6668 35.625C50.6668 36.936 49.6028 38 48.2918 38C46.9792 38 45.9168 36.936 45.9168 35.625C45.9168 34.314 46.9792 33.25 48.2918 33.25C49.6028 33.25 50.6668 34.314 50.6668 35.625ZM30.0835 35.625C30.0835 34.314 29.0195 33.25 27.7085 33.25C26.3975 33.25 25.3335 34.314 25.3335 35.625C25.3335 36.936 26.3975 38 27.7085 38C29.0195 38 30.0835 36.936 30.0835 35.625ZM44.3335 49.0833V42.75H31.6668V49.0833C31.6668 49.0833 31.6668 55.4167 38.0002 55.4167C44.3335 55.4167 44.3335 49.0833 44.3335 49.0833Z"
                        fill="#C16E14"
                    />
                    <path
                        d="M49.0832 29.5767C49.0832 20.2683 26.9165 23.5173 26.9165 29.5767V36.5291C26.9165 42.5838 31.8771 47.5016 37.9998 47.5016C44.121 47.5016 49.0832 42.5854 49.0832 36.5291V29.5767Z"
                        fill="#E5852E"
                    />
                    <path
                        d="M38.0002 17.4167C30.3052 17.4167 25.3335 24.2456 25.3335 30.3557V33.25L28.5002 36.4167V30.0834L43.0668 25.3334L47.5002 30.0834V36.4167L50.6668 33.25V31.9691C50.6668 26.8739 49.3511 21.1977 43.0668 19.9484L41.7986 17.4167H38.0002Z"
                        fill="#6D4C41"
                    />
                    <path
                        d="M41.1665 34.8333C41.1665 33.9609 41.8758 33.25 42.7498 33.25C43.6238 33.25 44.3332 33.9609 44.3332 34.8333C44.3332 35.7058 43.6238 36.4167 42.7498 36.4167C41.8758 36.4167 41.1665 35.7058 41.1665 34.8333ZM31.6665 34.8333C31.6665 35.7058 32.3758 36.4167 33.2498 36.4167C34.1238 36.4167 34.8332 35.7058 34.8332 34.8333C34.8332 33.9609 34.1238 33.25 33.2498 33.25C32.3758 33.25 31.6665 33.9609 31.6665 34.8333Z"
                        fill="#212121"
                    />
                </svg>
            )}

            <button className="edit-picture-button" onClick={onOpen}>
                <div className="ellipse"></div>
                <svg
                    className="edit-icon"
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_959_1525)">
                        <path
                            d="M11.6639 1.59706C11.4261 1.35934 11.1141 1.23999 10.802 1.23999C10.49 1.23999 10.1779 1.35934 9.94017 1.59706C9.94017 1.59706 9.92256 1.61369 9.90006 1.63716C9.8981 1.63912 9.89517 1.6401 9.89321 1.64206L1.07713 10.4572C1.0468 10.4885 1.0243 10.5266 1.01256 10.5697L0.509735 12.445C0.486257 12.5311 0.510714 12.623 0.5743 12.6866C0.622235 12.7346 0.685822 12.76 0.751366 12.76C0.772887 12.76 0.794409 12.7571 0.815931 12.7512L2.69126 12.2484C2.7343 12.2366 2.77245 12.2141 2.80376 12.1828L11.6189 3.36869C11.6218 3.36575 11.6228 3.36184 11.6247 3.3589C11.6472 3.3364 11.6629 3.32075 11.6629 3.32075C12.1403 2.84434 12.1403 2.07249 11.6639 1.59706ZM11.3097 1.95119C11.5895 2.23097 11.5895 2.68684 11.3097 2.96662C11.2266 3.04879 11.1561 3.12021 11.0955 3.18086L10.0801 2.16543C10.1955 2.04999 10.2943 1.95119 10.2943 1.95119C10.4293 1.81521 10.6103 1.74086 10.802 1.74086C10.9938 1.74086 11.1738 1.81619 11.3097 1.95119ZM1.40387 11.0451L2.21582 11.8571L1.1055 12.1554L1.40387 11.0451Z"
                            fill="#081C15"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_959_1525">
                            <rect
                                width="12.5217"
                                height="12.5217"
                                fill="white"
                                transform="translate(0 0.739136)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='slideInRight'
                size={'xl'}
                isCentered
            >
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='40%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>Upload or Remove a Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        p={7}
                        borderBottom={'2px'}
                        borderColor={'#b4b4b484'}
                    >

                        <Alert status='warning' mb={3}>
                            <AlertIcon />
                            <AlertTitle>Notice:</AlertTitle>
                            <AlertDescription>
                                The Profile Picture size must be less than 2 MB
                            </AlertDescription>
                        </Alert>

                        <IKContext
                            publicKey={publicKey}
                            urlEndpoint={urlEndpoint}
                            authenticator={authenticator}
                        >
                            <IKUpload
                                fileName={`AdsTrees_${username}`}
                                onSuccess={onSuccess}
                                onError={onError}
                                useUniqueFileName={true}
                                validateFile={file => file.size < 2000000}
                                folder={`/AdsTrees/${username}`}
                                style={imageKitStyle}
                            />
                        </IKContext>

                    </ModalBody>

                    <ModalFooter
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'flex-end'}
                        justifyContent={'center'}
                        gap={3}
                    >

                        <button onClick={onClose} style={closeBtStyle}>
                            Close
                        </button>

                        {imagePath && (
                            <button onClick={imageRemoveHandler} style={closeBtStyle}>
                                Remove Profile Picture
                            </button>
                        )}

                        {
                            uploadStatus === 'error' ||
                            uploadStatus === 'success' ||
                            uploadStatus === 'removed' ? (
                                    <Alert
                                        status={
                                            uploadStatus === 'error' ? 'error'
                                                : uploadStatus === 'success' ? 'success'
                                                    : 'info'}
                                        ml={5}
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        justifyContent={'flex-start'}
                                    >
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle>
                                                {uploadStatus === 'error' ? 'Error!'
                                                    : uploadStatus === 'success' ? 'Success!'
                                                        : 'Profile Picture removed!'}
                                            </AlertTitle>
                                            <AlertDescription>
                                                {message}
                                            </AlertDescription>
                                        </Box>
                                        <CloseButton
                                            alignSelf='flex-start'
                                            flexGrow={1}
                                            position='relative'
                                            right={-1}
                                            top={-1}
                                            onClick={onClose}
                                        />
                                    </Alert>
                                ) : null
                        }

                    </ModalFooter>

                </ModalContent>
            </Modal>

        </Box>
    );
};
// ==============================================================

// Exporting the ProfilePic component
// ================================================================
export default ImageUpload;
// ================================================================