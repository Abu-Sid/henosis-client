import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { IUser } from "../../../auth/authManager";
import { RootState } from "../../../redux/reducers";
import LoadingAnimation from "../../ui/Animation/LoadingAnimation";

interface IProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

let toastId: string;

const AcceptRequest = ({ socket }: IProps) => {
  const { query, replace } = useRouter();

  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

  const { members, _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  useEffect(() => {
    if (query.email) {
      const isValid = /\S+@\S+\.\S+/.test(query.email as string);
      if (!isValid) {
        setLoading(false);
        replace("/");
      } else {
        const previousAdded = members.find(
          (member) => member.email === query.email
        );
        if (!previousAdded) {
          if (socket !== null) {
            socket.emit("userData", query.email);
          }
        } else {
          setLoading(false);
          replace("/");
        }
      }
    } else {
      setLoading(false);
      replace("/");
    }
  }, [query, replace, socket, members]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("userData-receive", (userData: IUser) => {
        setLoading(false);
        setCurrentUser(userData);
      });

      socket.on("added-member", () => {
        toast.dismiss(toastId);
      });
    }
  }, [socket]);

  const handleClick = () => {
    if (socket !== null) {
      if (currentUser) {
        socket.emit("add-member", _id, [...members, currentUser]);
        toastId = toast.loading("Loading...");
        replace(`/workspaces/${_id}/dashboard`);
      } else {
        toast.error("The User Not Found");
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Accept Request</h1>
          <button className="button-primary" onClick={handleClick}>
            Accept Request
          </button>
        </div>
      )}
    </>
  );
};

export default AcceptRequest;
