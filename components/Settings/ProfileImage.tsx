import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import LoadingAnimation from "../ui/Animation/LoadingAnimation";

interface IFormInput {
  email: string;
  imageURL?: any;
}

const ProfileImage = () => {
  const [imageURL, setImageURL] = useState<any>(null);
  //   console.log(imageURL);
  const { email } = useSelector((state: RootState) => state.userReducer.user);
  const [profile, setProfile] = useState<IFormInput>({} as IFormInput);
  //   console.log(profile.imageURL);
  useEffect(() => {
    fetch(`https://intense-peak-24388.herokuapp.com/userimage/${email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setProfile(data.data[0]);
      })
      .catch((err) => console.log(err));
  }, [email]);

  // react hook form
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = () => {
    const loading = toast.loading("Loading...");

    fetch(`https://intense-peak-24388.herokuapp.com/userimage/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageURL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const newProfile = {
            ...profile,
            imageURL,
          };
          setProfile(newProfile);
          toast.dismiss(loading);
          toast.success("Image Successfully Updated!");
          setImageURL(null);
        }
      });
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

  const [disable, setDisable] = useState("img-button");
  const handleDisable = () => {
    if (imageURL === null) {
      setDisable("img-disable-button");
    } else {
      setDisable("img-button");
    }

    // console.log("clicked true");
  };

  return (
    <div className="profile-img">
      {profile.imageURL ? (
        <img
          src={profile.imageURL}
          width={200}
          height={200}
          id="image"
          alt="profile-pic"
          style={{ display: "block" }}
        />
      ) : (
        <LoadingAnimation />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="custom-file-input">
          Upload Photo
          <input
            type="file"
            onChange={handleImageUpload}
            className="custom-file-input"
            required
          />
        </label>

        {imageURL ? (
          <input
            type="submit"
            value="Save Change"
            id="img-button"
            onClick={handleDisable}
            className={disable}
          />
        ) : (
          <input
            type="submit"
            value="Save Change"
            className="img-disable-button"
            disabled
          />
        )}
      </form>
    </div>
  );
};

export default ProfileImage;
