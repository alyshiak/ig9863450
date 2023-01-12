
// mainText is the animated text on the main page
function mainText() {
    var text = document.getElementById('main-text').textContent;
    console.log(text)
    // var splitText = text.split(" ");
    console.log(text)

    // Using k to set the intial animation box empty
    k = document.getElementById('main-text');
    k.textContent = "";

    // Timer for how long to wait until the animation starts populating text and the speed at which it populates each character
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => { k.append(text[i]) }, 400 + i * 50)
    }

}

// Declaring global variables
var auth; // storing api key
var tweetResult;
/* Commenting out as needs to be removed at a later time
var images = document.getElementById('ai-generate-image1');
*/

// Fetching the key for the api and storing it in auth, needs to be stored outside of the javascript
fetch('https://1sdnljqy3c.execute-api.us-east-1.amazonaws.com/dev/resource1').then((response) => { return response.json() })
    .then((data) => {
        // Key comes with additional text which needs to be removed which is what split is doing
        auth = data.body.split('*')[1];
        // remove console.log to hide key later
        console.log(auth)
        // If API does not respond with 200 code then it will show error, can be removed later
    }).catch((error) => { console.log(error) })

document.getElementById('search-button').addEventListener("click", apiCall) //API call when Vincent search button is pressed
document.getElementById('tweet-search-button').addEventListener("click", checkTweet) //API call when TweetInspector search button is presses

// This function will fetch images and display them
function apiCall() {
    console.log('event called')
    var userTextInput = document.getElementById('search-text').value;

    const radioButtons = document.querySelectorAll('input[name="image"]');

    // Checking which radio button is selected for image size
    console.log(radioButtons);
    var selectedImageSize = "";

    // Checking which radio button is selected
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedImageSize = radioButtons[i].value;
        }
    }

    // If no button is selected then error message will display for 3 seconds
    if (selectedImageSize === "")
        {
            document.getElementById('error-message').textContent = "Please select an image size"
            setTimeout(()=>{document.getElementById('error-message').textContent = ""},3000)

            return
        }
    
    // If text field is empty then error will prompt to have text input, will display for 3 seconds
    if (userTextInput === "")
        {
            document.getElementById('error-message').textContent= "Please enter image description"
            setTimeout(()=>{document.getElementById('error-message').textContent = ""},3000)

            return
        }
    

        // 9 placeholder images will change when searching to show a loading animation while AI generated images are being fetched
        document.getElementById('ai-generate-image1').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image2').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image3').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image4').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image5').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image6').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image7').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image8').setAttribute('src', "./assets/loading.gif")
        document.getElementById('ai-generate-image9').setAttribute('src', "./assets/loading.gif")

    // // Search parameters provided by API
    fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: JSON.stringify({
            'prompt': userTextInput,
            'n': 1, // Currently set to 1 to save on API credit, to be changed for presentation
            'size': selectedImageSize
        })
        // changes the image source from placeholder to link provided by AI API
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
    // Search parameters provided by API
    if (userTextInput !== "") {
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({
                'model': 'text-davinci-003', // Model sets which engine you are using
                'prompt': 'Check the below tweet for racism , gender bias, discrimination and hate speech, Tweet: ' + userTextInput, // Request that is sent to engine along with the inputted user text
                'max_tokens': 100, // Maximum amount of letters the engine will reply with
                'temperature': 0
            })
        }).then((response) => { return response.json() }).then((data) => {
            document.getElementById('tweet-result').append(data.choices[0].text)
        });
    }
}

mainText();
