/* Code generated with AutoHTML Plugin for Figma */
import './AdsTreesAlertModal.css';

export const AdsTreesAlertModal = ({
    alertLabel = 'Do you really want to delete your account?',
    alertTitle = 'Alert',
    className,
    ...props
}) => {
    return (
        <div className={'ads-trees-alert-modal ' + className}>
            <div className="alert-modal-header">
                <div className="alert-title">{alertTitle} </div>
                <div className="alert-frame">
                    <div className="alert-label-frame">
                        <div className="alert-label">{alertLabel} </div>
                    </div>
                </div>
            </div>
            <div className="client-controls-frame">
                <div className="destructive-button">
                    <div className="children">Delete account </div>
                </div>
                <button className="button">
                    <div className="children2">Cancel </div>
                </button>
            </div>
        </div>
    );
};
