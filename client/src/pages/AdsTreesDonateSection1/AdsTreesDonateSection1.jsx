/* Code generated with AutoHTML Plugin for Figma */
import './AdsTreesDonateSection1.css';
import { PictoDisplayGarden } from '../../components/PictoDisplayGarden/PictoDisplayGarden.jsx';
import { PictoDisplayWood } from '../../components/PictoDisplayWood/PictoDisplayWood.jsx';
import { PricingCard } from './PricingCard/PricingCard.jsx';
import { PictoDisplayForest } from '../../components/PictoDisplayForest/PictoDisplayForest.jsx';

export const AdsTreesDonateSection1 = ({ className, ...props }) => {
    return (
        <main className={'ads-trees-donate-section-1 ' + className}>
            <div className="body">
                <div className="stepper">
                    <div className="step-1">
                        <div className="active-line"></div>
                        <div className="inactive-line"></div>
                        <div className="steps">
                            <div className="step-1-1-frame">
                                <div className="step-icon-base">
                                    <div className="content">
                                        <div className="bbackground"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording">
                                    <div className="welcome">Welcome </div>
                                </div>
                            </div>
                            <div className="step-1-2-frame">
                                <div className="step-icon-base2">
                                    <div className="content2">
                                        <div className="dot2"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording2">
                                    <div className="payment">Payment </div>
                                </div>
                            </div>
                            <div className="step-1-3-frame">
                                <div className="step-icon-base2">
                                    <div className="content2">
                                        <div className="dot2"></div>
                                    </div>
                                </div>
                                <div className="step-icon-wording2">
                                    <div className="confirmation">Confirmation </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="headline-frame">
                    <div className="headline">
                        <div className="main-title">
              How many trees do you want to plant?{' '}
                        </div>
                        <div className="subtitle">Do good, be great, plant trees. </div>
                    </div>
                </div>
                <div className="pricing">
                    <div className="pricing-card">
                        <div className="pricing-wrapper">
                            <div className="content3">
                                <div className="card-header">
                                    <div className="card-subheader">
                                        <div className="icon">
                                            <PictoDisplayGarden
                                                display="garden"
                                                className="picto-instance"
                                            />
                                        </div>
                                        <div className="offer-name">
                                            <div className="title">Garden </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="offer-description">
                                    <div className="tradeoff">Plant 1 tree </div>
                                </div>
                                <div className="pricing2">
                                    <div className="price-tag">
                                        <div className="price">$0.99 </div>
                                    </div>
                                </div>
                                <div className="button">
                                    <div className="children">Get Started </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PricingCard
                        tradeoff="Plant 10 trees"
                        offerTitle="Wood"
                        price="$9.99"
                        component0={<PictoDisplayWood className="picto" display="wood" />}
                        className="pricing-card-instance"
                    />
                    <PricingCard
                        tradeoff="Plant 100 trees"
                        offerTitle="Forest"
                        price="$99"
                        component0={
                            <PictoDisplayForest className="picto2" display="forest" />
                        }
                        className="pricing-card-instance"
                    />
                </div>
            </div>
        </main>
    );
};
