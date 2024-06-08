const Notification = ({ message, error }) => {
    const messageColor = {
        color: error ? 'red' : 'green'
    }

    if (message == null) {
        return null
    }

    return (
        <div className="message" style={messageColor}>
            {message}
        </div>
    )
}

export default Notification