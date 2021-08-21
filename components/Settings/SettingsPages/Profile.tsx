import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { RootState } from "../../../redux/reducers";
import ProfileDetails from "../ProfileDetails";

interface IFormInput {
  name: string;
  email: string;
  githubLink: string;
  location: string;
  imageURL: any;
  bio: string;
  _id: number;
}

const Profile = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);
  const [profile, setProfile] = useState<IFormInput>({} as IFormInput);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.data[0]);
      });
  }, [email]);

  const [imageURL, setImageURL] = useState<any>(null);
  // modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // react hook form
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (
    data,
    e: React.BaseSyntheticEvent<object>
  ) => {
    if (data) {
      const { githubLink, location, bio } = data;
      e.target.reset();
      fetch(`http://localhost:5000/user/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageURL,
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
              imageURL,
              githubLink,
              location,
              bio,
            };
            setProfile(newProfile);
            setOpen(false);
          }
        });
    }
  };

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "5025c7b89b9227cb3def831a08b2a19e");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="right-division">
        <h2>Profile</h2>
        <button className="admin-button" onClick={onOpenModal}>
          Edit Profile
        </button>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="admin-info">
            <h2>User Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Github Link</label>
              <input {...register("githubLink")} type="text" required />
              <label>Address</label>
              <input {...register("location")} type="text" required />
              <label>Bio</label>
              <input {...register("bio")} type="text" required />
              <label>Upload Image</label>
              <input type="file" onChange={handleImageUpload} required />
              <input
                type="submit"
                value="Save Profile Information"
                className="button"
              />
            </form>
          </div>
        </Modal>
      </div>
      <div className="user-content">
        {/* {profile.map((info) => ( */}
        <ProfileDetails info={profile} />
        {/* ))} */}
      </div>
    </div>
  );
};

export default Profile;
