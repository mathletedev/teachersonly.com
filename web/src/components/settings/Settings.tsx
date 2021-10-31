import { gql, useMutation, useQuery } from "@apollo/client";
import { MoonIcon, SunIcon, UserIcon } from "@heroicons/react/outline";
import { FC, Fragment, useState } from "react";
import { QUERY_ME_DARK_MODE } from "../../lib/graphql/queries";
import Loading from "../common/Loading";
import Sidebar from "../navigation/Sidebar";
import SidebarItem from "../navigation/SidebarItem";
import Profile from "./Profile";

const MUTATION_SET_DARK_MODE = gql`
	mutation SetDarkMode($darkMode: Boolean!) {
		setDarkMode(darkMode: $darkMode)
	}
`;

const Settings: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_DARK_MODE);
	const [setDarkMode] = useMutation(MUTATION_SET_DARK_MODE);

	const [tab, setTab] = useState("profile");

	if (loading) return <Loading />;

	return (
		<Fragment>
			<Sidebar>
				<button onClick={() => setTab("profile")}>
					<SidebarItem title="profile" Icon={UserIcon} />
				</button>
				<button
					onClick={async () => {
						await setDarkMode({ variables: { darkMode: !data?.me.darkMode } });

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
						profile: <Profile />
					}[tab]
				}
			</div>
		</Fragment>
	);
};

export default Settings;
