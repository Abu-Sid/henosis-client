import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout, { Token } from "react-stripe-checkout";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
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

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  const router = useRouter();

  useEffect(() => {
    const socketIo = io(
      "https://henosis-server.herokuapp.com/create-workspace"
    );
    setSocket(socketIo);

    socketIo.on("workspace-created", (id) => {
      router.replace(`/workspaces/${id}`);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [router]);

  const handelCreateWorkspace = () => {
    socket.emit("create-workspace", workspaceData);
  };

  const makePayment = (token: Token) => {
    const data = { price, type: "Business", user };

    fetch("https://intense-peak-24388.herokuapp.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, data }),
    })
      .then(() => handelCreateWorkspace())
      .catch((err) => console.log("error", err));
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
