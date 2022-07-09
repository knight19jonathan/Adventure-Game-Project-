
// access token  lLE36riPiLMw96zIpi9j 

function getQuote() {
    fetch('https://the-one-api.dev/v2/quote', {
        headers: { Authorization: "Bearer lLE36riPiLMw96zIpi9j" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (quotes) {
            var quoteIndex = Math.floor(Math.random() * 1001)
            var quoteText = quotes.docs[quoteIndex].dialog
            var charId = quotes.docs[quoteIndex].character
            fetch(`https://the-one-api.dev/v2/character/${charId}`, {
                headers: { Authorization: "Bearer lLE36riPiLMw96zIpi9j" }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (quotes) {
                    var charName = quotes.docs[0].name
                    var quoteTextEl =$("#quote-text")
                    quoteTextEl.text(`"${quoteText}" -${charName}, in Lord of the Rings`)
                })
        })
}

$("#lotr-quote-btn").on("click", getQuote)

