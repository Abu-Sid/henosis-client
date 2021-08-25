import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
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
import { IChannel } from "./Chat";

interface IProps {
  channels: IChannel[];
  handleAddChannel: (data: IChannel) => void;
}

interface IOption {
  value: string;
  label: string;
}

const animatedComponents = makeAnimated();

const ChatChannel = ({ channels, handleAddChannel }: IProps) => {
  const { _id: id, members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const router = useRouter();

  const path = router.query.paths[2] || channels[0]?._id;

  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <section className="chat-channel">
        <div className="chat-channel__text">
          <div className="chat-channel__text-header">
            <h1>Text Channels</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="plus-btn status-plus"
            >
              <HiOutlinePlus />
            </button>
          </div>
          <div className="chat-channels">
            {channels.map(({ _id, chatName }) => (
              <Link passHref key={_id} href={`/workspaces/${id}/chat/${_id}`}>
                <p
                  className={
                    path === _id ? "chat-member active-channel" : "chat-member"
                  }
                >
                  {"# " + chatName}
                </p>
              </Link>
            ))}
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
