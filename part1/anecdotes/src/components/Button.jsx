const ChangeAnecdote = ({onHandleButton, text}) => {
    return <button onClick={onHandleButton}>{text}</button>
}

export default ChangeAnecdote