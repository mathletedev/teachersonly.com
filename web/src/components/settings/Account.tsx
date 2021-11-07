import { FC, Fragment } from "react";
import LabelledInput from "../common/LabelledInput";

const Account: FC = () => {
	return (
		<Fragment>
			<LabelledInput label="username" divider>
				<input className="text-input" />
			</LabelledInput>
			<LabelledInput label="email" divider>
				<input className="text-input" />
			</LabelledInput>
			<LabelledInput label="password">
				<input type="password" className="text-input" />
			</LabelledInput>
		</Fragment>
	);
};

export default Account;
