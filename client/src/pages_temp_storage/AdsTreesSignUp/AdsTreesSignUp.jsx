/* Code generated with AutoHTML Plugin for Figma */
import './AdsTreesSignUp.css';

export const AdsTreesSignUp = ({
    signUpPasswordConfirmation = '   Confirm password',
    signUpEmail = '   Email',
    signUpPassword = '   Password',
    className,
    ...props
}) => {
    return (
        <div className={'ads-trees-sign-up ' + className}>
            <div className="sign-up-body">
                <div className="home-text">
                    <div className="hook-text-frame">
                        <div className="hook-text">
                            <div className="plant-trees-for-free">Plant trees for free </div>
                            <div className="make-the-planet-better">
                Make the planet better{' '}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sign-up-form">
                    <div className="sign-up-form-holder">
                        <div className="sign-up-title">Sign up </div>
                        <div className="sign-up-input-holder">
                            <div className="input-group">
                                <div className="input">
                                    <input className="email" value="   Email" />
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input">
                                    <input className="password" value="   Password" />
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input">
                                    <input
                                        className="password-confirmation"
                                        value="   Confirm password"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="button">
                            <div className="children">Register </div>
                        </button>
                        <div className="call-to-login">
                            <div className="instruction">
                                <div className="instruction-text">Otherwise, please </div>
                            </div>
                            <div className="link">
                                <button className="login-here-link">Login here </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
