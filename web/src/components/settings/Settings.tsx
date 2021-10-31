import { useMutation, useQuery } from "@apollo/client";
import {
	MoonIcon,
	ShieldCheckIcon,
	SunIcon,
	UserIcon
} from "@heroicons/react/outline";
import { FC, Fragment, useState } from "react";
import { MUTATION_EDIT_PROFILE } from "../../lib/graphql/mutations";
import { QUERY_ME_DARK_MODE } from "../../lib/graphql/queries";
import Loading from "../common/Loading";
import Sidebar from "../navigation/Sidebar";
import SidebarItem from "../navigation/SidebarItem";
import Account from "./Account";
import Profile from "./Profile";

const Settings: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_DARK_MODE);
	const [editProfile] = useMutation(MUTATION_EDIT_PROFILE);

	const [tab, setTab] = useState("profile");

	if (loading) return <Loading />;

	return (
		<Fragment>
			<Sidebar>
				<button onClick={() => setTab("profile")}>
					<SidebarItem
						title="profile"
						Icon={UserIcon}
						selected={tab === "profile"}
					/>
				</button>
				<button onClick={() => setTab("account")}>
					<SidebarItem
						title="account"
						Icon={ShieldCheckIcon}
						selected={tab === "account"}
					/>
				</button>
				<button
					onClick={async () => {
						await editProfile({
							variables: {
								data: JSON.stringify({ darkMode: !data?.me.darkMode })
							}
						});

						window.location.reload();
					}}
				>
					<SidebarItem
						title="toggle theme"
						Icon={data?.me.darkMode ? MoonIcon : SunIcon}
					/>
				</button>
			</Sidebar>
			<div className="p-4 float-left">
				{
					{
						profile: <Profile />,
						account: <Account />
					}[tab]
				}
			</div>
		</Fragment>
	);
};

export default Settings;
