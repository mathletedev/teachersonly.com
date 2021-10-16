import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { QUERY_ME_ID } from "../../lib/graphql";
import Loading from "../common/Loading";

const MUTATION_LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
		}
	}
`;

const Welcome: FC = () => {
	const { data } = useQuery(QUERY_ME_ID);
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login] = useMutation(MUTATION_LOGIN);
	console.log(data);

	if (data.me) {
		router.push("/dash");

		return <Loading />;
	}

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
			<button type="submit">login</button>
		</form>
	);
};

export default Welcome;
