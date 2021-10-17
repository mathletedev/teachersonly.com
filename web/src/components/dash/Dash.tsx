import { useQuery } from "@apollo/client";
import { FC } from "react";
import { QUERY_ME_USERNAME } from "../../lib/graphql/queries";

const Dash: FC = () => {
	const { data } = useQuery(QUERY_ME_USERNAME);

	return (
		<div className="text-lg text-default">
			hello, {data?.me?.username.toLowerCase()}!
		</div>
	);
};

export default Dash;
