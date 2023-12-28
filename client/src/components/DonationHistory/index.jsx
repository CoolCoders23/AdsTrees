// Desc: this file contains the DonationHistory component
// which is a child of the Profile component
// this component displays the user's donation history
// =========================================================

// import dependencies
// =========================================================
import { useQuery } from '@apollo/client';
import { QUERY_PURCHASES, QUERY_USER } from '../../utils/queries';
import idbPromise from '../../utils/payment-logic/idbHelper';
import spinner from '../../assets/image/spinner.gif';
import { UPDATE_CURRENT_STATUS } from '../../utils/payment-logic/actions';
import useStateContext from '../../utils/payment-logic/UseStateContext';
import Auth from '../../utils/auth';
// =========================================================

// Define DonationHistory component
// =========================================================
const DonationHistory = () => {

    const [state, dispatch] = useStateContext();

    const profile = Auth.getProfile();
    const userId = profile?.data._id || profile ? profile.is : null;
    const username = profile?.data.username || profile ? profile.username : null;

    const { loading, data } = useQuery(QUERY_PURCHASES, {
        variables: { userId: userId },
    });

    const { data: userData } = useQuery(QUERY_USER, {
        variables: { username: username },
    });

    const totalDonations = userData?.user.totalDonations || 0;
    const purchases = data?.purchases || [];

    if (!loading) {

        idbPromise('donations', 'get').then((donations) => {

            if (donations.length > 0 && donations[0].status) {
                dispatch({
                    type: UPDATE_CURRENT_STATUS,
                    currentStatus: donations[0].status
                });
            }
        });


    }

    return (
        <div>
            <h2>Donation History</h2>
            {purchases.map((purchase) => (
                <div key={purchase._id}>
                    <h3>
                        {purchase.purchaseDate}
                    </h3>
                    <div>
                        {purchase.donations.map(({ image, donationType, donationAmount, price }, index) => (
                            <div key={index}>
                                <h3>{donationType}</h3>
                                <div>
                                    <img
                                        alt={donationType}
                                        src={`/images/${image}`}
                                    />
                                </div>
                                <div>
                                    <p>Donated Trees: {donationAmount}</p>
                                    <p>${price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        Status:{' '}
                        {state.currentStatus === 'completed' ? (
                            <span className="text-success">Completed</span>
                        ) : (
                            <span className="text-danger">Pending</span>
                        )}
                    </div>
                </div>
            ))}
            <div>
                <strong>Total Donated Trees: {totalDonations}</strong>
            </div>
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
};
// =========================================================

// export DonationHistory component
// =========================================================
export default DonationHistory;
// =========================================================