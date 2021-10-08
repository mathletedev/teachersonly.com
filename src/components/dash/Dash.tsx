import { useSession } from "next-auth/client";
import { FC } from "react";

const Dash: FC = () => {
	const [session] = useSession();

	return (
		<div className="text-lg text-default">
			hello, {session!.user?.name?.toLowerCase()}!
		</div>
	);
};

export default Dash;
