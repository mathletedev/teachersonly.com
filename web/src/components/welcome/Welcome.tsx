import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, Fragment, useEffect, useState } from "react";
import { QUERY_ME_ID } from "../../lib/graphql/queries";
import Loading from "../common/Loading";

const MUTATION_LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password)
	}
`;

const MUTATION_REGISTER = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password)
	}
`;

const Welcome: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_ID);
	const [login, loginRes] = useMutation(MUTATION_LOGIN);
	const [register, registerRes] = useMutation(MUTATION_REGISTER);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [showEmail, setShowEmail] = useState(false);

	useEffect(() => {
		if (
			data?.me ||
			loginRes.data?.login ||
			registerRes.data?.register === "success"
		)
			window.location.replace("/dash");
	}, [data, loginRes, registerRes]);

	if (loading) return <Loading />;

	return (
		<div className="flex flex-col pb-4 bg-indigo-100 rounded-3xl m-auto w-96">
			<div className="text-center text-4xl text-indigo-500 pt-8 pb-10 unselectable">
				teachersonly.com
			</div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					if (showEmail) {
						const { data } = await register({
							variables: { username, email, password }
						});

						switch (data.register) {
							case "account":
								return alert("account already exists");
							case "username":
								return alert("username already exists");
							case "email":
								return alert("invalid email address");
							case "password":
								return alert(
									"password must be at least 8 characters long and include:\n• a lowercase character\n• an uppercase character\n• a number\n• a special character"
								);
						}
					}

					if (!(await login({ variables: { username, password } })).data)
						alert("invalid username or password");
				}}
				className="px-8"
			>
				<div>
					<label className="text-default">
						username{!showEmail && " or email"}
					</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full text-input"
					/>
				</div>
				<div className="h-4"></div>
				{showEmail && (
					<Fragment>
						<div>
							<label className="text-default">email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full text-input"
							/>
						</div>
						<div className="h-4"></div>
					</Fragment>
				)}
				<div>
					<label className="text-default">password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full text-input"
					/>
				</div>
				<div className="h-4"></div>
				<button type="submit" className="w-full text-button">
					{showEmail ? "register" : "log in"}
				</button>
			</form>
			<div className="h-8"></div>
			<button
				onClick={() => setShowEmail(!showEmail)}
				className="inline-block m-auto cursor-pointer text-default"
			>
				{showEmail ? "log in" : "register"}
			</button>
		</div>
	);
};

export default Welcome;
