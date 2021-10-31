import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

interface Props {
	label: string;
	inputValue?: string;
	onInputChange?: ChangeEventHandler<HTMLInputElement>;
	inputType?: HTMLInputTypeAttribute;
	inputStyle?: string;
	divider?: boolean;
}

const LabelledInput: FC<Props> = ({
	label,
	inputValue,
	onInputChange,
	inputType = "text",
	inputStyle,
	divider
}) => {
	return (
		<div>
			<label className="text-default">{label}</label>
			<input
				type={inputType}
				value={inputValue}
				onChange={onInputChange}
				className={`${inputStyle && `${inputStyle} `}text-input`}
			/>
			{divider && <div className="h-4"></div>}
		</div>
	);
};

export default LabelledInput;
