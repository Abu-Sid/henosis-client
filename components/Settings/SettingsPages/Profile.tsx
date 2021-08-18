import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
// import icon from "../../../public/images/icons/purple.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

interface IFormInput {
  name: String;
  email: String;
  githubLink:String;
  location:String;
  bio:String;
}

const Profile = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);
  const [profile, setProfile] = useState([]);
// console.log(profile);
console.log(email);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${email}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
        })
}, [])

  const [imageURL, setImageURL] = useState<String>(null)
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
      const { name, email, githubLink, location, bio } = data;
      // sent data to database
      fetch("http://localhost:5000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, imageURL, githubLink, location, bio }),
      });
      e.target.reset();
      setOpen(false);
    }
  };

  const handleImageUpload = event => {
    const imageData = new FormData();
    imageData.set('key', '5025c7b89b9227cb3def831a08b2a19e');
    imageData.append('image', event.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload', imageData)
        .then(function (response) {
            setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
            console.log(error);
        });
}
  return (
    <div className="right-division">
      <h2>Profile</h2>
      <button className="admin-button" onClick={onOpenModal}>
        Add Profile
      </button>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="admin-info">
          <h2>Admin Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input {...register("name")} type="text" required />
            <label>Email</label>
            <input {...register("email")} type="email" required />
            <label>Upload Image</label>
            <input type="file" onChange={handleImageUpload} required />
            <label>Github Link</label>
            <input {...register("githubLink")} type="text" required />
            <label>Location</label>
            <input {...register("location")} type="text" required />
            <label>Bio</label>
            <input {...register("bio")} type="text" required />
            <input
              type="submit"
              value="Save Profile Information"
              className="button"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;

// sid bro //
// import React from "react";
// import icon from "../../../public/images/icons/purple.svg";
// import { Form, FormHeader, FormInputField } from "../../Form/Form";
// const Profile: React.FC = () => {
//   const onSubmit = () => {};
//   return (
//     <div className="Setting__profile">
//       <Form width={800}>
//         <FormHeader>User</FormHeader>
//         <FormInputField name="name" type="text">
//           Name
//         </FormInputField>
//         <FormInputField name="email" type="text">
//           Email
//         </FormInputField>
//         <img src={icon.src} alt="user-icon" className="user-icon" />
//         <button>Browse Image</button>

//         <br />
//         <br />
//         <br />
//         <FormHeader>Basic</FormHeader>
//         <FormInputField name="github" type="text">
//           GitHub Link
//         </FormInputField>
//         <FormInputField name="Location" type="text">
//           Location
//         </FormInputField>
//         <FormInputField name="bio" type="text">
//           Bio
//         </FormInputField>
//         <FormInputField type="submit" value={"Save Profile Information"} />
//       </Form>
//     </div>
//   );
// };

// export default Profile;
