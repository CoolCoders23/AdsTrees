/* Code generated with AutoHTML Plugin for Figma */
import './Header.css';
import { MainNavigationButtonTargetDashboardStatusActive } from './MainNavigationButtonTargetDashboardStatusActive/MainNavigationButtonTargetDashboardStatusActive.js';
import { MainNavigationButtonTargetDashboardStatusInactive } from './MainNavigationButtonTargetDashboardStatusInactive/MainNavigationButtonTargetDashboardStatusInactive.js';
import { MainNavigationButtonTargetProfileStatusActive } from './MainNavigationButtonTargetProfileStatusActive/MainNavigationButtonTargetProfileStatusActive.jsx';
import { MainNavigationButtonTargetProfileStatusInactive } from './MainNavigationButtonTargetProfileStatusInactive/MainNavigationButtonTargetProfileStatusInactive.jsx';

export const Header = ({
    showMainNavigationProfileButtonInactive = false,
    showMainNavigationProfileButtonActive = true,
    showLogoFrame = true,
    showMainNavigationDashboardButtonInactive = false,
    showMainNavigation = true,
    showMainNavigationDashboardButtonActive = true,
    className,
    ...props
}) => {
    return (
        <header className={'header ' + className}>
            {showLogoFrame && (
                <>
                    <div className="logo-frame">
                        <div className="logo">
                            <svg
                                className="icon"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.99799 3C2.99799 3 2.99799 14.314 10.352 21.668C18.272 29.588 29.02 29.022 29.02 29.022C29.02 29.022 29.586 18.274 21.666 10.354C14.312 3 2.99799 3 2.99799 3Z"
                                    fill="#33C481"
                                />
                                <path
                                    d="M13.443 8.20211C12.89 8.20211 12.443 8.65011 12.443 9.20211V11.0301L8.51401 7.10111C8.12301 6.71011 7.49101 6.71011 7.10001 7.10111C6.70901 7.49211 6.70901 8.12411 7.10001 8.51511L12.648 14.0631C12.709 14.1471 12.78 14.2181 12.865 14.2801L15.292 16.7081H12.756C12.204 16.7081 11.756 17.1551 11.756 17.7081C11.756 18.2601 12.203 18.7081 12.756 18.7081H17.292L29.02 30.4361C29.215 30.6311 29.471 30.7291 29.727 30.7291C29.983 30.7291 30.239 30.6311 30.434 30.4361C30.825 30.0451 30.825 29.4131 30.434 29.0221L14.443 13.0301V9.20211C14.443 8.65011 13.995 8.20211 13.443 8.20211Z"
                                    fill="#9DFFCE"
                                />
                                <path
                                    opacity="0.05"
                                    d="M20.954 17.9019C22.225 16.6309 23.609 15.5569 25.04 14.6229C24.692 14.0619 24.314 13.5039 23.903 12.9519C22.382 13.9549 20.909 15.1199 19.54 16.4889C17.011 19.0179 15.153 21.7679 13.781 24.4979C14.358 24.8899 14.938 25.2489 15.52 25.5759C16.809 22.9469 18.553 20.3029 20.954 17.9019Z"
                                    fill="#E8F5F1"
                                />
                                <path
                                    opacity="0.07"
                                    d="M19.894 16.841C17.401 19.334 15.572 22.071 14.224 24.795C14.507 24.979 14.792 25.153 15.076 25.321C16.385 22.66 18.167 19.982 20.601 17.548C21.9 16.249 23.307 15.138 24.767 14.185C24.589 13.911 24.402 13.637 24.208 13.365C22.697 14.351 21.239 15.496 19.894 16.841Z"
                                    fill="#E8F5F1"
                                />
                                <path
                                    d="M44.996 8.00188C44.996 8.00188 29.839 7.60188 20.247 17.1939C9.91701 27.5239 11.055 41.9429 11.055 41.9429C11.055 41.9429 25.474 43.0809 35.804 32.7509C45.395 23.1589 44.996 8.00188 44.996 8.00188Z"
                                    fill="#33C481"
                                />
                                <path
                                    d="M25.843 35.58C25.843 35.028 25.396 34.58 24.843 34.58H19.832L32.682 21.73H37.925C38.477 21.73 38.925 21.283 38.925 20.73C38.925 20.177 38.478 19.73 37.925 19.73H34.682L40.753 13.659C41.143 13.269 41.144 12.636 40.753 12.245C40.362 11.854 39.729 11.855 39.339 12.245L25.49 26.094V20.023C25.49 19.471 25.043 19.023 24.49 19.023C23.937 19.023 23.49 19.47 23.49 20.023V28.094L8.93301 42.651C8.54301 43.041 8.54201 43.674 8.93301 44.065C9.32401 44.456 9.95701 44.455 10.347 44.065L17.832 36.58H24.842C25.396 36.579 25.843 36.132 25.843 35.58Z"
                                    fill="#9DFFCE"
                                />
                            </svg>

                            <div className="wording">AdsTrees </div>
                        </div>
                    </div>
                </>
            )}
            {showMainNavigation && (
                <>
                    <div className="main-navigation">
                        {showMainNavigationDashboardButtonActive && (
                            <>
                                <MainNavigationButtonTargetDashboardStatusActive
                                    target="dashboard"
                                    status="active"
                                    className="main-navigation-dashboard-button-active-instance"
                                />
                            </>
                        )}
                        {showMainNavigationDashboardButtonInactive && (
                            <>
                                <MainNavigationButtonTargetDashboardStatusInactive
                                    target="dashboard"
                                    status="inactive"
                                    className="main-navigation-dashboard-button-inactive-instance"
                                />
                            </>
                        )}
                        {showMainNavigationProfileButtonActive && (
                            <>
                                <MainNavigationButtonTargetProfileStatusActive
                                    target="profile"
                                    status="active"
                                    className="main-navigation-profile-button-active-instance"
                                />
                            </>
                        )}
                        {showMainNavigationProfileButtonInactive && (
                            <>
                                <MainNavigationButtonTargetProfileStatusInactive
                                    target="profile"
                                    status="inactive"
                                    className="main-navigation-profile-button-inactive-instance"
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};
