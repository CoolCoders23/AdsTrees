/* eslint-disable no-unused-vars */
import './Progress.css';
import { ProgressStripe } from '../ProgressStripe/ProgressStripe.jsx';

export const Progress = ({
    hasStripe,
    size,
    colorScheme,
    className,
    value,
    max = 1,
    ...props
}) => {

    const variantsClassName = 'size-' + size + ' color-scheme-' + colorScheme;
    const percentage = (value / max) * 100; // calculate percentage

    return (
        <div className={'progress ' + className + ' ' + variantsClassName}>
            {(size === 'sm' || size === 'md' || size === 'lg') && (
                <>
                    <div className="track"></div>
                </>
            )}
            <div className="inner" style={{ width: `${percentage}%` }}>
                {hasStripe && <ProgressStripe className="stripe-instance" />}
            </div>
        </div>
    );
};
