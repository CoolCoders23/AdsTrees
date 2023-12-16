import './StatsFigureCard.css';
import PropTypes from 'prop-types';

export const StatsFigureCard = ({
    statFigure = '7,280',
    statTitle = 'Trees You Planted',
    className

}) => {
    return (
        <div className={'stats-figure-card ' + className}>
            <div className="data">
                <div className="stat-title">{statTitle} </div>
                <div className="stat-figure">{statFigure} </div>
            </div>
        </div>
    );
};

// Define PropTypes for each prop used in the component
StatsFigureCard.propTypes = {
    statFigure: PropTypes.string,
    statTitle: PropTypes.string,
    className: PropTypes.string,
};