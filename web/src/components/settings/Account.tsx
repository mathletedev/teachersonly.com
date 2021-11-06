import { FC, Fragment } from "react";
import LabelledInput from "../common/LabelledInput";

const Account: FC = () => {
	return (
		<Fragment>
			<LabelledInput label="username" divider />
			<LabelledInput label="email" divider />
			<LabelledInput label="password" type="password" />
		</Fragment>
	);
};

export default Account;
