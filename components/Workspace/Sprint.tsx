import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import LoadingAnimation from "../ui/Animation/LoadingAnimation";

interface IProps {
  children: React.ReactNode;
}

const Sprint = ({ children }: IProps) => {
  const { loading, sprint } = useSelector(
    (state: RootState) => state.sprintReducer
  );

  const { _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : sprint._id ? (
        children
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "red" }} className="alert-error">
            No Sprint Here
          </h1>
          <Link href={`/workspaces/${_id}/backlog`} passHref>
            <button className="button-primary">Create A Sprint</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Sprint;
