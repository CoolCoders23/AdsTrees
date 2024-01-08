/* Code generated with AutoHTML Plugin for Figma */
import './ProgressSizeXsColorSchemeGreen.css';
import { ProgressStripe } from '../ProgressStripe/ProgressStripe.jsx';

export const ProgressSizeXsColorSchemeGreen = ({
    hasStripe = true,
    size,
    colorScheme,
    className,
    ...props
}) => {
    return (
        <div className={'progress-size-xs-color-scheme-green ' + className}>
            <div className="inner">
                {hasStripe && (
                    <>
                        <ProgressStripe className="stripe-instance" />
                    </>
                )}
            </div>
        </div>
    );
};
