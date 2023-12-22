/* Code generated with AutoHTML Plugin for Figma */
import "./AdsTreesSignIn.css";

export const AdsTreesSignIn = ({
  signInPassword = "   Password",
  signInEmail = "   Email",
  className,
  ...props
}) => {
  return (
    <div className={"ads-trees-sign-in " + className}>
      <div className="sign-in-body">
        <div className="home-text">
          <div className="hook-text-frame">
            <div className="hook-text">
              <div className="plant-trees-for-free">Plant trees for free </div>
              <div className="make-the-planet-better">
                Make the planet better{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="sign-in-form">
          <div className="sign-in-form-holder">
            <div className="sign-in-title">Sign in </div>
            <div className="sign-in-input-holder">
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
            </div>
            <button className="button">
              <div className="children">Login </div>
            </button>
            <div className="call-to-register">
              <div className="instruction">
                <div className="instruction-text">Otherwise, please </div>
              </div>
              <div className="link">
                <button className="register-here-link">Register here </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
