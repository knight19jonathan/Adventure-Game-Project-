
// access token  lLE36riPiLMw96zIpi9j 
fetch('https://the-one-api.dev/v2/quote', {
    headers: {Authorization: "Bearer lLE36riPiLMw96zIpi9j"}
})
    .then(function(response){
        return response.json()
    })
    .then(function(quotes){
        console.log(quotes)
        var quoteIndex = Math.floor(Math.random()*1001)
        console.log(quoteIndex)
    })