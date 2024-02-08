/* Code generated with AutoHTML Plugin for Figma */
import './ProgressSizeXsColorSchemeGreen.css';
import { ProgressStripe } from '../ProgressStripe/ProgressStripe.jsx';

export const ProgressSizeXsColorSchemeGreen = ({
    hasStripe,
    size,
    colorScheme,
    className,
    value,
    max = 1,
    ...props
}) => {

    const percentage = (value / max) * 100; // calculate percentage

    return (
        <div className={`progress-size-xs-color-scheme-green ${size} ${colorScheme} ${className}`}>
            <div className="inner" style={{ width: `${percentage}%` }}>
                {hasStripe && <ProgressStripe className="stripe-instance" />}
            </div>
        </div>
    );
};
