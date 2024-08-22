// Configure Amplify
// import {Amplify} from 'aws-amplify';
// Amplify.configure({
//     Auth: {
//         region: 'eu-west-1',
//         userPoolId: 'eu-west-1_MoG82iOBt', // Cognito User Pool ID
//         userPoolWebClientId: '4uksfhbdb0qsqba4834catu916', // App Client ID
//         mandatorySignIn: true,
//     }
// });

document.getElementById('submitBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;

    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    try {
        // Make the API request
        const response = await fetch('https://obxy6jphzf.execute-api.eu-west-1.amazonaws.com/dev/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': idToken  // Uncomment if using Amplify for authentication
            },
            body: JSON.stringify({
                body: {
                    request: prompt
                }
            })
        });

        // Parse the response JSON
        const responseData = await response.json();

        // The body contains another JSON string, so we need to parse it
        const parsedBody = JSON.parse(responseData.body);
        
        console.log('Parsed Raw Response:', parsedBody);
        
        // Display the model_response in the frontend
        document.getElementById('responseContainer').textContent = parsedBody.model_response || 'No response';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseContainer').textContent = 'Error retrieving response from API';
    }
});
