const CountryInfo = ({ country }) => {
    const languages = []

    for (const lang in country.languages) {
        languages.push(country.languages[lang])
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p><strong>capital</strong> {country.capital.map(capital => capital).join(', ')}</p>
            <p><strong>area</strong> {country.area}</p>
            <h3>languages</h3>
            <ul>
                {
                    languages.map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default CountryInfo