// Desc: This file contains the ProfilePic component that is responsible for rendering the user profile picture.
// Used the followings as reference:
// https://chakra-ui.com/docs/components/modal
// https://docs.imagekit.io/getting-started/quickstart-guides/react
// ================================================================

// Importing the necessary packages
// ================================================================
import './ImageUpload.css';
// import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
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

const onError = err => {
    console.log('Error', err);
};

const onSuccess = res => {
    console.log('Success', res);
};
// ================================================================

// ImageUpload component
// ================================================================
const ImageUpload= () => {

    // Define username
    const username = Auth.getProfile().data.username;

    // State to manage modal visibility
    const { isOpen, onOpen, onClose } = useDisclosure();

    const imageKitStyle={

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        border: '1px solid #000',
        borderRadius: '10px',
        color: '#000',
        padding: '20px',
        marginTop: '10px',

    };

    // const [message, setMessage] = useState('');

    return (
        <Box>

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
                    <ModalHeader>Upload a Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={2} mt={3}>

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
                                extensions={[{
                                    'name': 'remove-bg',
                                    'options': {
                                        'add_shadow': true,
                                    },
                                }]}
                                style={imageKitStyle}
                            />
                            {/* TODO: get the Response from ImageKit and return
                                TODO: display the uploaded image in profile page
                                TODO: Style the <IKImage>
                                TODO: Display success message
                                <IKImage
                                    path='/AdsTrees/EhsanAsh/AdsTrees_EhsanAsh_7eWpSUvrn'
                                    transformation={[
                                        {
                                            cropMode: 'fo-face',
                                            quality: '85',
                                            width: '250',
                                            height: '250',
                                        },
                                    ]}
                                    alt='Profile Picture'
                                    loading="lazy"
                                />
                            </IKUpload> */}

                        </IKContext>

                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
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