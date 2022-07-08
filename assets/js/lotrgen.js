
// access token  lLE36riPiLMw96zIpi9j 

function getQuote() {
    fetch('https://the-one-api.dev/v2/quote', {
        headers: { Authorization: "Bearer lLE36riPiLMw96zIpi9j" }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (quotes) {
            console.log(quotes)
            var quoteIndex = Math.floor(Math.random() * 1001)
            console.log(quoteIndex)
            console.log(quotes.docs[quoteIndex])
            var quoteText = quotes.docs[quoteIndex].dialog
            console.log(quoteText)
            var charId = quotes.docs[quoteIndex].character
            console.log(charId)

            fetch(`https://the-one-api.dev/v2/character/${charId}`, {
                headers: { Authorization: "Bearer lLE36riPiLMw96zIpi9j" }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (quotes) {
                    console.log(quotes)
                    var charName = quotes.docs[0].name
                    console.log(charName)
                    $("#quote-text").text(`"${quoteText}" -${charName}, in Lord of the Rings`)
                })
        })
}

$("#lotr-quote-btn").on("click", getQuote)

