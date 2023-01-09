var auth;

fetch('https://1sdnljqy3c.execute-api.us-east-1.amazonaws.com/dev/resource1').then((response)=>{return response.json()})
.then((data)=>{
    auth = data.body.split('*')[1];
    console.log(auth)
    }).catch((error)=>{console.log(error)})

document.getElementById('search-button').addEventListener("click", apiCall)

function apiCall()
{
console.log('event called')
var userTextInput = document.getElementById('search-text').value; 

fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
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
    document.getElementById('ai-generate-image7').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image8').setAttribute('src', data.data[0].url)
    document.getElementById('ai-generate-image9').setAttribute('src', data.data[0].url)

}).catch((error)=>{console.log(error)})
}


var tweet = "People of perticular ethinicity will not be allowed in this party";

setTimeout(()=>{fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
    },
    body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': 'Check the below tweet for racism , gender bias, discrimination and hate speech, Tweet: '+tweet,
        'max_tokens': 100,
        'temperature': 0
    })
}).then((response)=>{return response.json()}).then((data)=>{console.log(data)})}, 5000);