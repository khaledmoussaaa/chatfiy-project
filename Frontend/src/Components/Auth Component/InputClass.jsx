const InputClass = (error, success) => {
    if (error) return 'border-red-500 placeholder-red-500';
    if (success) return 'valid:border-green-500 valid:text-green-700';
    return '';
};

export default InputClass;