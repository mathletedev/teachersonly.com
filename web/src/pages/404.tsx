import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Loading from "../components/common/Loading";

const _404: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/");
	});

	return <Loading />;
};

export default _404;
