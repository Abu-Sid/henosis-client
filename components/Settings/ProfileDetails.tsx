import React from "react";
import ProfileImage from "./ProfileImage";
interface IProps {
  info: {
    name: string;
    email: string;
    githubLink: string;
    location: string;
    imageURL?: any;
    bio: string;
    _id: number;
  };
}

const ProfileDetails = (props: IProps) => {
  const { name, email, githubLink, location, bio } = props.info || {};
  return (
    <div id="profile-body">
      <div className="profile-left">
        <ProfileImage />
      </div>
      <div className="profile-right">
        <div>
          <h4>Full Name</h4>
          <p>{name} </p>
        </div>
        <br />
        <div>
          <h4>Email Address</h4>
          <p>{email}</p>
        </div>
        <br />
        <div>
          <h4>GitHub Link</h4>
          <p>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              {githubLink}
            </a>
          </p>
        </div>
        <br />
        <div>
          <h4>Address</h4>
          <p>{location}</p>
        </div>
        <br />
        <div>
          <h4>Bio</h4>
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
