// Desc: This file contains the global style overrides
// ============================================================

// Import Style Overrides
// ============================================================
import { mode } from '@chakra-ui/theme-tools';
// ============================================================

// Define Overrides
// ============================================================
const styles = {
    global: (props) => ({

        body: {
            color: mode('light.text', 'dark.text')(props),
            bg: mode('light.primary', 'dark.primary')(props),
        },

        header: {
            boxShadow: props.colorMode === 'light' ? '0px 1px 5px rgba(0, 0, 0, 0.1)' : '0px 1px 5px rgba(255, 255, 255, 0.1)',
        },

        '.footer': {
            boxShadow: props.colorMode === 'light' ? '0px 1px 5px rgba(0, 0, 0, 0.1)' : '0px 1px 5px rgba(255, 255, 255, 0.1)',
        },

        a: {
            textDecoration: 'none',
        },

        'textarea, .input-group2': {
            color: mode('light.inputText', 'dark.inputText')(props),
            backgroundColor: mode('light.inputBackground', 'dark.inputBackground')(props),
            borderColor: mode('light.inputBorder', 'dark.inputBorder')(props),
            borderStyle: 'solid',
            borderWidth: '2px',
            borderRadius: '10px',
            _focus: {
                outline: 'none',
                boxShadow: 'none',
                borderColor: mode('light.inputFocusBorder', 'dark.inputFocusBorder')(props),
            }
        },

        '.error': {
            color: mode('light.errorText', 'dark.errorText')(props),
        },

        '.client-controllers-frame': {
            bg: mode('light.primary', 'dark.primary')(props),
        },

        '.stats-figure-card-instance, .bonus-card-instance': {
            bg: mode('light.dashboardCardBg', 'dark.dashboardCardBg')(props),
        },

        '.pricing-card ': {
            bg: mode('light.priceCardBg', 'dark.primary')(props),
            borderColor: mode('light.priceCardBorder', 'dark.priceCardBorder')(props),
            boxShadow: mode('0px 2px 12px 0px rgba(45, 106, 79, 0.4)', '0px 2px 12px 0px rgba(45, 106, 79, 0.4)')(props),
        },

        '.svgFill': {
            fill: mode('light.teamImageBg', 'dark.greenFlashy')(props),
        },
        '.team-member-data-frame': {
            bg: mode('dark.greenFlashy', 'light.teamImageBg')(props),
        },
        '.aboutIconsFill, .security-shield-icon, .checkbox-icon, .vector-path': {
            fill: mode('light.text', 'dark.text')(props),
        },

        '.active-line, .dot, .dot2, .active-line2': {
            bg: mode('light.greenDark', 'dark.greenFlashy')(props),
        },
        '.inactive-line': {
            bg: mode('light.inactiveLine', 'dark.greyIntermediate')(props),
        },
        '.welcome, .checkout-payment, .success-confirmation': {
            color: mode('light.greenDark', 'dark.greenFlashy')(props),
        },
        '.bbackground, .step-icon-base, .step-icon-base2 ': {
            bg: mode('light.bbackground', 'dark.bbackground')(props),
        },
        '.payment, .confirmation': {
            color: mode('light.bbackground', 'dark.text')(props),
        },
        '.donation-summary, .donation-tradeoff, .tax-review-title, .credit-card': {
            borderColor: mode('light.greenDark', 'dark.greyIntermediate')(props),
        },
        '.check-icon-bg': {
            fill: mode('light.successFeedbackColor', 'dark.inputBackground')(props),
        },
        '.feedback-text': {
            color: mode('light.successFeedbackColor', 'dark.greenFlashy')(props),
        },
        '.check-icon': {
            fill: mode('light.greenFlashy', 'dark.greenPop')(props),
        },
        '.main-navigation-button-target-dashboard-status-active,.main-navigation-button-target-profile-status-active,.target-logout-status-active': {
            bg: mode('light.pureWhite', 'dark.primary')(props),
            borderColor: mode('light.text', 'dark.text')(props),
        },

    }),
};
// ============================================================

// Export Overrides
// ============================================================
export default styles;
// ============================================================