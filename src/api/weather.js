const fetch = require('node-fetch')
const { HG_WEATHER_URL, HG_API_KEY, CONDITION_MESSAGES } = require('./weather-consts')

const fetchWeatherInfo = async city => {
    const url = new URL(HG_WEATHER_URL)
    const params = {
        key: HG_API_KEY,
        city_name: city
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url)
    return await response.json()
}

const getWeatherInfo = async city => {
    const response = await fetchWeatherInfo(city)
    let message = null

    if (response['by'] === 'default') {
        message = 'Não foi possível encontrar sua cidade, portanto, não conseguimos te dar sugestões'
    } else {
        const temp = response['results']['temp']
        const condition = response['results']['condition_code']

        if (condition !== undefined) {
            if (temp <= 18) {
                message = CONDITION_MESSAGES['<18']
            } else if (temp >= 30) {
                message = CONDITION_MESSAGES['>30'][condition]
            } else {
                message = CONDITION_MESSAGES['<30'][condition]
            }
        } else {
            message = 'Não foi possível realizar a busca da cidade, portanto, não conseguimos te dar sugestões'
        }

    }

    return message

}

module.exports = {
    getWeatherInfo
}