import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { RootState } from "../../../redux/reducers";
import LoadingAnimation from "../../ui/Animation/LoadingAnimation";
import ProfileDetails from "../ProfileDetails";
import toast from "react-hot-toast";

interface IFormInput {
  name: string;
  email: string;
  githubLink: string;
  location: string;
  bio: string;
  _id: number;
}

const Profile = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);
  const [profile, setProfile] = useState<IFormInput>({} as IFormInput);
  useEffect(() => {
    fetch(`https://intense-peak-24388.herokuapp.com/user/${email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setProfile(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, [email]);

  // modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // react hook form
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data) {
      const { githubLink, location, bio } = data;
      const loadingId = toast.loading("Loading...");

      fetch(`https://intense-peak-24388.herokuapp.com/user/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubLink,
          location,
          bio,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const newProfile = {
              ...profile,
              githubLink,
              location,
              bio,
            };
            setProfile(newProfile);
            toast.dismiss(loadingId);
            toast.success("Profile Updated Successfully!");
          }
        });
    }
    setOpen(false);
  };
  const [data, setData] = useState(false);
  const handleDisable = () => {
    setData(true);
  };

  return (
    <div>
      <div className="right-division">
        <h2>Profile</h2>
        <button className="admin-button" onClick={onOpenModal}>
          Edit Information
        </button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="admin-info">
            <h2>User Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Github Link</label>
              <input
                {...register("githubLink")}
                type="text"
                onBlur={handleDisable}
                defaultValue={profile.githubLink}
              />
              <label>Address</label>
              <input
                {...register("location")}
                type="text"
                onBlur={handleDisable}
                defaultValue={profile.location}
              />
              <label>Bio</label>
              <input
                {...register("bio")}
                type="text"
                onBlur={handleDisable}
                defaultValue={profile.bio}
              />

              {data ? (
                <input
                  type="submit"
                  value="Save Profile Information"
                  className="button"
                />
              ) : (
                <input
                  type="submit"
                  value="Save Profile Information"
                  className="disable-button"
                  disabled
                />
              )}
            </form>
          </div>
        </Modal>
      </div>
      {profile.email ? (
        <div className="user-content">
          <ProfileDetails info={profile} />
        </div>
      ) : (
        <div className="user-content">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default Profile;
