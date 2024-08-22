const awsConfig = {
    Auth: {
        identityPoolId: 'eu-west-1:b69369d8-dcd3-4157-8f77-b96ea60db63d', // example: 'us-east-2:c85f3c18-05fd-4bb5-8fd1-e77e7627a99e'
        region: 'us-west-1', // example: 'us-east-2'
        userPoolId: 'eu-west-1_MoG82iOBt', // example: 'us-east-2_teEUQbkUh'
        userPoolWebClientId: '4uksfhbdb0qsqba4834catu916' // example: '3k09ptd8kn8qk2hpk07qopr86'
    },
    // API: {
    //     endpoints: [
    //         {
    //             name: 'DemonstrationBedrockAPI',
    //             endpoint: 'https://obxy6jphzf.execute-api.eu-west-1.amazonaws.com/dev', // example: 'https://u8swuvl00f.execute-api.us-east-2.amazonaws.com/prod'
    //             region: 'eu-west-1' // example: 'us-east-2'
    //         }
    //     ]
    // }
}

export default awsConfig;