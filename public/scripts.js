// Configure Amplify
import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_MoG82iOBt', // Cognito User Pool ID
        userPoolWebClientId: '4uksfhbdb0qsqba4834catu916', // App Client ID
        mandatorySignIn: true,
    }
});

// Redirect to the Cognito Hosted UI
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        console.log('User is signed in:', user);
    } catch {
        console.log('User is not signed in, redirecting to sign in...');
        Auth.federatedSignIn(); // This triggers the Cognito Hosted UI
    }
});

document.getElementById('submitBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;

    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    try {
        // Get the current session to include the ID token in the headers
        const session = await Auth.currentSession();
        const idToken = session.getIdToken().getJwtToken();

        // Make the API request with authentication
        const response = await fetch('https://obxy6jphzf.execute-api.eu-west-1.amazonaws.com/dev/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken // Include the ID token
            },
            body: JSON.stringify({
                body: {
                    request: prompt
                }
            })
        });

        // Parse the response JSON
        const responseData = await response.json();
        const parsedBody = JSON.parse(responseData.body);
        
        console.log('Parsed Raw Response:', parsedBody);
        
        // Display the model_response in the frontend
        document.getElementById('responseContainer').textContent = parsedBody.model_response || 'No response';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseContainer').textContent = 'Error retrieving response from API';
    }
});