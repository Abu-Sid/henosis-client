import { useCallback, useMemo, useState } from "react";

export interface IUseForm {
  confirmPassword?: string;
  password?: string;
}

const useForm = <T extends IUseForm>(defaultValue = {} as T) => {
  const [inputData, setInputData] = useState(defaultValue);

  const [error, setError] = useState({} as T);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, files, required } = e.target;

    const handleError = (isError: boolean, provider?: string) =>
      setError((preError) => ({ ...preError, [provider || name]: isError }));

    if (required && name.toLowerCase().includes("email")) {
      const isValid = /\S+@\S+\.\S+/.test(value);
      if (isValid) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "name") {
      const length = value.trim().length >= 6;
      const isValid = /^([^0-9]*)$/.test(value);
      if (isValid && length) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "password") {
      const isValid = value.trim().length >= 6;
      if (inputData.confirmPassword) {
        const match = value === inputData.confirmPassword;
        if (match) {
          handleError(false, "confirmPassword");
        } else {
          handleError(true, "confirmPassword");
        }
      }
      if (isValid) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "confirmPassword") {
      const isValid = value.trim().length >= 6;
      const match = inputData.password === value;
      if (isValid && match) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (name === "workspaceName" || name === "companyName") {
      if (value.trim().length >= 6) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && value.trim().length < 1) {
      handleError(true);
    } else {
      handleError(false);
    }
    setInputData((data) => ({
      ...data,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleDateChange = (date: Date, name: string) => {
    setInputData((preData) => ({ ...preData, [name]: date }));
    if (date) {
      setError((preError) => ({ ...preError, [name]: false }));
    } else {
      setError((preError) => ({ ...preError, [name]: true }));
    }
  };

  const handleFocus = useCallback(
    (node) => {
      const required = [...node]
        .map((item) =>
          item.required
            ? item.name
            : item.className.includes("Date") && item.className
        )
        .filter(Boolean);
      const filtered = required.filter((item) => {
        if (!inputData[item]) {
          return true;
        }
        return error[item];
      });

      if (filtered.length) {
        [...node].forEach(
          (item) =>
            (item.name === filtered[0] && item.focus()) ||
            (item.className === filtered[0] && item.focus())
        );
      }

      return filtered;
    },
    [error, inputData]
  );

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const node = e.currentTarget.parentElement;
    handleFocus(
      node.tagName === "FORM"
        ? node
        : node.parentElement.tagName === "FORM"
        ? node.parentElement
        : node.parentNode.parentNode
    );
    const { name } = e.currentTarget;
    if (!inputData[name]) {
      setError((preError) => ({ ...preError, [name]: true }));
    }
  };

  const handleSubmit = useMemo(
    () =>
      (submit: (data: T, e: React.FormEvent<HTMLFormElement>) => void) =>
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const filtered = handleFocus(e.target);

        if (!filtered.length) {
          submit(inputData, e);
          e.currentTarget.reset();
          setInputData(defaultValue);
        }
      },
    [inputData, handleFocus, defaultValue]
  );

  return {
    handleInput,
    handleSubmit,
    error,
    inputData,
    handleInvalid,
    handleDateChange,
  };
};

export default useForm;
