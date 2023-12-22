/* Code generated with AutoHTML Plugin for Figma */
import './AdsTreesContactUs.css';

export const AdsTreesContactUs = ({
    contactUsMessage = '',
    contactUsLastName = '',
    contactUsFirstName = '',
    contactUsEmail = '',
    className,
    ...props
}) => {
    return (
        <div className={'ads-trees-contact-us ' + className}>
            <div className="contact-us-body">
                <div className="contact-us-sub-body">
                    <div className="contact-us-title-frame">
                        <div className="contact-us-title">Contact us </div>
                    </div>
                    <div className="message-frame">
                        <div className="client-contact-input-frame">
                            <div className="contact-us-name-input">
                                <div className="contact-us-first-name-input">
                                    <div className="field-title-label">First name </div>
                                    <div className="input-group">
                                        <div className="input">
                                            <input className="first-name" value="   John" />
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-us-last-name-input">
                                    <div className="field-title-label">Last name </div>
                                    <div className="input-group">
                                        <div className="input">
                                            <input className="last-name" value="   Doe" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-us-email-input">
                                <div className="field-title-label">Email </div>
                                <div className="input-group">
                                    <div className="input">
                                        <input className="email" value="   Email" />
                                    </div>
                                </div>
                            </div>
                            <div className="contact-us-message-input">
                                <div className="field-title-label">Message </div>
                                <div className="input-group2">
                                    <div className="input2">
                                        <input
                                            className="message"
                                            value="   Please type your message here"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="button">
                            <div className="children">Send Message </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
