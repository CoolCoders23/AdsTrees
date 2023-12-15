import './StatsComponent.css';
import { StatsComponentHeader } from '../StatsComponentHeader/StatsComponentHeader.jsx';
import { StatsFigureCard } from '../StatsFigureCard/StatsFigureCard.jsx';
import { BonusCard } from '../BonusCard/BonusCard.jsx';
import PropTypes from 'prop-types';

export const StatsComponent = ({ className }) => {
    return (
        <div className={'stats-component ' + className}>
            <div className="stats-component2">
                <StatsComponentHeader
                    statsComponentHeaderLabel="Stats"
                    className="stats-component-header-instance"
                />
                <div className="stats-component-body">
                    <div className="stats-component-body-trees-planted">
                        <StatsFigureCard
                            statTitle="Trees You Planted"
                            statFigure="7,280"
                            className="stats-figure-card-instance"
                        />
                        <StatsFigureCard
                            statFigure="4,282"
                            statTitle="This year"
                            className="stats-figure-card-instance"
                        />
                    </div>
                    <div className="stats-component-body-performance">
                        <StatsFigureCard
                            statFigure="57"
                            statTitle="Best week"
                            className="stats-figure-card-instance"
                        />
                        <StatsFigureCard
                            statFigure="42"
                            statTitle="This week"
                            className="stats-figure-card-instance"
                        />
                    </div>
                </div>
            </div>
            <div className="frame">
                <StatsComponentHeader
                    statsComponentHeaderLabel="Bonuses"
                    className="stats-component-header-instance"
                />
                <div className="frame-3365">
                    <BonusCard
                        userProgress="38/100"
                        bonusCardTitle="100 videos this month"
                        reward="x 16"
                        className="bonus-card-instance"
                    />
                    <BonusCard
                        reward="x 8"
                        bonusCardTitle="50 videos this week"
                        userProgress="28/50"
                        className="bonus-card-instance2"
                    />
                    <BonusCard
                        reward="x 4"
                        bonusCardTitle="8 videos today"
                        userProgress="8/8"
                        className="bonus-card-instance3"
                    />
                    <BonusCard
                        reward="x 2"
                        bonusCardTitle="5 videos combo"
                        userProgress="0/5"
                        className="bonus-card-instance4"
                    />
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for each prop used in the component
StatsComponent.propTypes = {
    className: PropTypes.string,
};