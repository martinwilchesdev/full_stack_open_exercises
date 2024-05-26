const Filter = ({onHandleFilterPerson}) => {
    return (
        <div>
            filter shown with <input onChange={onHandleFilterPerson} />
        </div>
    )
}

export default Filter
