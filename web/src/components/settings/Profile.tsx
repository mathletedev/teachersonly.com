import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, Fragment, useEffect, useState } from "react";
import { __flairs__ } from "../../lib/constants";
import { MUTATION_EDIT_PROFILE } from "../../lib/graphql/mutations";
import LabelledInput from "../common/LabelledInput";
import Loading from "../common/Loading";

const QUERY_ME_SETTINGS = gql`
	query MeSettings {
		me {
			displayName
			status
			flair
		}
	}
`;

interface SettingsData {
	displayName?: string;
	status?: string;
	flair?: number;
}

const Profile: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_SETTINGS);
	const [editProfile] = useMutation(MUTATION_EDIT_PROFILE);

	const [settings, setSettings] = useState<SettingsData>({});

	useEffect(() => {
		console.log(data?.me);
		if (!data) return;

		setSettings(data.me);
	}, [data]);

	if (loading) return <Loading />;

	return (
		<Fragment>
			<form
				onSubmit={async () => {
					await editProfile({
						variables: {
							data: JSON.stringify(settings)
						}
					});

					window.location.reload();
				}}
			>
				<LabelledInput
					label="display name"
					value={settings.displayName}
					onChange={(e) =>
						setSettings({ ...settings, displayName: e.target.value })
					}
					divider
				/>
				<LabelledInput
					label="status"
					value={settings.status}
					onChange={(e) => setSettings({ ...settings, status: e.target.value })}
					divider
				/>
				<label className="text-default">flair</label>
				<br />
				<select
					value={settings.flair}
					onChange={(e) =>
						setSettings({ ...settings, flair: parseInt(e.target.value) })
					}
				>
					{__flairs__.map((flair, i) => (
						<option value={i}>{flair}</option>
					))}
				</select>
				<div className="h-8"></div>
				<button type="submit" className="text-button">
					save
				</button>
			</form>
		</Fragment>
	);
};

export default Profile;
