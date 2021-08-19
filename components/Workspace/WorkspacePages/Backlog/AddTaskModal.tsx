import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useForm from "../../../../hooks/useForm";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";

const animatedComponents = makeAnimated();

interface IProps {
  submit: (data: any) => void;
  setAssignedMember: React.Dispatch<React.SetStateAction<string[]>>;
  updateTask?: ITask;
}

interface IOption {
  value: string;
  label: string;
}

const inputsData = [
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

const AddTaskModal = ({ submit, setAssignedMember, updateTask }: IProps) => {
  const { taskName, dueDate, assignedMember, _id } = updateTask || {};
  const {
    handleInput,
    handleInvalid,
    handleSubmit,
    error,
    inputData,
    handleDateChange,
  } = useForm(
    updateTask
      ? { taskName, dueDate: new Date(dueDate), _id }
      : { dueDate: new Date() }
  );

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

  let defaultSelected: {
    value: string;
    label: string;
  }[];
  if (updateTask) {
    const selectedMembers = members.filter((member) =>
      assignedMember.includes(member.email)
    );
    defaultSelected = selectedMembers.map((member) => ({
      value: member.email,
      label: member.name,
    }));
  }

  const handleChange = (value: IOption[]) => {
    const assignedMembers = value.map((option) => option.value);
    setAssignedMember(assignedMembers);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
      <h2>Task Information</h2>
      {inputsData.map(({ title, name, type }, index) => (
        <div key={index}>
          <label htmlFor={name}>{title}</label>
          {type !== "date" ? (
            <input
              id={name}
              type={type}
              name={name}
              placeholder={title}
              onChange={handleInput}
              required
              onInvalid={handleInvalid}
              defaultValue={updateTask?.[name]}
            />
          ) : (
            <ReactDatePicker
              selected={inputData[name]}
              onChange={(date) => handleDateChange(date, name)}
              minDate={new Date()}
              showDisabledMonthNavigation
              dateFormat="dd/MM/yyyy"
              placeholderText={title}
              className={name}
            />
          )}
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
        defaultValue={defaultSelected}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskModal;
