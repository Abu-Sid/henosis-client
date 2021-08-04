import React, { forwardRef, useState } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";

interface IProps {
  workspaceData: IWorkspace;
}

const Payment = (
  { workspaceData }: IProps,
  ref: React.MutableRefObject<any>
) => {
  const [henoPackage, sethenoPackage] = useState({
    name: "premium",
    price: 60,
  });

  const makePayment = (token: Token) => {
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
    <StripeCheckout
      token={makePayment}
      stripeKey="pk_test_51IeGjvINoMfSFYtp8AfrETeunUPxqvb5CT9boxhyfKfu1uYqsmECYT4XbLLhYrAmYwV4TayJ2cwZqw6aWFFG9g2S00UcORVD3A"
      name="Payment Information"
      amount={henoPackage?.price * 100}
      billingAddress
      currency="USD"
      email={workspaceData.companyEmail}
    >
      <button ref={ref} className="checkout-btn-hidden" />
    </StripeCheckout>
  );
};

export default forwardRef(Payment);
