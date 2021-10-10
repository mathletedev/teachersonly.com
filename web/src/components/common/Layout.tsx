import {
	BellIcon,
	ChatIcon,
	CogIcon,
	LogoutIcon,
	SearchIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
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

	useEffect(() => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		)
			return document.documentElement.classList.add("dark");

		document.documentElement.classList.remove("dark");
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
						className="flex items-center gap-2 bg-indigo-200 h-12 px-4 dark:bg-gray-700"
						ref={navRef}
					>
						<div
							title="teachersonly.com"
							className="text-lg text-indigo-500 transition hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
						>
							<Link href="/">teachersonly.com</Link>
						</div>
						<button title="search">
							<SearchIcon className="icon-button" />
						</button>
						<div className="flex-grow"></div>
						<div title="messages" className="cursor-pointer">
							<Link href="/messages">
								<ChatIcon className="icon-button" />
							</Link>
						</div>
						<button title="notifications">
							<BellIcon className="icon-button" />
						</button>
						<div title="settings" className="cursor-pointer">
							<Link href="/settings">
								<CogIcon className="icon-button" />
							</Link>
						</div>
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
