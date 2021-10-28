import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { QUERY_ME_ID } from "../../lib/graphql/queries";
import Loading from "../common/Loading";

const MUTATION_LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password)
	}
`;

const Welcome: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_ID);
	const [login, res] = useMutation(MUTATION_LOGIN);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (data?.me || res.data?.login) window.location.replace("/dash");
	}, [data, res]);

	if (loading) return <Loading />;

	return (
		<div className="flex flex-col pb-4 bg-indigo-100 rounded-3xl m-auto h-96 w-96">
			<div className="text-center text-4xl text-indigo-500 pt-8 pb-10 unselectable">
				teachersonly.com
			</div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					const { data } = await login({ variables: { username, password } });
					if (!data.login) alert("invalid username or password");
				}}
				className="px-8"
			>
				<div>
					<label className="text-default">username or email</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full text-input"
					/>
				</div>
				<div className="h-4"></div>
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
					log in
				</button>
			</form>
			<div className="flex-grow"></div>
			<div className="inline-block m-auto cursor-pointer text-default">
				register
			</div>
		</div>
	);
};

export default Welcome;
