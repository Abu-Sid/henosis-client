import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import empty from "../../../../public/images/empty.png";
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
        <div className="board-error">
          <h1 style={{ color: "blue" }} className="alert-error">
            Welcome to Henosis WorkSpace. Please create a sprint to manage your
            project.
          </h1>
          <Link href={`/workspaces/${_id}/backlog`} passHref>
            <button className="button-primary">Create Sprint</button>
          </Link>
          <img src={empty.src} alt="" />
        </div>
      )}
    </>
  );
};

export default Sprint;
