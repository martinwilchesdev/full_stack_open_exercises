const StadisticsLine = ({ text, stadisticValue }) => {
    return (
        <span>
        {text} {Math.round(stadisticValue * 100) / 100} {text == "positive" ? "%" : ""}
        </span>
    )
}

export default StadisticsLine
