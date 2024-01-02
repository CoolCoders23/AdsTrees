/* Code generated with AutoHTML Plugin for Figma */
// Desc: This file contains the DonationItem component
// which will be used to display a single donation item
// =========================================================

// Import dependencies
// =========================================================
import './PricingCard.css';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import { ADD_TO_CART } from '../../utils/payment-logic/actions';
import { idbPromise } from '../../utils/payment-logic/idbHelper';
// =========================================================

// Define component
// =========================================================
export const PricingCard = (item) => {

    // Destructure state and dispatch from context
    const [state, dispatch] = useStateContext();

    // Destructure item prop
    const {
        image,
        donationType,
        _id,
        description,
        donationAmount,
        price,
        className
    } = item;

    const { cart } = state;

    // Define addToCart function
    const addToCart = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            idbPromise('cart', 'put', { ...itemInCart });
        } else {
            dispatch({
                type: ADD_TO_CART,
                donation: { ...item }
            });
            idbPromise('cart', 'put', { ...item });
        }

    };

    // Define renderImage function to extract
    // correct type of image from props
    const renderImage = () => {
        if (typeof image === 'string') {
            return <img src={`/images/${image}`} alt={donationType} />;
        }

        // If image is a React component, render it directly
        return image;
    };

    return (
        <div className={'pricing-card ' + className}>
            <div className="pricing-wrapper">
                <div className="content">
                    <div className="card-header">
                        <div className="card-subheader">
                            <div className="icon">
                                {renderImage()}
                            </div>
                            <div className="offer-name">
                                <div className="title">{donationType}</div>
                            </div>
                        </div>
                    </div>
                    <div className="offer-description">
                        <div className="tradeoff">{description}</div>
                    </div>
                    <div className="offer-name">
                        <div className="title">Planting Trees: {donationAmount}</div>
                    </div>
                    <div className="pricing">
                        <div className="price-tag">
                            <div className="price">${price}</div>
                        </div>
                    </div>
                    <div className="button">
                        <button className="children" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// =========================================================