const Button = ({onHandleStadistic, text}) => {
    return(
        <button onClick={onHandleStadistic}>{text}</button>
    )
}

export default Button