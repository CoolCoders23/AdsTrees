import './StatsComponentHeader.css';
import PropTypes from 'prop-types';

export const StatsComponentHeader = ({
    statsComponentHeaderLabel = 'Stats',
    className,
}) => {
    return (
        <div className={'stats-component-header ' + className}>
            <div className="stats-component-header-title">
                <div className="stats-component-header-label">
                    {statsComponentHeaderLabel}{' '}
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for each prop used in the component
StatsComponentHeader.propTypes = {
    statsComponentHeaderLabel: PropTypes.string,
    className: PropTypes.string,
};
