/* Code generated with AutoHTML Plugin for Figma */
import './DonationSummary.css';

export const DonationSummary = ({
    taxPriceTag,
    subtotalPriceTag,
    totalPriceTag,
    tradeoffPriceTag,
    tradeoffDescription,
    tradeoffType,
    className,
    ...props
}) => {
    return (
        <div className={'donation-summary ' + className}>
            <div className="donation-summary-body">
                <div className="donation">
                    <div className="donation-review-title">
                        <div className="donation-review">Donation Review </div>
                    </div>
                    <div className="donation-tradeoff">
                        <div className="tradeoff-icon">
                            <svg
                                className="trees"
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_947_21420)">
                                    <path
                                        d="M11.3603 16.8286L10.8853 23.8536L9.38525 24.8536H14.8853L13.3853 23.8536L12.4038 16.8286H11.3603Z"
                                        fill="#E29D86"
                                    />
                                    <path
                                        d="M13.0333 1.72002C12.8028 1.48652 12.4768 1.35352 12.1353 1.35352C11.7938 1.35352 11.4678 1.48652 11.2373 1.72002C9.62025 3.42902 6.38525 7.86652 6.38525 16.02C6.38525 18.9635 8.96175 21.3535 12.1353 21.3535C15.3088 21.3535 17.8853 18.9635 17.8853 16.02C17.8853 7.86652 14.6503 3.42902 13.0333 1.72002Z"
                                        fill="#33C481"
                                    />
                                    <path
                                        d="M9.33507 17.8454L8.87557 17.3379C8.34057 16.7469 8.21057 15.8429 8.55207 15.0974C8.75907 14.6464 8.79757 14.1239 8.65957 13.6414L8.43857 12.8684L8.89407 13.3719C9.41907 13.9519 9.55557 14.8354 9.23407 15.5749L9.20007 15.6529C9.00657 16.0989 8.97457 16.6099 9.11157 17.0809L9.33507 17.8454Z"
                                        fill="#9DFFCE"
                                    />
                                    <path
                                        d="M11.797 13.7785L11.3375 13.271C10.8025 12.68 10.6725 11.776 11.014 11.0305C11.221 10.5795 11.2595 10.057 11.1215 9.57451L10.9005 8.80151L11.356 9.30501C11.881 9.88501 12.0175 10.7685 11.696 11.508L11.662 11.586C11.4685 12.032 11.4365 12.543 11.5735 13.014L11.797 13.7785Z"
                                        fill="#9DFFCE"
                                    />
                                    <path
                                        d="M14.339 19.3439L13.8795 18.8364C13.3445 18.2454 13.2145 17.3414 13.556 16.5959C13.763 16.1449 13.8015 15.6224 13.6635 15.1399L13.4425 14.3669L13.898 14.8704C14.423 15.4504 14.5595 16.3339 14.238 17.0734L14.204 17.1514C14.0105 17.5974 13.9785 18.1084 14.1155 18.5794L14.339 19.3439Z"
                                        fill="#9DFFCE"
                                    />
                                    <path
                                        d="M15.3287 12.3605L14.8692 11.853C14.3342 11.262 14.2042 10.358 14.5457 9.61254C14.7527 9.16154 14.7912 8.63904 14.6532 8.15654L14.4322 7.38354L14.8877 7.88704C15.4127 8.46704 15.5492 9.35054 15.2277 10.09L15.1937 10.168C15.0002 10.614 14.9682 11.125 15.1052 11.596L15.3287 12.3605Z"
                                        fill="#9DFFCE"
                                    />
                                    <path
                                        d="M12.7599 8.26655L12.3004 7.75905C11.7654 7.16805 11.6354 6.26405 11.9769 5.51855C12.1839 5.06755 12.2224 4.54505 12.0844 4.06255L11.8634 3.28955L12.3189 3.79305C12.8439 4.37305 12.9804 5.25655 12.6589 5.99605L12.6249 6.07405C12.4314 6.52005 12.3994 7.03105 12.5364 7.50205L12.7599 8.26655Z"
                                        fill="#9DFFCE"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_947_21420">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0.385254 0.853516)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="tradeoff-description">{tradeoffType} {tradeoffDescription}</div>
                        <div className="tradeoff-price-tag">${tradeoffPriceTag}</div>
                    </div>
                </div>
                <div className="checkout-summary-body">
                    <div className="donation-review-title">
                        <div className="checkout-summary">Check out summary </div>
                    </div>
                    <div className="subtotal-review-title">
                        <div className="subtotal">Subtotal </div>
                        <div className="subtotal-price-tag">${subtotalPriceTag}</div>
                    </div>
                    <div className="tax-review-title">
                        <div className="tax">Tax </div>
                        <div className="tax-price-tag">${taxPriceTag}</div>
                    </div>
                    <div className="total-review-title">
                        <div className="total">Total </div>
                        <div className="total-price-tag">${totalPriceTag}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
