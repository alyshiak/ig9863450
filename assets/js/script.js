// Declaring global variables

var auth; // Stores API key
var tweetResult; //Store tweet analysis results
var obj = { arrayOfPreviousSearches: [] }; //Stores data in browser LocalStorage

//This fetch() function gets API key from Lambda function

fetch('https://1sdnljqy3c.execute-api.us-east-1.amazonaws.com/dev/resource1').then((response) => { return response.json() })
    .then((data) => {
        // Key comes with additional text which needs to be removed which is what split is doing
        auth = data.body.split('*')[1];
        
    }).catch((error) => { console.log("Something went wrong, key not received") }) // If API does not respond with 200 code then it will show error

//Add event listner to Vincent section's 'Try now' button
document.getElementById('vincent-trynow-button').addEventListener("click", displayVincentSearch)
//Add event listner to TweetInspector's section's 'Try now' button
document.getElementById('twitter-trynow-button').addEventListener("click", displayTwitterSearch)
//Add event listner to Vincent section's 'hide' button
document.getElementById('vincent-hide-button').addEventListener("click", hideVincentSearch)
//Add event listner to TweetInspector's section's 'hide' button
document.getElementById('twitter-inspector-hide-button').addEventListener("click", hideTwitterSearch)
//This event listener check'for 'Enter' button press on Vincent search bar
document.getElementById('search-text').addEventListener("keypress", (event) => { if (event.key === "Enter") { apiCall() } }) 
//This event listener check'for 'Enter' button on TweetInspector search bar
document.getElementById('tweet-text').addEventListener("keypress", (event) => {  if (event.key === "Enter") { checkTweet() } }) 
//API call when Vincent search button is pressed
document.getElementById('vincent-search-button').addEventListener("click", apiCall) 
//API call when TweetInspector search button is presses
document.getElementById('tweet-search-button').addEventListener("click", checkTweet) 
//Display or hide the user search history
document.getElementById('checkbox').addEventListener("click", ()=>{
    if (document.getElementById('checkbox').checked)
    {document.getElementById('previous-searches').classList.add('block')
    document.getElementById('previous-searches').classList.remove('hidden')
    } 
    else{document.getElementById('previous-searches').classList.add('hidden')
    document.getElementById('previous-searches').classList.remove('block')

    }
    }) 


//

//fetchUserSearchHistory function fetches the data from local storage on page load and display on Vincent search section. 

function fetchUserSearchHistory(){
    if (localStorage.getItem('previous-searches')!=null)
    {
    obj = JSON.parse(localStorage.getItem('previous-searches'))

    for(var i=0; i<obj.arrayOfPreviousSearches.length; i++)
        {

        var previousSearchesItem = document.createElement('button');
        previousSearchesItem.textContent = obj.arrayOfPreviousSearches[i];

        document.getElementById('previous-searches').appendChild(previousSearchesItem);
        document.getElementById('previous-searches').lastElementChild.setAttribute('class', 'bg-gray-500 p-2 m-1 text-white rounded-[10px]')

        document.getElementById('previous-searches').lastElementChild.addEventListener("click", (event) => {
            document.getElementById('search-text').value = event.target.textContent;
            apiCall();
        });
        }
    }
}

//displayVincentSearch() function displays the Vincent search section
function displayVincentSearch() {
    document.getElementById("vincient-search-section").classList.add('block')
    document.getElementById("vincient-search-section").classList.remove('hidden')
    document.getElementById("vincent-hide-button").classList.add('block')
    document.getElementById("vincent-hide-button").classList.remove('hidden')
    document.getElementById("vincent-trynow-button").classList.add('hidden')
    document.getElementById("vincent-trynow-button").classList.remove('block')
}

//hideVincentSearch() function hides the Vincent search section

function hideVincentSearch() {
    document.getElementById("vincient-search-section").classList.add('hidden')
    document.getElementById("vincient-search-section").classList.remove('block')
    document.getElementById("vincent-hide-button").classList.add('hidden')
    document.getElementById("vincent-hide-button").classList.remove('block')
    document.getElementById("vincent-trynow-button").classList.add('block')
    document.getElementById("vincent-trynow-button").classList.remove('hidden')
}

//hideTwitterSearch() function hides the TwitterInspector search section

function hideTwitterSearch() {
    document.getElementById("twitter-inspector-search-section").classList.add('hidden')
    document.getElementById("twitter-inspector-search-section").classList.remove('block')
    document.getElementById("twitter-inspector-hide-button").classList.add('hidden')
    document.getElementById("twitter-inspector-hide-button").classList.remove('block')
    document.getElementById("twitter-trynow-button").classList.add('block')
    document.getElementById("twitter-trynow-button").classList.remove('hidden')
}

//displayTwitterSearch() function displays the TwitterInspector search section

function displayTwitterSearch() {
    document.getElementById("twitter-inspector-search-section").classList.add('block')
    document.getElementById("twitter-inspector-search-section").classList.remove('hidden')
    document.getElementById("twitter-inspector-hide-button").classList.add('block')
    document.getElementById("twitter-inspector-hide-button").classList.remove('hidden')
    document.getElementById("twitter-trynow-button").classList.add('hidden')
    document.getElementById("twitter-trynow-button").classList.remove('block')

}


// mainText animates the text on the main page
function mainText() {
    var text = document.getElementById('main-text').textContent;

    // Using k to set the intial animation box empty
    var k = document.getElementById('main-text');
    k.textContent = "";

    // Timer for how long to wait until the animation starts populating text and the speed at which it populates each character
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => { k.append(text[i]) }, 400 + i * 50) //i*50 sets the speed of text display
    }

}



// This function will fetch images and display them
function apiCall(event) {

    console.log('Vincent event. apiCall function called')

    var userTextInput = document.getElementById('search-text').value;


    const radioButtons = document.querySelectorAll('input[name="image"]');

    // Checking which radio button is selected for image size
    var selectedImageSize = "";

    // Checking which radio button is selected
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedImageSize = radioButtons[i].value;
        }
    }


    if (selectedImageSize === "" || userTextInput === "") {
        // If no button is selected then error message will display for 3 seconds
        if (userTextInput === "") {
            document.getElementById('error-message').textContent = "Please enter image description"
            setTimeout(() => { document.getElementById('error-message').textContent = "" }, 3000)
            return
        }
        // If text field is empty then error will prompt to have text input, will display for 3 seconds

        if (selectedImageSize === "") {
            document.getElementById('error-message').textContent = "Please select an image size"
            setTimeout(() => { document.getElementById('error-message').textContent = "" }, 3000)
            return
        }
    }


    else {

        //Check whether obj.arrayOfPreviousSearches already contains the search input or not 
        //and push the input to array if it doesnt

        if (!obj.arrayOfPreviousSearches.includes(userTextInput)) {
            obj.arrayOfPreviousSearches.push(userTextInput)
            localStorage.setItem('previous-searches', JSON.stringify(obj))
            var previousSearchesItem = document.createElement('button');
            previousSearchesItem.textContent = userTextInput;
            document.getElementById('previous-searches').appendChild(previousSearchesItem);
        }

        document.getElementById('previous-searches').lastElementChild.addEventListener("click", (event) => {
            document.getElementById('search-text').value = event.target.textContent;
            apiCall();
        });
        document.getElementById('previous-searches').lastElementChild.setAttribute('class', 'bg-gray-500 p-2 m-1 text-white rounded-[10px]')

        // 9 placeholder images will change when searching to show a loading animation while AI generated images are being fetched
        document.getElementById('ai-generate-image1').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image2').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image3').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image4').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image5').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image6').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image7').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image8').setAttribute('src', "assets/images/loading.gif")
        document.getElementById('ai-generate-image9').setAttribute('src', "assets/images/loading.gif")

        // Search parameters provided by API
        fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                'prompt': userTextInput,
                'n': 1, // Currently set to 1 to save on API credit, to be changed for presentation
                'size': selectedImageSize
            })
            // changes the image source from placeholder to link provided by AI API
        }).then((response) => { 
            if(response.status!= 200){ return } else
            return response.json() }).then((data) => {

            //Display images fetched from the API
            document.getElementById('ai-generate-image1').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image2').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image3').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image4').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image5').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image6').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image7').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image8').setAttribute('src', data.data[0].url)
            document.getElementById('ai-generate-image9').setAttribute('src', data.data[0].url)

            //Set URL to images fetched from the API
            document.getElementById('ai-generate-image-atag1').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag2').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag3').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag4').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag5').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag6').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag7').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag8').setAttribute('href', data.data[0].url)
            document.getElementById('ai-generate-image-atag9').setAttribute('href', data.data[0].url)

        }).catch((error) => {
            
            //Display error image if API fetch request is not sucessfull for some reason
            document.getElementById('ai-generate-image1').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image2').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image3').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image4').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image5').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image6').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image7').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image8').setAttribute('src', "assets/images/error.png")
            document.getElementById('ai-generate-image9').setAttribute('src', "assets/images/error.png")
        })

    }



}

// checkTweet() makes the API call to analyse the tweet

function checkTweet() {

    var userTextInput = document.getElementById('tweet-text').value;
    // Search parameters provided by API
    if (userTextInput !== "") {
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                'model': 'text-davinci-003', // Model sets which engine you are using
                'prompt': 'Check the below tweet for racism , gender bias, discrimination and hate speech, Tweet: ' + userTextInput, // Request that is sent to engine along with the inputted user text
                'max_tokens': 100, // Maximum amount of letters the engine will reply with
                'temperature': 0
            })
        }).then((response) => { return response.json() }).then((data) => {
            document.getElementById('tweet-result').textContent = "";
            document.getElementById('tweet-result').append(data.choices[0].text)
        }).catch((error) => {
            //Display error message to the user if fetch() API call fails
            document.getElementById('tweet-result').textContent = "Something went wrong..";
        });
    }
}
//Animate the heading in main section
mainText();
fetchUserSearchHistory();
