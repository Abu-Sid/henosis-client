import { useRouter } from "next/router";
import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StripeCheckout, { Token } from "react-stripe-checkout";
import useSocket from "../../hooks/useSocket";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../redux/reducers";

interface IProps {
  workspaceData: IWorkspace;
  price: number;
}

const Payment = (
  { workspaceData, price }: IProps,
  ref: React.MutableRefObject<any>
) => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const socket = useSocket("/create-workspace");

  const socket2 = useSocket("/chat", "https://henosis-server-bd.herokuapp.com");

  useEffect(() => {
    if (socket !== null) {
      socket.on("workspace-created", (id) => {
        socket2.emit("create-channel", {
          chatName: "general",
          workspaceId: id,
          users: [],
        });
        router.replace(`/workspaces/${id}/dashboard`);
      });
    }
  }, [socket, router, socket2]);

  const handelCreateWorkspace = (loadingId: string) => {
    toast.dismiss(loadingId);
    if (socket !== null) {
      socket.emit("create-workspace", workspaceData);
    }
  };

  const makePayment = (token: Token) => {
    const data = { price, type: "Business", ...user, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() };
    const info = { ...token.card, ...data, ...workspaceData };
    const loadingId = toast.loading("Loading...");
    console.log(info);

    fetch("https://intense-peak-24388.herokuapp.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then(() => handelCreateWorkspace(loadingId))
      .catch((err) => toast.dismiss(loadingId));
  };

  return (
    <StripeCheckout
      token={makePayment}
      stripeKey="pk_test_51IeGjvINoMfSFYtp8AfrETeunUPxqvb5CT9boxhyfKfu1uYqsmECYT4XbLLhYrAmYwV4TayJ2cwZqw6aWFFG9g2S00UcORVD3A"
      name="Payment Information"
      amount={price * 100}
      billingAddress
      currency="USD"
      email={user.email}
    >
      <button ref={ref} className="checkout-btn-hidden" />
    </StripeCheckout>
  );
};

export default forwardRef(Payment);
