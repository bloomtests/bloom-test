require('dotenv').config()
const HG_API_KEY = process.env.HG_KEY
const HG_WEATHER_URL = 'https://api.hgbrasil.com/weather'
const CONDITION_MESSAGES = {
    '<18': 'Gostaria de um chocolate quente?',
    '>30': {
        '0': 'Não foi possível dar uma sugestão',
        '9': 'O que acha de tomarmos um sorvete hoje?',
        '11': 'O que acha de tomarmos um sorvete hoje?',
        '12': 'O que acha de tomarmos um sorvete hoje?',
        '32': 'O dia está perfeito para uma praia, o que acha?',
        '34': 'O dia está com algumas nuvens, mas esse sol está pedindo uma praia, o que acha?',
        '40': 'O que acha de tomarmos um sorvete hoje?',
        '42': 'O que acha de tomarmos um sorvete hoje?',
        '45': 'O que acha de tomarmos um sorvete hoje?',
        '48': 'Não foi possível concluir a busca pois o serviço está indisponível, portanto, não conseguimos te dar sugestões'
    },
    '<30': {
        '0': 'Não foi possível dar uma sugestão',
        '9': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '11': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '12': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '32': 'O dia está ótimo para fazermos uma atividade ao ar livre, vamos?',
        '34': 'O dia está com algumas nuvens, mas acho que é uma boa ideia fazermos algo ao ar livre, topa?',
        '40': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '42': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '45': 'Acho que o dia está perfeito para vermos um filme, que tal?',
        '48': 'Não foi possível concluir a busca pois o serviço está indisponível, portanto, não conseguimos te dar sugestões'
    }
}

module.exports = {
    HG_API_KEY,
    HG_WEATHER_URL,
    CONDITION_MESSAGES
}