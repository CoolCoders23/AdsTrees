// Desc: This file contains the AdsTreesProfile component that is responsible for rendering the user profile page. It also contains the logic to update the user profile and delete the user account.
// Used the followings as reference:
// https://chakra-ui.com/docs/components/alert-dialog
// ================================================================

// Importing the necessary packages
// ================================================================
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER_PROFILE } from '../../utils/queries';
import { UPDATE_USER, REMOVE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import DonationHistory from '../../components/DonationHistory';
import './AdsTreesProfile.css';
import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import ImageUpload from '../../components/ImageUpload';
// import { CategoriesCheckboxes } from '../pages/AdsTreesProfile/CheckboxGroup/CheckboxGroup';
// ==============================================================

// Defining the AdsTreesProfile component
// ================================================================
const Profile = () => {

    // State to manage dialog visibility and messages
    const [dialog, setDialog] = useState({
        isOpen: false,
        title: '',
        message: ''
    });

    // Function to show dialog
    const showDialog = (title, message) => {
        setDialog({
            isOpen: true,
            title: title,
            message: message
        });
    };

    // Function to close dialog
    const closeDialog = () => {
        setDialog({
            title: '',
            message: '',
            isOpen: false
        });
    };

    const cancelRef = React.useRef();

    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        newPassword: '',
        passwordConfirmation: '',
        // preferences: []
    });

    const [confirmDialog, setConfirmDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { data, loading, error } = useQuery(QUERY_USER_PROFILE);
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const [removeUserMutation] = useMutation(REMOVE_USER);

    useEffect(() => {

        const profile = Auth.getProfile();
        if (data && data.userProfile) {
            setProfileData({
                _id: profile.data._id,
                username: data.userProfile.username || '',
                email: data.userProfile.email || '',
                newPassword: '',
                passwordConfirmation: '',
                // preferences: data.userProfile.preferences || []
            });
        }

    }, [data]);

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setProfileData(prevState => {
            const updatedState = { ...prevState, [name]: value };
            return updatedState;
        });

    };

    const handleUpdateProfile = async () => {

        if (profileData.newPassword !== profileData.passwordConfirmation) {
            showDialog('Incorrect Password', 'Passwords do not match! Please try again.');
            return;
        }

        // Prepare the update data
        const updateData = {
            _id: profileData._id,
            username: profileData.username,
            email: profileData.email,
            ...(profileData.newPassword && { password: profileData.newPassword }),
        };

        try {
            const response = await updateUserMutation({
                variables: { user: updateData }
            });

            // Handle successful update
            if (response.data.updateUser) {
                setProfileData(response.data.updateUser);
                showDialog('Profile Updated', 'Your profile has been updated successfully! You will be logged out shortly.');
                setTimeout(() => {
                    Auth.logout();
                }, 4000);
            }
        } catch (e) {
            console.error('Error updating profile:', e);
        }

    };

    const handleDeleteAccount = () => {
        setConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {

        setConfirmDialog(false);

        try {

            // Remove user from database
            const response = await removeUserMutation({
                variables: { userId: profileData._id }
            });

            if (response.data.removeUser) {

                // delete profile picture from imagekit
                // const fileId = localStorage.getItem('fileId');
                // const response = await fetch('http://localhost:3001/delete-profile-picture', {
                //     method: 'DELETE',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ fileId }),
                // });

                // if (response.ok) {
                //     console.log(`File ${fileId} deleted successfully.`);
                // } else {
                //     console.error(`Failed to delete file ${fileId}.`);
                // }

                // remove fileId and profilePicture from localStorage
                // localStorage.removeItem('fileId');
                // localStorage.removeItem('profilePicture');

                showDialog('Account Deleted', 'Your account has been deleted successfully! You will be logged out shortly.');
                setTimeout(() => {
                    Auth.logout();
                }, 4000);

            } else {
                showDialog('Error Deleting Account', 'An error occurred while deleting your account. Please try again.');
                return;
            }

        } catch (e) {
            console.error('Error deleting account: ', e);
        }

    };

    if (loading) {
        return <Spinner speed="0.65s" size="xl" />;
    }
    if (error) {
        return <div className="error">Error loading profile: {error.message}</div>;
    }

    return (
        <div className={'ads-trees-profile'}>
            <div className="profile-body">
                <div className="profile-sub-body">
                    <div className="profile-header">
                        <div className="profile-header-intro">
                            <div>
                                <ImageUpload />
                            </div>
                            <div className="profile-summary-frame">
                                <div className="profile-summary">
                                    <div className="user-name">{profileData.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-body2">
                        <div className="public-profile-frame">
                            <div className="public-profile-title">Public </div>
                            <div className="public-profile-name-input">
                                <div className="public-profile-first-name-input">
                                    <div className="field-title-label">Username </div>
                                    <div className="input-group">
                                        <Input
                                            className="input"
                                            name="username"
                                            value={profileData.username || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="private-profile-frame">
                            <div className="private-profile-title">Private </div>
                            <div className="private-profile-email-input">
                                <div className="field-title-label2">Email </div>
                                <div className="input-group">
                                    <Input
                                        className="input"
                                        name="email"
                                        value={profileData.email || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {/* <div className="private-profile-content-preference-input">
                                <div className="component-title-label">Content preferences{' '}</div>
                                <div className="checkboxes-input-group">
                                    <CategoriesCheckboxes />
                                </div>
                            </div> */}
                        </div>
                        <div className="password-edit-frame">
                            <div className="password-edit-profile-title">Password </div>
                            <div className="new-password-input">
                                <div className="field-title-label2">New password </div>
                                <div className="input-group">
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            className="input"
                                            name="newPassword"
                                            value={profileData.newPassword || ''}
                                            onChange={handleInputChange}
                                            type={showPassword ? 'text' : 'password'}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button
                                                variant={'none'}
                                                h='1.75rem'
                                                size='sm'
                                                onClick={() => setShowPassword(!showPassword)}
                                                color={'gray.600'}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="password-confirmation-input">
                                <div className="field-title-label2">Confirm password </div>
                                <div className="input-group">
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            className="input"
                                            name="passwordConfirmation"
                                            value={profileData.passwordConfirmation || ''}
                                            onChange={handleInputChange}
                                            type={showPassword ? 'text' : 'password'}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button
                                                variant={'none'}
                                                h='1.75rem'
                                                size='sm'
                                                color={'gray.600'}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-controls">

                            <>

                                <Button className="button" onClick={handleUpdateProfile}>
                                    <div className="children2">Save Profile Information </div>
                                </Button>

                                <button className="delete-account-button" onClick={handleDeleteAccount}>
                                    <div className="children3">Delete Account </div>
                                </button>

                                {/* Alert Dialog for account deleted and update profile */}
                                <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={closeDialog}
                                    isOpen={dialog.isOpen}
                                    isCentered
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>{dialog.title}</AlertDialogHeader>
                                            <AlertDialogBody>{dialog.message}</AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={closeDialog}>
                                                    OK
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                                <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={() => setConfirmDialog(false)}
                                    isOpen={confirmDialog}
                                    isCentered
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>Confirm Account Deletion</AlertDialogHeader>
                                            <AlertDialogBody>Are you sure you want to delete your account? This action cannot be undone.</AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={() => setConfirmDialog(false)}>
                                                    Cancel
                                                </Button>
                                                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                                                    Delete
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </>

                        </div>
                    </div>
                </div>
            </div>
            <DonationHistory />
        </div>
    );
};
// ===============================================================

// Exporting the AdsTreesProfile component
// ================================================================
export default Profile;
// ===============================================================