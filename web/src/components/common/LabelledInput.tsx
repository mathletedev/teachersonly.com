import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

interface Props {
	label: string;
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	type?: HTMLInputTypeAttribute;
	style?: string;
	divider?: boolean;
}

const LabelledInput: FC<Props> = ({
	label,
	value,
	onChange,
	type,
	style,
	divider
}) => {
	return (
		<div>
			<label className="text-default">{label}</label>
			<br />
			<input
				type={type}
				value={value}
				onChange={onChange}
				className={`${style ? `${style} ` : ""}text-input`}
			/>
			{divider && <div className="h-4"></div>}
		</div>
	);
};

export default LabelledInput;
