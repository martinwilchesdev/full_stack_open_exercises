import StadisticsLine from './StadisticsLine'

const Stadistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = total / 3
    const positive = (props.good / total) * 100

    if (total < 1) {
        return(
            <p>No feedback given</p>
        )
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>stadistics</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <StadisticsLine text="good" stadisticValue={props.good} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <StadisticsLine text="neutral" stadisticValue={props.neutral} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <StadisticsLine text="bad" stadisticValue={props.bad} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <StadisticsLine text="all" stadisticValue={total} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <StadisticsLine text="average" stadisticValue={average} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <StadisticsLine text="positive" stadisticValue={positive} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Stadistics
