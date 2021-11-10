const Input = (props) => {
    const Styled = {
        "One": "w-full px-3",
        "TwoLeft": "w-full md:w-1/2 px-3 mb-6 md:mb-0",
        "TwoRight": "w-full md:w-1/2 px-3",
        "Three": "w-full md:w-1/3 px-3 mb-6 md:mb-0"
    }

    return (
        <div className={Styled[props.styledType]}>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={props.name}>
                {props.label || props.name}
            </label>
            <input name={props.name} id={props.name} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
        </div>
    )
}

export default Input;
