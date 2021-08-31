import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Peer from "simple-peer";
import { IUser } from "../../../../auth/authManager";
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
  const { channels, handleAddChannel, showChannel, setShowChannel, socket } =
    useContext(chatContext);

  const [callEnded, setCallEnded] = useState(false);

  const [isVideo, setIsVideo] = useState(false);

  const [userStreams, setUserStreams] = useState<MediaStream[]>([]);

  const [users, setUsers] = useState<IUser[]>([]);

  const { _id: id, members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const path = router.query.paths[2] || channels[0]?._id;

  const [isOpen, setIsOpen] = useState(false);

  const [stream, setStream] = useState<MediaStream>(null);

  const [memberOptions, setMemberOptions] = useState<IOption[]>([]);

  const [assignedMember, setAssignedMember] = useState<string[]>([]);

  const myVideo = useRef(null as HTMLAudioElement);

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

  const handleVoice = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        myVideo.current.srcObject = mediaStream;
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStream,
        });

        peer.on("signal", (data) => {
          socket.emit("call-send", {
            signal: data,
            user,
            id,
          });
        });

        socket.on(
          "call-sended",
          ({ signal, user }: { signal: Peer.SignalData; user: IUser }) => {
            peer.signal(signal);
            setUsers((preUsers) => [...preUsers, user]);
            peer.on("stream", (currentStream) => {
              setUserStreams((preStreams) => [...preStreams, currentStream]);
              console.log(currentStream);
            });
          }
        );
      });
  };

  return (
    <>
      <section
        className={`chat-channel chat-channel-top ${
          showChannel ? "active" : ""
        }`}
      >
        <div className='chat-channel__text'>
          <div className='chat-channel__text-header'>
            <h1>Text Channels</h1>
            <button
              onClick={() => setIsOpen(true)}
              className='plus-btn status-plus'
            >
              <HiOutlinePlus />
            </button>
            <button className='close' onClick={() => setShowChannel(false)}>
              <IoMdClose />
            </button>
          </div>
          <div className='chat-channels'>
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
        <div className='chat-channel__text'>
          <div className='chat-channel__text-header'>
            <h1>Voice Channels</h1>
          </div>
          <div className='chat-channels'>
            <div onClick={handleVoice} className='chat-member active-channel'>
              <Image src={Speaker} alt='Speaker Icon' height={24} width={24} />{" "}
              <p>Meet</p>
            </div>
            {stream && (
              <>
                {isVideo ? (
                  <video
                    playsInline
                    muted={false}
                    autoPlay
                    height="150px"
                    width="150px"
                  />
                ) : (
                  <>
                    <audio playsInline muted autoPlay ref={myVideo} />
                    <h1>1. {user.name}</h1>
                  </>
                )}
              </>
            )}
            {userStreams.map((stream, index) => (
              <Audios
                key={stream.id}
                stream={stream}
                index={index}
                users={users}
              />
            ))}
          </div>
        </div>
        <div className='chat-channel__options'>
          <div className='options-user-pp'>
            <img src={User.src} alt='user profile picture' />
          </div>
          <div className='options-icon'>
            <Image src={Speaker} alt='Speaker Icon' height={24} width={24} />
          </div>
          <div className='options-icon'>
            <Image src={Mic} alt='Microphone Icon' height={24} width={24} />
          </div>
          <div className='options-icon'>
            <Image src={Gear} alt='Gear Icon' height={24} width={24} />
          </div>
        </div>
      </section>
      <Modal modalIsOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className='create-sprint-form'>
          <h2>Create A New Channel</h2>
          <label htmlFor='chatName'>Channel Name:</label>
          <input
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
            type='text'
            placeholder='Channel Name'
            id='chatName'
            name='chatName'
          />
          {error.chatName && (
            <p className='alert-error'>Channel Name Is Required</p>
          )}
          <label>Add Member:</label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={memberOptions}
            className='basic-multi-select'
            onChange={handleChange}
            defaultValue={memberOptions}
          />
          {assignedMember.length < 2 && (
            <p className='alert-error'>Add Minimum Two Members</p>
          )}
          <button type='submit'>Create New Channel</button>
        </form>
      </Modal>
    </>
  );
};

export default ChatChannel;

const Audios = ({
  stream,
  index,
  users,
}: {
  stream: MediaStream;
  index: number;
  users: IUser[];
}) => {
  const userAudioRef = useRef(null as HTMLAudioElement);

  useEffect(() => {
    userAudioRef.current.srcObject = stream;
  }, [stream]);

  return (
    <>
      <audio playsInline autoPlay ref={userAudioRef} />
      <h1>{users[index]?.name}</h1>
    </>
  );
};
