
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../Components/SEctionTitle';
import CheckOutForm from './ChekOutForm';
import { loadStripe } from '@stripe/stripe-js';


const stripPromise=loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => (
    <div>
        <div className='w-1/4 mx-auto'><SectionTitle
            subHeading={'Please pay For Subcription'}
            heading={'PAYMENT'}
        ></SectionTitle></div>

       <div>
       <Elements stripe={stripPromise}>
        <CheckOutForm></CheckOutForm>
    </Elements>
       </div>

    </div>
);

export default Payment;