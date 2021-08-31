import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import UserImagePlaceholder from "./UserImagePlaceholder";

interface ITaskCard {
  taskName: string;
  memberName: string;
  date: string | object;
}

const DashboardAccount: React.FC = () => {
  const router = useRouter();
  const path = router.query.paths?.[0];

  const { name, photo } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const { workspaceName } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  return (
    <>
      <div className="personal-dashboard__account__user">
        <div className="user-image">
          {photo ? (
            <img className="user-img" src={photo} alt="" />
          ) : (
            <UserImagePlaceholder size={190} />
          )}
        </div>
        <div className="user-information">
          <h1>{name}</h1>
          <p>Developer of {workspaceName}</p>
        </div>
      </div>
      <div className="personal-dashboard__account__tasks">
        <div className="ongoing-tasks-header">
          <h1>Ongoing Tasks</h1>
          <Link href={`${path}/board`}>
            <a>View All</a>
          </Link>
        </div>
        <OngoingTask
          taskName="Testing1"
          memberName="John Doe"
          date="20/08/2021"
        />
        <OngoingTask
          taskName="Testing2"
          memberName="John Doe"
          date="20/08/2021"
        />
        <OngoingTask
          taskName="Testing3"
          memberName="John Doe"
          date="20/08/2021"
        />
      </div>
    </>
  );
};

const OngoingTask: React.FC<ITaskCard> = ({ taskName, memberName, date }) => {
  return (
    <div className="ongoing-task">
      <h1>{taskName}</h1>
      <div className="ongoing-task__information">
        <p>{memberName}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default DashboardAccount;
