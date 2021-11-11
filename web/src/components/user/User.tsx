import { gql, useMutation, useQuery } from "@apollo/client";
import { HeartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect, useState } from "react";
import { __flairs__ } from "../../lib/constants";
import Loading from "../common/Loading";

const MUTATION_TOGGLE_LIKE = gql`
	mutation ToggleLike($username: String!, $likes: Boolean!) {
		toggleLike(username: $username, likes: $likes)
	}
`;

const QUERY_USER = gql`
	query User($username: String!) {
		getUserByUsername(username: $username) {
			username
			image
			displayName
			status
			flair
		}

		likes(username: $username)

		me {
			username
		}
	}
`;

interface UserData {
	username?: string;
	image?: string;
	displayName?: string;
	status?: string;
	flair?: number;
}

interface MeData {
	username?: string;
}

const User: FC = () => {
	const [toggleLike] = useMutation(MUTATION_TOGGLE_LIKE);

	const { query, push } = useRouter();

	const { data, loading } = useQuery(QUERY_USER, {
		variables: { username: query.pid }
	});

	const [user, setUser] = useState<UserData>({});
	const [likes, setLikes] = useState(false);
	const [me, setMe] = useState<MeData>({});

	useEffect(() => {
		if (!data) return;
		if (!data.getUserByUsername) {
			push("/dash");
			return;
		}

		setUser(data.getUserByUsername);
		setLikes(data.likes);
		setMe(data.me);
	}, [data]);

	if (loading) return <Loading />;

	return (
		<Fragment>
			<div className="flex justify-center pt-16">
				<img src={user.image} className="flex-item h-48 w-48 profile-image" />
				<div className="flex-item w-1/3 pl-16 text-default">
					<div className="text-5xl">{user.displayName || user.username}</div>
					<div className="pt-4 pb-8 text-xl">
						{user.flair === undefined ? "" : `${__flairs__[user.flair]} `}
						{user.status}
					</div>
					{user.username !== me.username && (
						<button
							onClick={async () => {
								await toggleLike({
									variables: { username: user.username, likes: !likes }
								});

								setLikes(!likes);
							}}
						>
							{likes ? (
								<HeartIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
							) : (
								<HeartIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
							)}
						</button>
					)}
				</div>
			</div>
			<div className="h-0.5 w-64 mt-8 mx-auto bg-gray-500 dark:bg-gray-400"></div>
		</Fragment>
	);
};

export default User;
