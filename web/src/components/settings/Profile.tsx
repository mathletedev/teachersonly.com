import { FC, Fragment } from "react";
import LabelledInput from "../common/LabelledInput";

const Profile: FC = () => {
	return (
		<Fragment>
			<LabelledInput label="username" inputStyle="bg-gray-800" divider />
			<LabelledInput label="display name" inputStyle="bg-gray-800" divider />
			<LabelledInput label="status" inputStyle="bg-gray-800" divider />
			<LabelledInput label="flair" inputType="" inputStyle="bg-gray-800" />
		</Fragment>
	);
};

export default Profile;
