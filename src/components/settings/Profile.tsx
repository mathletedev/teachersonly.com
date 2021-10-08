import { FC } from "react";
import { useSession } from "../../../node_modules/next-auth/client";

const Profile: FC = () => {
	const [session] = useSession();

	return (
		<div className="text-xl text-default">
			hello, {session?.user?.name?.toLowerCase()}!
		</div>
	);
};

export default Profile;
