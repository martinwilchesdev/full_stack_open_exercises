const PersonsForm = ({onHandleName, onHandleNumber, onHandleSubmitInfo}) => {
    return (
        <form>
            <div>
                name: <input onChange={onHandleName} />
            </div>
            <div>
                number: <input onChange={onHandleNumber} />
            </div>
            <div>
                <button type="submit" onClick={onHandleSubmitInfo}>
                    add
                </button>
            </div>
        </form>
    )
}

export default PersonsForm
