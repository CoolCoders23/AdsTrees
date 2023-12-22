/* Code generated with AutoHTML Plugin for Figma */
import './AdsTreesRewardModal.css';

export const AdsTreesRewardModal = ({
    modalReward = '+ 4 more trees',
    modalSubtitle = 'You have planted',
    modalTitle = 'Congratulations!',
    className,
    ...props
}) => {
    return (
        <div className={'ads-trees-reward-modal ' + className}>
            <div className="reward-modal-header">
                <div className="title">{modalTitle} </div>
                <div className="subtitle">{modalSubtitle} </div>
            </div>
            <div className="reward-modal-body">
                <div className="reward">
                    <svg
                        className="trees"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_963_6693)">
                            <path
                                d="M11.475 16.475L11 23.5L9.5 24.5H15L13.5 23.5L12.5185 16.475H11.475Z"
                                fill="#E29D86"
                            />
                            <path
                                d="M13.148 1.3665C12.9175 1.133 12.5915 1 12.25 1C11.9085 1 11.5825 1.133 11.352 1.3665C9.735 3.0755 6.5 7.513 6.5 15.6665C6.5 18.61 9.0765 21 12.25 21C15.4235 21 18 18.61 18 15.6665C18 7.513 14.765 3.0755 13.148 1.3665Z"
                                fill="#33C481"
                            />
                            <path
                                d="M9.45006 17.492L8.99057 16.9845C8.45557 16.3935 8.32556 15.4895 8.66706 14.744C8.87406 14.293 8.91256 13.7705 8.77456 13.288L8.55356 12.515L9.00906 13.0185C9.53406 13.5985 9.67056 14.482 9.34906 15.2215L9.31506 15.2995C9.12156 15.7455 9.08956 16.2565 9.22656 16.7275L9.45006 17.492Z"
                                fill="#9DFFCE"
                            />
                            <path
                                d="M11.9115 13.425L11.452 12.9175C10.917 12.3265 10.787 11.4225 11.1285 10.677C11.3355 10.226 11.374 9.7035 11.236 9.221L11.015 8.448L11.4705 8.9515C11.9955 9.5315 12.132 10.415 11.8105 11.1545L11.7765 11.2325C11.583 11.6785 11.551 12.1895 11.688 12.6605L11.9115 13.425Z"
                                fill="#9DFFCE"
                            />
                            <path
                                d="M14.4535 18.9905L13.994 18.483C13.459 17.892 13.329 16.988 13.6705 16.2425C13.8775 15.7915 13.916 15.269 13.778 14.7865L13.557 14.0135L14.0125 14.517C14.5375 15.097 14.674 15.9805 14.3525 16.72L14.3185 16.798C14.125 17.244 14.093 17.755 14.23 18.226L14.4535 18.9905Z"
                                fill="#9DFFCE"
                            />
                            <path
                                d="M15.4435 12.007L14.984 11.4995C14.449 10.9085 14.319 10.0045 14.6605 9.25903C14.8675 8.80803 14.906 8.28553 14.768 7.80303L14.547 7.03003L15.0025 7.53353C15.5275 8.11353 15.664 8.99703 15.3425 9.73653L15.3085 9.81453C15.115 10.2605 15.083 10.7715 15.22 11.2425L15.4435 12.007Z"
                                fill="#9DFFCE"
                            />
                            <path
                                d="M12.8744 7.91297L12.4149 7.40547C11.8799 6.81447 11.7499 5.91047 12.0914 5.16497C12.2984 4.71397 12.3369 4.19147 12.1989 3.70897L11.9779 2.93597L12.4334 3.43947C12.9584 4.01947 13.0949 4.90297 12.7734 5.64247L12.7394 5.72047C12.5459 6.16647 12.5139 6.67747 12.6509 7.14847L12.8744 7.91297Z"
                                fill="#9DFFCE"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_963_6693">
                                <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0.5 0.5)"
                                />
                            </clipPath>
                        </defs>
                    </svg>

                    <div className="reward-label">{modalReward} </div>
                </div>
            </div>
            <button className="button">
                <div className="children">Continue </div>
            </button>
        </div>
    );
};
