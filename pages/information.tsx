import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import WorkspaceForm from "../components/NewWorkspace/WorkspaceForm";
import Payment from "../components/Payment/Payment";
import { priceData } from "../components/Pricing/PriceData";
import withAuthCheck from "../HOC/withAuthCheck";
import { IWorkspace } from "../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../redux/reducers";

interface IData {
  companyName: string;
  companyEmail: string;
  workspaceName: string;
  memberEmail?: string;
}

const Information = () => {
  const [workspaceData, setWorkspaceData] = useState({} as IWorkspace);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { query } = useRouter();

  const btnRef = useRef(null);

  useEffect(() => {
    if (workspaceData.type) {
      btnRef.current.click();
    }
  }, [workspaceData]);

  const submit = (data: IData) => {
    const workspace = {
      ...data,
      type: "Business",
      members: [{ ...user, isCreator: true }],
      previousMails: [] as string[],
    };
    setWorkspaceData(workspace);
  };

  const isAnnual = query.isAnnual === "true" ? true : false;

  const pricing =
    priceData.find((data) => data.title.toLowerCase() === query.name) ||
    priceData[2];

  const price = pricing[isAnnual ? "annualPrice" : "monthlyPrice"];

  return (
    <section className="information">
      <Payment ref={btnRef} workspaceData={workspaceData} price={price} />
      <WorkspaceForm submit={submit} isCompany />
    </section>
  );
};

export default withAuthCheck(Information);
