import React from "react";
import icon from "../../../public/images/icons/purple.svg";
import { Form, FormHeader, FormInputField } from "../../Form/Form";
const Profile: React.FC = () => {
  const onSubmit = () => {};
  return (
    <div className="Setting__profile">
      <Form width={800}>
        <FormHeader>User</FormHeader>
        <FormInputField name="name" type="text">
          Name
        </FormInputField>
        <FormInputField name="email" type="text">
          Email
        </FormInputField>
        <img src={icon.src} alt="user-icon" className="user-icon" />
        <button>Browse Image</button>

        <br />
        <br />
        <br />
        <FormHeader>Basic</FormHeader>
        <FormInputField name="github" type="text">
          GitHub Link
        </FormInputField>
        <FormInputField name="Location" type="text">
          Location
        </FormInputField>
        <FormInputField name="bio" type="text">
          Bio
        </FormInputField>
        <FormInputField type="submit" value={"Save Profile Information"} />
      </Form>
    </div>
  );
};

export default Profile;
