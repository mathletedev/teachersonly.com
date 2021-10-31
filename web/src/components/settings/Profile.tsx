import { FC, Fragment } from "react";
import LabelledInput from "../common/LabelledInput";

const Profile: FC = () => {
	return (
		<Fragment>
			<LabelledInput label="display name" divider />
			<LabelledInput label="status" divider />
			<LabelledInput label="flair" />
		</Fragment>
	);
};

export default Profile;
