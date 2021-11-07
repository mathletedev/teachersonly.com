import { FC } from "react";

interface Props {
	label: string;
	divider?: boolean;
}

const LabelledInput: FC<Props> = ({ label, divider, children }) => {
	return (
		<div>
			<label className="text-default">{label}</label>
			<br />
			{children}
			{divider && <div className="h-4"></div>}
		</div>
	);
};

export default LabelledInput;
