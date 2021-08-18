import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IUser } from "../auth/authManager";
import LoadingAnimation from "../components/ui/Animation/LoadingAnimation";
import withAuthCheck from "../HOC/withAuthCheck";
import useSocket from "../hooks/useSocket";
import { RootState } from "../redux/reducers";

let toastId: string;

interface IData {
  members: IUser[];
  previousMails: string[];
}

const AcceptRequest = () => {
  const socket = useSocket("/workspace");

  const { query, replace } = useRouter();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({} as IData);

  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (!query.id) {
      replace("/");
    } else if (socket !== null) {
      socket.emit("is-email-sended", { _id: query.id, email: user.email });
    }
  }, [query, replace, socket, user.email]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("request-error", () => {
        replace("/");
      });
    }
  }, [socket, replace]);

  useEffect(() => {
    if (socket !== null) {
      socket.on(
        "is-sended-reply",
        (isSended: boolean, members: IUser[], previousMails: string[]) => {
          setLoading(false);
          if (!isSended) {
            replace("/");
          } else {
            setData({ members, previousMails });
          }
        }
      );
    }
  }, [socket, replace]);

  useEffect(() => {
    if (socket) {
      socket.on("added-member", () => {
        toast.dismiss(toastId);
        toast.success("You Added Successfully!");
        replace(`/workspaces/${query.id}/`);
      });
    }
  }, [socket, replace, query]);

  const handleClick = () => {
    if (socket !== null) {
      const newMails = data.previousMails.filter((mail) => mail !== user.email);
      socket.emit("add-member", query.id, [...data.members, user], newMails);
      toastId = toast.loading("Loading...");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="accept-request">
          <h1>Click Here For Accept Request</h1>
          <button onClick={handleClick} className="button-primary">
            Accept Request
          </button>
        </div>
      )}
    </>
  );
};

export default withAuthCheck(AcceptRequest);
