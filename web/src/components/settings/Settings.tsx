import { MoonIcon, SunIcon, UserIcon } from "@heroicons/react/outline";
import { FC, Fragment, useEffect, useState } from "react";
import Sidebar from "../navigation/Sidebar";
import SidebarItem from "../navigation/SidebarItem";
import Profile from "./Profile";

const Settings: FC = () => {
	const [tab, setTab] = useState("profile");
	const [theme, setTheme] = useState(
		typeof window !== "undefined" ? localStorage.theme : "dark"
	);

	const invert = theme === "dark" ? "light" : "dark";

	useEffect(() => {
		window.document.documentElement.classList.remove(invert);
		window.document.documentElement.classList.add(theme);

		if (typeof window !== "undefined") localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<Fragment>
			<Sidebar>
				<button onClick={() => setTab("profile")}>
					<SidebarItem title="profile" Icon={UserIcon} />
				</button>
				<button
					onClick={() =>
						theme === "light" ? setTheme("dark") : setTheme("light")
					}
				>
					<SidebarItem
						title="toggle theme"
						Icon={theme === "light" ? SunIcon : MoonIcon}
					/>
				</button>
			</Sidebar>
			{
				{
					profile: <Profile />
				}[tab]
			}
		</Fragment>
	);
};

export default Settings;
