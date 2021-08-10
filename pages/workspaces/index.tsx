import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
import WorkspacesTable from "../../components/Workspaces/WorkspacesTable";
import withAuthCheck from "../../HOC/withAuthCheck";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../redux/reducers";

const Workspaces = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);

  const [loading, setLoading] = useState(true);

  // console.log(
  //   workspaces.filter(
  //     (space) =>
  //       space?.members.filter(
  //         (member) => member.isCreator && member.email === user.email
  //       ).length === 1
  //   ).length
  // );

  useEffect(() => {
    const socket = io(
      "https://intense-peak-24388.herokuapp.com/user-workspaces"
    );

    socket.emit("request-user-workspaces", user.email);

    socket.on("response-user-workspaces", (workspaces) => {
      if (workspaces) {
        if (workspaces.length) {
          setWorkspaces(workspaces);
          setLoading(false);
        } else {
          router.replace("/new-workspace");
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user, router]);

  return (
    <section className='workspaces'>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className='workspaces-header'>
            <h1>Workspaces</h1>
            <Link href='/new-workspace' passHref>
              <button className='button-primary'>Create new project</button>
            </Link>
          </div>
          <WorkspacesTable workspaces={workspaces} />
        </>
      )}
    </section>
  );
};

export default withAuthCheck(Workspaces);
