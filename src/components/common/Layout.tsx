import {
	BellIcon,
	ChatIcon,
	CogIcon,
	LogoutIcon,
	SearchIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import Loading from "./Loading";

const Layout: FC = ({ children }) => {
	const [session, loading] = useSession();
	const router = useRouter();

	const navRef = useRef<HTMLElement>(null);
	const [navHeight, setNavHeight] = useState(0);

	useEffect(() => {
		setNavHeight(navRef.current?.clientHeight || 0);
	});

	if (loading) return <Loading />;

	if (!session && router.pathname !== "/") {
		router.push("/");

		return <Loading />;
	}

	return (
		<Fragment>
			<Head>
				<title>teachersonly.com</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
					rel="stylesheet"
				/>
			</Head>
			{session ? (
				<Fragment>
					<nav
						className="flex items-center gap-2 bg-indigo-200 h-12 px-4"
						ref={navRef}
					>
						<a
							href="/"
							title="teachersonly.com"
							className="text-lg text-indigo-500"
						>
							teachersonly.com
						</a>
						<button title="search">
							<SearchIcon className="icon-button" />
						</button>
						<div className="flex-grow"></div>
						<a href="/messages" title="messages">
							<ChatIcon className="icon-button" />
						</a>
						<button title="notifications">
							<BellIcon className="icon-button" />
						</button>
						<a href="/settings" title="settings">
							<CogIcon className="icon-button" />
						</a>
						<button onClick={() => signOut()} title="sign out">
							<LogoutIcon className="icon-button" />
						</button>
					</nav>
					<div style={{ height: `calc(100vh - ${navHeight}px)` }}>
						{children}
					</div>
				</Fragment>
			) : (
				<div className="flex h-screen w-screen">{children}</div>
			)}
		</Fragment>
	);
};

export default Layout;
