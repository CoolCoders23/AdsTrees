import PropTypes from 'prop-types';
import './BonusCard.css';

export const BonusCard = ({
    reward = 'x 16',
    bonusCardTitle = '100 videos this month',
    userProgress = '38/100',
    className
}) => {
    return (
        <div className={'bonus-card ' + className}>
            <div className="bonus-card-body">
                <div className="bonus-card-icon-frame">
                    <svg
                        className="bonus-card-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 0L10.6667 4.95238L16 5.71429L12.1905 9.52381L12.9524 15.2381L8 12.5714L3.04762 15.2381L3.80952 9.52381L0 5.71429L5.33333 4.95238L8 0Z"
                            fill="#FFDC5F"
                        />
                        <path
                            d="M8 8L10.6667 4.95238L8 0V8ZM16 5.71429L8 8L12.1905 9.52381L16 5.71429ZM12.9524 15.2381L8 8V12.5714L12.9524 15.2381ZM3.80952 9.52381L3.04762 15.2381L8 8L3.80952 9.52381ZM0 5.71429L8 8L5.33333 4.95238L0 5.71429Z"
                            fill="#F5A61D"
                        />
                    </svg>
                </div>
                <div className="bonus-card-sub-body">
                    <div className="bonus-card-title">{bonusCardTitle} </div>
                    <div className="bonus-card-info">
                        <div className="user-progress">{userProgress} </div>
                        <div className="bonus-reward-frame">
                            <svg
                                className="trees"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.975 15.975L10.5 23L9 24H14.5L13 23L12.0185 15.975H10.975Z"
                                    fill="#6D4C41"
                                />
                                <path
                                    d="M12.648 0.8665C12.4175 0.633 12.0915 0.5 11.75 0.5C11.4085 0.5 11.0825 0.633 10.852 0.8665C9.235 2.5755 6 7.013 6 15.1665C6 18.11 8.5765 20.5 11.75 20.5C14.9235 20.5 17.5 18.11 17.5 15.1665C17.5 7.013 14.265 2.5755 12.648 0.8665Z"
                                    fill="#33C481"
                                />
                                <path
                                    d="M8.94994 16.992L8.49044 16.4845C7.95544 15.8935 7.82544 14.9895 8.16694 14.244C8.37394 13.793 8.41244 13.2705 8.27444 12.788L8.05344 12.015L8.50894 12.5185C9.03394 13.0985 9.17044 13.982 8.84894 14.7215L8.81494 14.7995C8.62144 15.2455 8.58944 15.7565 8.72644 16.2275L8.94994 16.992Z"
                                    fill="#9DFFCE"
                                />
                                <path
                                    d="M11.4115 12.925L10.952 12.4175C10.417 11.8265 10.287 10.9225 10.6285 10.177C10.8355 9.726 10.874 9.2035 10.736 8.721L10.515 7.948L10.9705 8.4515C11.4955 9.0315 11.632 9.915 11.3105 10.6545L11.2765 10.7325C11.083 11.1785 11.051 11.6895 11.188 12.1605L11.4115 12.925Z"
                                    fill="#9DFFCE"
                                />
                                <path
                                    d="M13.9535 18.4905L13.494 17.983C12.959 17.392 12.829 16.488 13.1705 15.7425C13.3775 15.2915 13.416 14.769 13.278 14.2865L13.057 13.5135L13.5125 14.017C14.0375 14.597 14.174 15.4805 13.8525 16.22L13.8185 16.298C13.625 16.744 13.593 17.255 13.73 17.726L13.9535 18.4905Z"
                                    fill="#9DFFCE"
                                />
                                <path
                                    d="M14.9435 11.507L14.484 10.9995C13.949 10.4085 13.819 9.5045 14.1605 8.759C14.3675 8.308 14.406 7.7855 14.268 7.303L14.047 6.53L14.5025 7.0335C15.0275 7.6135 15.164 8.497 14.8425 9.2365L14.8085 9.3145C14.615 9.7605 14.583 10.2715 14.72 10.7425L14.9435 11.507Z"
                                    fill="#9DFFCE"
                                />
                                <path
                                    d="M12.3745 7.413L11.915 6.9055C11.38 6.3145 11.25 5.4105 11.5915 4.665C11.7985 4.214 11.837 3.6915 11.699 3.209L11.478 2.436L11.9335 2.9395C12.4585 3.5195 12.595 4.403 12.2735 5.1425L12.2395 5.2205C12.046 5.6665 12.014 6.1775 12.151 6.6485L12.3745 7.413Z"
                                    fill="#9DFFCE"
                                />
                            </svg>

                            <div className="reward">{reward} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for each prop used in the component
BonusCard.propTypes = {
    reward: PropTypes.string,
    bonusCardTitle: PropTypes.string,
    userProgress: PropTypes.string,
    className: PropTypes.string,
};

export default BonusCard;