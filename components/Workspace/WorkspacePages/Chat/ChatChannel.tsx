import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useForm, { IUseForm } from "../../../../hooks/useForm";
import Gear from "../../../../public/images/icons/cog.svg";
import Mic from "../../../../public/images/icons/microphone.svg";
import User from "../../../../public/images/icons/user-pp.svg";
import Speaker from "../../../../public/images/icons/volume-up.svg";
import { RootState } from "../../../../redux/reducers";
import Modal from "../../../Modal/Modal";
import { chatContext } from "./ChatContainer";

interface IOption {
  value: string;
  label: string;
}

const animatedComponents = makeAnimated();

const ChatChannel = () => {
  const { channels, handleAddChannel, showChannel, setShowChannel } =
    useContext(chatContext);

  const { _id: id, members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const router = useRouter();

  const path = router.query.paths[2] || channels[0]?._id;

  const [isOpen, setIsOpen] = useState(false);

  const [stream, setStream] = useState<MediaStream>(null);

  const [memberOptions, setMemberOptions] = useState<IOption[]>([]);

  const [assignedMember, setAssignedMember] = useState<string[]>([]);

  useEffect(() => {
    const options: IOption[] = members.map((member) => ({
      value: member.email,
      label: member.name,
    }));
    setMemberOptions(options);
    const value = members.map((member) => member.email);
    setAssignedMember(value);
  }, [members]);

  const handleChange = (value: IOption[]) => {
    const assignedMembers = value.map((option) => option.value);
    setAssignedMember(assignedMembers);
  };

  const { handleInput, handleSubmit, handleInvalid, error } = useForm<
    { chatName: string } & IUseForm
  >();

  const submit = (data: { chatName: string }) => {
    const { chatName } = data;
    if (assignedMember.length >= 2) {
      handleAddChannel({ chatName, users: assignedMember, workspaceId: id });
      setIsOpen(false);
    }
  };

  const streamRef = useRef(null as HTMLVideoElement);

  const handleVoice = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        streamRef.current.srcObject = mediaStream;
      });
  };

  return (
    <>
      <section
        className={`chat-channel chat-channel-top ${
          showChannel ? "active" : ""
        }`}
      >
        <div className="chat-channel__text">
          <div className="chat-channel__text-header">
            <h1>Text Channels</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="plus-btn status-plus"
            >
              <HiOutlinePlus />
            </button>
            <button className="close" onClick={() => setShowChannel(false)}>
              <IoMdClose />
            </button>
          </div>
          <div className="chat-channels">
            {channels.map(({ _id, chatName }) => (
              <Link passHref key={_id} href={`/workspaces/${id}/chat/${_id}`}>
                <p
                  className={
                    path === _id ? "chat-member active-channel" : "chat-member"
                  }
                  onClick={() => setShowChannel(false)}
                >
                  {"# " + chatName}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="chat-channel__text">
          <div className="chat-channel__text-header">
            <h1>Voice Channels</h1>
          </div>
          <div className="chat-channels">
            <div onClick={handleVoice} className="chat-member active-channel">
              <Image src={Speaker} alt="Speaker Icon" height={24} width={24} />{" "}
              <p>Meet</p>
            </div>
          </div>
        </div>
        <div className="chat-channel__options">
          <div className="options-user-pp">
            <Image
              src={User}
              alt="user profile picture"
              height={40}
              width={40}
            />
          </div>
          <div className="options-icon">
            <Image src={Speaker} alt="Speaker Icon" height={24} width={24} />
          </div>
          <div className="options-icon">
            <Image src={Mic} alt="Microphone Icon" height={24} width={24} />
          </div>
          <div className="options-icon">
            <Image src={Gear} alt="Gear Icon" height={24} width={24} />
          </div>
        </div>
      </section>
      <Modal modalIsOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
          <h2>Create A New Channel</h2>
          <label htmlFor="chatName">Channel Name:</label>
          <input
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
            type="text"
            placeholder="Channel Name"
            id="chatName"
            name="chatName"
          />
          {error.chatName && (
            <p className="alert-error">Channel Name Is Required</p>
          )}
          <label>Add Member:</label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={memberOptions}
            className="basic-multi-select"
            onChange={handleChange}
            defaultValue={memberOptions}
          />
          {assignedMember.length < 2 && (
            <p className="alert-error">Add Minimum Two Members</p>
          )}
          <button type="submit">Create New Channel</button>
        </form>
      </Modal>
    </>
  );
};

export default ChatChannel;
