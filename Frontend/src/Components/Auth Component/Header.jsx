
function Header(props) {
    return (
        <div className="text-center">
            <p className="text-2xl xl:text-3xl font-bold text-gray-700 mb-1">{props.header}</p>
            <p className="text-xs xl:text-sm font-medium text-gray-400">{props.subheader}.</p>
        </div>
    )
}

export default Header
