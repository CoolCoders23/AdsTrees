import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER_PROFILE } from '../../utils/queries';
import { UPDATE_USER, REMOVE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import DonationHistory from '../../components/DonationHistory';
import './AdsTreesProfile.css';
// import { CategoriesCheckboxes } from '../pages/AdsTreesProfile/CheckboxGroup/CheckboxGroup';
import { useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';

const Profile = () => {
    // Local state for user data and form inputs
    const navigate = useNavigate();
    // const [userData, setUserData] = useState({});
    // const [profilePic, setProfilePic] = useState({ url: '', altText: '' });
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        newPassword: '',
        passwordConfirmation: ''
        // preferences: []
    });

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
            // setProfilePic(data.userProfile.profilePicture || { url: '', altText: '' });
        }
    }, [data]);

    console.log('Updated state after data fetch:', profileData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevState => {
            const updatedState = { ...prevState, [name]: value };
            console.log('State after input change:', updatedState);
            return updatedState;
        });
    };

    const handleUpdateProfile = async () => {
        if (profileData.newPassword !== profileData.passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }

        // Prepare the update data
        const updateData = {
            _id: profileData._id,
            username: profileData.username,
            email: profileData.email,
            ...(profileData.newPassword && { password: profileData.newPassword }),
            // ...(profilePic.url && { profilePicture: { url: profilePic.url, altText: profilePic.altText } })
        };

        try {
            const response = await updateUserMutation({
                variables: { user: updateData }
            });

            if (response.data.updateUser) {
                // Handle successful update
                setProfileData(response.data.updateUser.user);
                alert('Profile updated successfully');
            }
        } catch (e) {
            console.error('Error updating profile:', e);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await removeUserMutation({
                variables: { userId: profileData._id }
            });
            alert('Account deleted successfully');
        } catch (e) {
            console.error('Error deleting account: ', e);
        }
    };

    // // Redirect to contact page
    // const handleContactClick = () => {
    //     navigate('/contact'); // Update this path to your actual contact page route
    // };

    // // Redirect to sign-in page
    // const handleLogoutClick = () => {
    //     // Implement logout logic here if needed
    //     navigate('/signin'); // Update this path to your actual sign-in page route
    // };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading profile: {error.message}</div>;
    }

    console.log('State before rendering:', profileData);

    return (
        <div className={'ads-trees-profile'}>
            <div className="profile-body">
                <div className="profile-sub-body">
                    <div className="profile-header">
                        <div className="profile-header-intro">
                            <div className="profile-picture-frame">
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

                                <button className="edit-picture-button">
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
                            </div>
                            <div className="profile-summary-frame">
                                <div className="profile-summary">
                                    <div className="user-name">{profileData.username}</div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-header-controls">
                            {/* <div className="theme-link-frame">
                                <button className="theme-link">Change theme </button>
                            </div> */}
                            {/* <div className="contact-us-link-frame">
                                <button className="contact-us-link" onClick={handleContactClick}>
                                    <div className="contact-us">Contact us </div>
                                </button>
                            </div> */}
                            {/* <div className="contact-us-link-frame">
                                <button className="log-out-link" onClick={handleLogoutClick}>
                                    <div className="logout">Logout </div>
                                </button>
                            </div> */}
                        </div>
                    </div>
                    <div className="profile-body2">
                        <div className="public-profile-frame">
                            <div className="public-profile-title">Public </div>
                            <div className="public-profile-name-input">
                                <div className="public-profile-first-name-input">
                                    <div className="field-title-label">Username </div>
                                    <div className="input-group">
                                        {/* <div className="input"> */}
                                        <Input
                                            className="input"
                                            name="username"
                                            value={profileData.username || ''}
                                            onChange={handleInputChange}
                                        />
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="private-profile-frame">
                            <div className="private-profile-title">Private </div>
                            <div className="private-profile-email-input">
                                <div className="field-title-label2">Email </div>
                                <div className="input-group">
                                    {/* <div className="input"> */}
                                    <Input
                                        className="input"
                                        name="email"
                                        value={profileData.email || ''}
                                        onChange={handleInputChange}
                                    />
                                    {/* </div> */}
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
                            <div className="password-input">

                            </div>
                            <div className="new-password-input">
                                <div className="field-title-label2">New password </div>
                                <div className="input-group">
                                    {/* <div className="input"> */}
                                    <Input
                                        className="input"
                                        name="newPassword"
                                        value={profileData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="password-confirmation-input">
                                <div className="field-title-label2">Confirm password </div>
                                <div className="input-group">
                                    {/* <div className="input"> */}
                                    <Input
                                        className="input"
                                        name="passwordConfirmation"
                                        value={profileData.passwordConfirmation}
                                        onChange={handleInputChange}
                                    />
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="profile-main-controls">
                            <button className="button" onClick={handleUpdateProfile}>
                                <div className="children2">Save Profile Information </div>
                            </button>
                            <button className="delete-account-button" onClick={handleDeleteAccount}>
                                <div className="children3">Delete Account </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DonationHistory />
        </div>
    );
};

export default Profile;