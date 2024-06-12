import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [coupon,setCoupon]=useState('');
  const [discountParcent,setDiscountParcent]=useState(0);
  const [amount,setAmount]=useState(90);
  const [discountAmount,setDiscountAmount]=useState(90)
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();



  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: amount,coupon_code:coupon })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
          setDiscountParcent(discountParcent)
          setDiscountAmount(discountAmount)
        });
    }
  }, [axiosSecure, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTransactionId("");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } 
    else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transactions id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the databse
        const payment = {
          email: user?.email,
          price: discountAmount,
          transactionId: paymentIntent.id,
          data: new Date(),
          status: "verified",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank You for the payment",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/profile");
          
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>

<input type="text"
placeholder="Enter Coupon Code"
value={coupon}
onChange={(e)=> setCoupon(e.target.value)}
className="input input-bordered my-4 mb-6"
/>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn p-4 my-10 bg-black text-yellow-600"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your Transaction id {transactionId} </p>
      )}

    </form>
  );
};

export default CheckOutForm;
