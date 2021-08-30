import React from "react";

const BillingDetails = (props) => {
  const {
    type,
    price,
    date,
    time,
    members,
    brand,
    companyName,
    address_city,
    address_country,
    companyEmail,
    workspaceName,
    _id,
    funding,
  } = props.billingInfo;

  return (
    <div className="billing-card">
        <h4>Payment Summery</h4>
        <p>Payment Date: {date}</p>
        <p>Payment Time: {time}</p>
        <p>Payment Id: {_id}</p>
        <p>Company Email: {companyEmail}</p>
        <p>Company Name: {companyName}</p>
        <p>Location: {address_city}, {address_country}.</p>
        <p>Card Type: {brand}</p>
        <p>Payment Method: {funding}</p>
        <p>Total Pay: {price}</p>
        <h4>Workspace Summery</h4>
        <p>Workspace Name: {workspaceName}</p>
        <p>Workspace Type: {type}</p>
        <p>Total Members: {members.length}</p>
    </div>
  );
};

export default BillingDetails;
