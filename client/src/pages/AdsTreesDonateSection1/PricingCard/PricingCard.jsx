/* Code generated with AutoHTML Plugin for Figma */
import './PricingCard.css';
import { PictoDisplayGarden } from '../../../components/PictoDisplayGarden/PictoDisplayGarden.jsx';
import { PictoDisplayWood } from '../../../components/PictoDisplayWood/PictoDisplayWood.jsx';
import { PictoDisplayForest } from '../../../components/PictoDisplayForest/PictoDisplayForest.jsx';

export const PricingCard = ({
    offerTitle = 'Garden',
    tradeoff = 'Plant 1 tree',
    price = '$0.99',
    component0 = <PictoDisplayGarden display="garden" />,
    className,
    ...props
}) => {
    return (
        <div className={'pricing-card ' + className}>
            <div className="pricing-wrapper">
                <div className="content">
                    <div className="card-header">
                        <div className="card-subheader">
                            <div className="icon">{component0}</div>
                            <div className="offer-name">
                                <div className="title">{offerTitle} </div>
                            </div>
                        </div>
                    </div>
                    <div className="offer-description">
                        <div className="tradeoff">{tradeoff} </div>
                    </div>
                    <div className="pricing">
                        <div className="price-tag">
                            <div className="price">{price} </div>
                        </div>
                    </div>
                    <div className="button">
                        <div className="children">Get Started </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
