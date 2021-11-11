import { gql, useMutation, useQuery } from "@apollo/client";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { __flairs__ } from "../../lib/constants";
import { MUTATION_EDIT_USER } from "../../lib/graphql/mutations";
import LabelledInput from "../common/LabelledInput";
import Loading from "../common/Loading";

const QUERY_ME_PROFILE = gql`
	query MeProfile {
		me {
			image
			displayName
			status
			flair
		}
	}
`;

interface SettingsData {
	image?: string;
	displayName?: string;
	status?: string;
	flair?: number;
}

const Profile: FC = () => {
	const { data, loading } = useQuery(QUERY_ME_PROFILE);
	const [editUser] = useMutation(MUTATION_EDIT_USER);

	const [settings, setSettings] = useState<SettingsData>({});

	const uploader = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!data) return;

		setSettings(data.me);
	}, [data]);

	if (loading) return <Loading />;

	return (
		<Fragment>
			<form
				onSubmit={async () => {
					await editUser({
						variables: {
							data: JSON.stringify(settings)
						}
					});

					window.location.reload();
				}}
			>
				<LabelledInput label="image" divider>
					<input
						ref={uploader}
						type="file"
						accept="image/*"
						multiple={false}
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;

							const reader = new FileReader();
							reader.onload = (e) =>
								setSettings({ ...settings, image: e.target?.result as string });

							reader.readAsDataURL(file);
						}}
						className="hidden"
					/>
					<div
						onClick={() => uploader.current?.click()}
						className="h-64 w-64 rounded-full cursor-pointer"
					>
						<img src={settings.image} className="h-full w-full profile-image" />
					</div>
				</LabelledInput>
				<LabelledInput label="display name" divider>
					<input
						value={settings.displayName}
						onChange={(e) =>
							setSettings({ ...settings, displayName: e.target.value })
						}
						className="text-input"
					/>
				</LabelledInput>
				<LabelledInput label="status" divider>
					<input
						value={settings.status}
						onChange={(e) =>
							setSettings({ ...settings, status: e.target.value })
						}
						className="text-input"
					/>
				</LabelledInput>
				<LabelledInput label="flair">
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
				</LabelledInput>
				<div className="h-8"></div>
				<button type="submit" className="text-button">
					save
				</button>
			</form>
		</Fragment>
	);
};

export default Profile;
