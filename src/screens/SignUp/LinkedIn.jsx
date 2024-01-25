// // LinkedIn.jsx
// import React from 'react';
// import {useLinkedIn} from 'react-linkedin-login-oauth2';

// const LinkedInButton = ({ onSuccess, onFailure }) => {
//   const handleSuccess = (data) => {
//     console.log('LinkedIn Login Success:', data);
//     // Handle success, e.g., send data to your server
//     onSuccess(data);
//   };

//   const handleFailure = (error) => {
//     console.error('LinkedIn Login Failure:', error);
//     // Handle failure, e.g., show an error message
//     onFailure(error);
//   };

//   return (
//     <useLinkedIn
//       clientId="bTWiv2SvFkUifS3y"
//       // redirectUri="YOUR_REDIRECT_URI"
//       onSuccess={handleSuccess}
//       onFailure={handleFailure}
//     >
//       Log in with LinkedIn
//     </useLinkedIn>
//   );
// };

// export default LinkedInButton;

// import React, { useState } from 'react';

// import { LinkedIn } from 'react-linkedin-login-oauth2';
// // You can use provided image shipped by this package or using your own
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

// function LinkedInPage() {
//   return (
//     <LinkedIn
//       clientId="77jdxl9y1amai1"
//       scope="email openid profile"
//       redirectUri={`${window.location.origin}/linkedin`}
//       onSuccess={(code) => {
//         console.log(code,"HGFHGFHJGJ");
//       }}
//       onError={(error) => {
//         console.error(error,"ERROR ON LIKREGFG");
//       }}
//     >
//       {({ linkedInLogin }) => (
//         <img
//           onClick={linkedInLogin}
//           src={linkedin}
//           alt="Sign in with Linked In"
//           style={{ maxWidth: '180px', cursor: 'pointer' }}
//         />
//       )}
//     </LinkedIn>
//   );
// }


// import React, { useState } from 'react';
// import { LinkedIn } from 'react-linkedin-login-oauth2';
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

// function LinkedInPage() {
//   // State to store the LinkedIn authorization code
//   const [linkedInCode, setLinkedInCode] = useState(null);

//   return (
//     <LinkedIn
//       clientId="77jdxl9y1amai1"
//       scope="email openid profile"
//       redirectUri={`${window.location.origin}/linkedin`}
//       onSuccess={(data) => {
//         // Store the LinkedIn authorization code
//         setLinkedInCode(data.code);
//         console.log(data, "LinkedIn Data");
//       }}
//       onError={(error) => {
//         console.error(error, "ERROR ON LINKEDIN");
//       }}
//     >
//       {({ linkedInLogin }) => (
//         <div>
//           <img
//             onClick={linkedInLogin}
//             src={linkedin}
//             alt="Sign in with LinkedIn"
//             style={{ maxWidth: '180px', cursor: 'pointer' }}
//           />
//         </div>
//       )}
//     </LinkedIn>
//   );
// }

// export default LinkedInPage;


// import { useLinkedIn } from 'react-linkedin-login-oauth2';
// // You can still use default image provided by the package
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

// function LinkedInPage() {
//   const { linkedInLogin } = useLinkedIn({
//     clientId: '77jdxl9y1amai1',
//     scope:"email openid profile",
//     redirectUri: 'http://localhost:3000/linkedin',
//     onSuccess: (code) => {
//       // Change from `data.code` to `code`
//       console.log(code,"CODEEEE");
//     },
//     // Change from `onFailure` to `onError`
//     onError: (error) => {
//       console.log(error,"ERRORR LIKY");
//     },
//   });

//   return (
//     <img
//       src={linkedin}
//       alt="Log in with Linked In"
//       style={{ maxWidth: '180px' }}
//       // Pass `linkedInLogin` to `onClick` handler
//       onClick={linkedInLogin}
//     />
//   );
// }

// export default LinkedInPage

import React from 'react';

const LINKEDIN_CLIENT_SECRET = 'xhTriIHQW3IGohql';
const LINKEDIN_CLIENT_ID = '77jdxl9y1amai1';
const LINKEDIN_CALLBACK_URL = 'http://localhost:3000/signUp/linkedin';
const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  LINKEDIN_CALLBACK_URL
)}&scope=email openid profile`;

const LinkedInOAuth = () => {
  const handleLogin = async (code) => {
    // Exchange the code for an access token
    const data = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: LINKEDIN_CALLBACK_URL,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    }).then((response) => response.json());
    console.log('Access token:',accessToken)

    const accessToken = data.access_token;
console.log('data:',data)
    // Fetch the user's LinkedIn profile
    const userProfile = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    // Handle the user profile data (e.g., store it in your database and log the user in)
    console.log(
      `Welcome, ${userProfile.data.firstName.localized.en_US} ${userProfile.data.lastName.localized.en_US}!`
    );
  };

  const handleLinkedInCallback = () => {
    console.log("Enter Function")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const authorization_endpoint = urlParams.get('authorization_endpoint');
    const token_endpoint = urlParams.get('token_endpoint');
    const userinfo_endpoint = urlParams.get('userinfo_endpoint');
    console.log(code,"code","authorization_endpoint",authorization_endpoint,"token_endpoint",token_endpoint,"userinfo_endpoint",userinfo_endpoint);
    if (code) handleLogin(code);
  };

  React.useEffect(() => {
    handleLinkedInCallback();
  }, []);

  return (
    <div>
      <a href={linkedinOAuthURL}>Sign in with LinkedIn</a>
    </div>
  );
};

export default LinkedInOAuth;