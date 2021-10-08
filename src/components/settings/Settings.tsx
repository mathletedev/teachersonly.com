import { SunIcon, UserIcon } from "@heroicons/react/outline";
import { FC, Fragment, useState } from "react";
import Sidebar from "../navigation/Sidebar";
import SidebarItem from "../navigation/SidebarItem";
import Profile from "./Profile";

const Settings: FC = () => {
	const [tab, setTab] = useState("profile");

	return (
		<Fragment>
			<Sidebar>
				<button onClick={() => setTab("profile")}>
					<SidebarItem title="profile" Icon={UserIcon} />
				</button>
				<button>
					<SidebarItem title="toggle theme" Icon={SunIcon} />
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
