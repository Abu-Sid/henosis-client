import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useForm from "../../../hooks/useForm";
import { RootState } from "../../../redux/reducers";

const animatedComponents = makeAnimated();

interface IProps {
  submit: (data: any) => void;
  setAssignedMember: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IOption {
  value: string;
  label: string;
}

interface IForm {
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
  handleSubmit: (submit: (data: any) => void) => (e: any) => void;
  error: any;
}

const inputData = [
  {
    title: "Task name",
    name: "taskName",
    type: "text",
  },
  {
    title: "Due Date",
    name: "dueDate",
    type: "date",
  },
];

const AddTaskModal = ({ submit, setAssignedMember }: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error }: IForm = useForm();

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const [memberOptions, setMemberOptions] = useState<IOption[]>([]);

  useEffect(() => {
    members.forEach((member) => {
      setMemberOptions((preValue) => [
        ...preValue,
        { value: member.email, label: member.name },
      ]);
    });
  }, [members]);

  const handleChange = (value: IOption[]) => {
    const assignedMembers = value.map((option) => option.value);
    setAssignedMember(assignedMembers);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
      <h2>Task Information</h2>
      {inputData.map(({ title, name, type }, index) => (
        <div key={index}>
          <label htmlFor={name}>{title}</label>
          <input
            id={name}
            type={type}
            name={name}
            placeholder={title}
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
          />
          {error[name] && <p className="alert-error">{title} is required</p>}
        </div>
      ))}
      <label>Assigned to</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={memberOptions}
        className="basic-multi-select"
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskModal;
