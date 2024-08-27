function ErrorMessage(props) {
    return props.error ? <div className="text-red-500 absolute text-sm sm:text-md">{props.error}</div> : null;
}

export default ErrorMessage
