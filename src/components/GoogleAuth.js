import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions";

const API_KEY = process.env.REACT_APP_API_KEY;

const GoogleAuth = () => {
	const isSignedIn = useSelector((state) => state.isSignedIn);
	const dispatch = useDispatch();

	const onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			signIn();
		} else {
			signOut();
		}
	};

	const onSignInOnClick = () => {
		dispatch(window.gapi.auth2.getAuthInstance().signIn());
	};

	const onSignOutOnClick = () => {
		dispatch(window.gapi.auth2.getAuthInstance().signOut());
	};

	useEffect(() => {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId: API_KEY,
					scope: "email"
				})
				.then(() => {
					onAuthChange();
					window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
				});
		});
	}, []);

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
