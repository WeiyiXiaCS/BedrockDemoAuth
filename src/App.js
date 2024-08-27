import React, { useState } from 'react';
import './App.css';
import { post } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function callApi() {
    if (!inputValue.trim()) {
      setApiResponse("No prompt detected");
      return;
    }
    try {
      const session = await fetchAuthSession();
      console.log("id token", session.tokens.idToken)
      console.log("access token", session.tokens.accessToken)
      const token = session.tokens.idToken
      const payload = {
        "body": {
          "request": inputValue
        }
      };
  
      // Create the request info with headers and the paylosad
      const requestInfo = {
        headers: { Authorization: token },
        body: payload  // Stringify the payload before sending
      }; 
      // Perform the POST request using the new post function from aws-amplify/api
      const restOperation = post({
        apiName: 'api8e21c08c',  // The name of your API in Amplify
        path: '/question',  // The path in your API
        options: requestInfo  // The options include headers and body
      });
  
      // Handle the response
      const { body } = await restOperation.response;
      const response = await body.json();
      const response_text = JSON.parse(response.body).model_response

      console.log(response_text)
      // Update the API response state
      setApiResponse(response_text);  // Assuming the response has this structure

    } catch (error) {
      console.error('Error calling API:', error);
      setApiResponse('An error occurred while fetching the response.');
    }
  }

  return (
    <div className="container">
      <h1>Ask a Question</h1>
      <input 
        type="text" 
        id="promptInput" 
        placeholder="Enter your prompt" 
        value={inputValue}  // Bind input value to state
        onChange={handleInputChange}  // Handle input change
      />
      <button id="submitBtn" onClick={callApi}>Submit</button> 
      <h2>Response:</h2>
      <div id="responseContainer">
        {apiResponse}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
