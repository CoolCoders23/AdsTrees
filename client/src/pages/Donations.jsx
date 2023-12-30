// Desc: This file contains the Donations page component
// =====================================================

// Import Components
// =====================================================
import DonationList from '../components/DonationList';
import Cart from '../components/Cart';
// =====================================================

// Define the Donations page component
// =====================================================
const Donations = () => {
    return (
        <div>
            <div>
                <div>
                    <DonationList />
                </div>
                <div>
                    <Cart />
                </div>
            </div>
        </div>
    );
};
// =====================================================

// Export the Donations page component
// =====================================================
export default Donations;
// =====================================================