import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Submit(props) {
    return (
        <>
            <Button type="submit" className="w-28 mx-auto" color="black" loading={props.loading}>{props.buttonName}</Button>
            <span className="text-center text-gray-700 pb-4">{props.title}<Link to={props.navigate} className="text-gray-800 font-medium"> {props.sign}</Link></span>
        </>
    )
}

export default Submit
