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

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, res] = useMutation(MUTATION_LOGIN);

	useEffect(() => {
		if (data?.me || res.data?.login) window.location.replace("/dash");
	}, [data, res]);

	if (loading) return <Loading />;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				login({ variables: { username, password } });
			}}
			className="m-auto"
		>
			<input
				value={username}
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<div></div>
			<input
				value={password}
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="invisible">
				login
			</button>
		</form>
	);
};

export default Welcome;
