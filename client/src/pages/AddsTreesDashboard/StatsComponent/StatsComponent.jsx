/* Code generated with AutoHTML Plugin for Figma */
import './StatsComponent.css';
import { StatsComponentHeader } from '../StatsComponentHeader/StatsComponentHeader.jsx';
import { StatsFigureCard } from '../StatsFigureCard/StatsFigureCard.jsx';
import { BonusCard } from '../BonusCard/BonusCard.jsx';

export const StatsComponent = ({ className, ...props }) => {
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
                            statTitle="Trees you planted"
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
                            statFigure="58"
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
                    className="stats-component-header-instance2"
                />
                <div className="frame-3365">
                    <BonusCard
                        reward="x 16"
                        userProgress="38/100"
                        bonusCardTitle="100 videos this month"
                        className="bonus-card-instance"
                    />
                    <BonusCard
                        reward="x 8"
                        userProgress="28/50"
                        bonusCardTitle="50 videos this week"
                        className="bonus-card-instance"
                    />
                    <BonusCard
                        reward="x 4"
                        userProgress="8/8"
                        bonusCardTitle="8 videos today"
                        className="bonus-card-instance"
                    />
                    <BonusCard
                        reward="x 2"
                        userProgress="0/5"
                        bonusCardTitle="5 videos combo"
                        className="bonus-card-instance"
                    />
                </div>
            </div>
        </div>
    );
};
