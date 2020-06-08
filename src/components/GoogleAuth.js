import React, { useEffect, useState } from "react";

const GoogleAuth = () => {
	const [ isSignedIn, setIsSignedIn ] = useState(null);

	const API_KEY = process.env.REACT_APP_API_KEY;

	const onAuthChange = () => {
		setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
	};

	const onSignInOnClick = () => {
		window.gapi.auth2.getAuthInstance().signIn();
	};

	const onSignOutOnClick = () => {
		window.gapi.auth2.getAuthInstance().signOut();
	};

	useEffect(
		() => {
			window.gapi.load("client:auth2", () => {
				window.gapi.client
					.init({
						clientId: API_KEY,
						scope: "email"
					})
					.then(() => {
						// const authInstance = window.gapi.auth2.getAuthInstance();
						onAuthChange(); //refactored, but could be this in here: setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
						window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
					});
			});
		},
		[ API_KEY ]
	);

	const renderAuthButton = () => {
		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<button onClick={onSignOutOnClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={onSignInOnClick} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	};

	return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
