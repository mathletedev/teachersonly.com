import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { FC } from "react";
import { __callbackUrl__ } from "../../lib/constants";
import Loading from "../common/Loading";

const Welcome: FC = () => {
	const [session] = useSession();
	const router = useRouter();

	if (session) {
		router.push("/dash");

		return <Loading />;
	}

	return (
		<button
			onClick={() => signIn("google", { callbackUrl: __callbackUrl__ })}
			className="m-auto text-button"
		>
			sign in with google
		</button>
	);
};

export default Welcome;
