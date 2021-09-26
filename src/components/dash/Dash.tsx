import { useSession } from "next-auth/client";
import { FC } from "react";

const Dash: FC = () => {
	const [session] = useSession();

	return (
		<div className="m-auto text-default text-lg">
			hello, {session!.user?.name?.toLowerCase()}!
		</div>
	);
};

export default Dash;
