import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import LoadingAnimation from "../../ui/Animation/LoadingAnimation";
import BillingDetails from "./BillingDetails";

const Billing = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [loading, setLoading] = useState(true);

  const [billingInfos, setBillingInfos] = useState([]);
  useEffect(() => {
    const infos = async () => {
      try {
        const res = await fetch(`https://intense-peak-24388.herokuapp.com/payment/${user.email}`);
        const data = await res.json();
        setBillingInfos(data.data);
        setLoading(false);
      } catch (err) {
        console.log("Error", err);
        setLoading(false);
      }
    };
    infos();
  }, []);
  return (
    <div>
      <h2>Billing</h2>
      {!loading ? (
        <div>
          {billingInfos.length === 0 ? (
            <div style={{ marginTop: "1.5rem", color: "#6c757d" }}>
              <p>You have no business type workspace</p>
            </div>
          ) : (
            <div className="bilingContainer">
              {billingInfos.map((billingInfo) => (
                <BillingDetails
                  key={billingInfo._id}
                  billingInfo={billingInfo}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default Billing;
