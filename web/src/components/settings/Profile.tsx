import { useQuery } from "@apollo/client";
import { FC } from "react";
import { QUERY_ME_USERNAME } from "../../lib/graphql";

const Profile: FC = () => {
	const { data } = useQuery(QUERY_ME_USERNAME);

	return (
		<div className="text-xl text-default">
			hello, {data.me.username.toLowerCase()}!
		</div>
	);
};

export default Profile;
