import React, { useState } from "react";
import { useSelector } from "react-redux";
import WorkspaceForm from "../components/NewWorkspace/WorkspaceForm";
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

  const submit = (data: IData) => {
    const workspace = {
      ...data,
      type: "Business",
      members: [{ ...user, isCreator: true }],
    };
    setWorkspaceData(workspace);
  };

  return (
    <section className="information">
      {workspaceData.companyName ? (
        <h1>Order Processing</h1>
      ) : (
        <WorkspaceForm submit={submit} isCompany />
      )}
    </section>
  );
};

export default withAuthCheck(Information);
