import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Payment = () => {
  const [henoPackage, sethenoPackage] = useState({
    name: "premium",
    price: "60",
  });

  const makePayment = (token) => {
    fetch("https://intense-peak-24388.herokuapp.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, henoPackage }),
    })
      .then((res) => console.log("server response", res))
      .catch((err) => console.log("error", err));
  };
  return (
    <div>
      <StripeCheckout
        token={makePayment}
        stripeKey="pk_test_51IeGjvINoMfSFYtp8AfrETeunUPxqvb5CT9boxhyfKfu1uYqsmECYT4XbLLhYrAmYwV4TayJ2cwZqw6aWFFG9g2S00UcORVD3A"
        name="Card Information"
        amount={henoPackage?.price * 100}
        billingAddress
        currency="USD"
      >
        <button>pay now</button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
