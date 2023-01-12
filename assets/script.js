function mainText() {
    var text = document.getElementById('main-text').textContent;
    console.log(text)
    // var splitText = text.split(" ");
    console.log(text)

    k = document.getElementById('main-text');
    k.textContent = "";


    for (let i = 0; i < text.length; i++) {
        setTimeout(() => { k.append(text[i]) }, 400 + i * 50)
    }

}

var auth;
var tweetResult;
var images = document.getElementById('ai-generate-image1');

fetch('https://1sdnljqy3c.execute-api.us-east-1.amazonaws.com/dev/resource1').then((response) => { return response.json() })
    .then((data) => {
        auth = data.body.split('*')[1];
        console.log(auth)
    }).catch((error) => { console.log(error) })

document.getElementById('search-button').addEventListener("click", apiCall) //API call when Vincent search button is pressed
document.getElementById('tweet-search-button').addEventListener("click", checkTweet) //API call when TweetInspector search button is presses

function apiCall() {
    console.log('event called')
    var userTextInput = document.getElementById('search-text').value;

    const radioButtons = document.querySelectorAll('input[name="image"]');

    console.log(radioButtons);
    var selectedImageSize = "";

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedImageSize = radioButtons[i].value;
        }
    }

    if (selectedImageSize === "")
        {
            document.getElementById('error-message').textContent = "Please select an image size"
            setTimeout(()=>{document.getElementById('error-message').textContent = ""},3000)

            return
        }
    
    if (userTextInput === "")
        {
            document.getElementById('error-message').textContent= "Please enter image description"
            setTimeout(()=>{document.getElementById('error-message').textContent = ""},3000)

            return
        }
    


        document.getElementById('ai-generate-image1').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image2').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image3').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image4').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image5').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image6').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image7').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image8').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image9').setAttribute('src', "./assets/loading.gif")

    fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: JSON.stringify({
            'prompt': userTextInput,
            'n': 1,
            'size': selectedImageSize
        })
    }).then((response) => { return response.json() }).then((data) => {

        document.getElementById('ai-generate-image1').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image2').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image3').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image4').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image5').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image6').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image7').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image8').setAttribute('src', data.data[0].url)
        document.getElementById('ai-generate-image9').setAttribute('src', data.data[0].url)

    }).catch((error) => { console.log(error) })
}



function checkTweet() {

    var userTextInput = document.getElementById('tweet-text').value;

    if (userTextInput !== "") {
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({
                'model': 'text-davinci-003',
                'prompt': 'Check the below tweet for racism , gender bias, discrimination and hate speech, Tweet: ' + userTextInput,
                'max_tokens': 100,
                'temperature': 0
            })
        }).then((response) => { return response.json() }).then((data) => {
            document.getElementById('tweet-result').append(data.choices[0].text)
        });
    }
}

mainText();
