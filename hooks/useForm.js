import { useCallback, useMemo, useState } from "react";

const useForm = () => {

    const [inputData, setInputData] = useState({});

    const [error, setError] = useState({});

    const handleInput = e => {
        const { value, name, files, required } = e.target;

        const handleError = (isError, provider) => setError(preError => ({...preError, [provider||name]: isError}));

        if (required&&name==='email') {
            const isValid = /\S+@\S+\.\S+/.test(value);
            if (isValid) {
                handleError(false);
            }
            else {
                handleError(true);
            }
        }
        else if (required&&name==='password') {
            const isValid = value.length>=6;
            if (inputData.confirmPassword) {
                const match = value === inputData.confirmPassword;
                if (match) {
                    handleError(false, 'confirmPassword');
                }
                else {
                    handleError(true, 'confirmPassword');
                }
            }
            if (isValid) {
                handleError(false);
            }
            else {
                handleError(true);
            }
        }
        else if (required&&name==='confirmPassword') {
            const isValid = value.length>=6;
            const match = inputData.password === value;
            if (isValid&&match) {
                handleError(false);
            }
            else {
                handleError(true);
            }
        }
        else if (required&&value.length<1) {
            handleError(true);
        }
        else{
            handleError(false);
        }
        setInputData(data=> ({...data, [name]: name==='image'?files[0]:value}));
    }

    const handleFocus = useCallback(node => {
        const required = [...node].map(item=> item.required&&item.name).filter(Boolean);
        
        const filtered = required.filter(item => {
            if (!inputData[item]) {
                return true;
            }
            return error[item];
        });

        if (filtered.length){
            [...node].forEach(item=> item.name===filtered[0]&&item.focus());
        }
        return filtered;
    }, [error, inputData])

    const handleInvalid = e => {
        e.preventDefault();
        handleFocus(e.target.parentNode);
        const { name } = e.target;
        if (!inputData[name]) {
            setError(preError => ({...preError, [name]: true}));
        }
    }

    const handleSubmit = useMemo(() => submit => e => {
        e.preventDefault();

        const filtered = handleFocus(e.target);

        if(!filtered.length){
            submit(inputData, e);
            e.target.reset();
            setInputData({});
        }
    }, [inputData, handleFocus])

    return {
        handleInput,
        handleSubmit,
        error,
        inputData,
        handleInvalid
    }
};

export default useForm;