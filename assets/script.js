

document.getElementById('search-button').addEventListener("click", apiCall)

function apiCall()
{

var userTextInput = document.getElementById('search-text').value; 

fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
        'prompt': userTextInput,
        'n': 1,
        'size': '256x256'
    })
}).then((response)=>{ return response.json()}).then((data)=>{ 
    console.log(data.data[0].url)
    document.getElementById('ai-generate-image1').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image2').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image3').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image4').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image5').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image6').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image1').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image8').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image9').setAttribute('src', data.data[0].url)

}).catch((error)=>{console.log(error)})
}




// fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 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'
//     },
//     body: JSON.stringify({
//         'model': 'ada',
//         'prompt': 'An elephant in the room is always bigger than a cat',
//         'max_tokens': 7,
//         'temperature': 0
//     })
// }).then((response)=>{return response.json()}).then((data)=>{console.log(data)});