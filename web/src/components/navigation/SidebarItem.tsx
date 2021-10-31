import { FC } from "react";

interface Props {
	title: string;
	Icon: FC;
	selected?: boolean;
}

const SidebarItem: FC<Props> = ({ title, Icon, selected }) => {
	return (
		<div
			className={`${
				selected ? "bg-indigo-200 dark:bg-gray-700 " : ""
			}sidebar-item`}
		>
			<Icon />
			<span className="w-1"></span>
			{title}
		</div>
	);
};

export default SidebarItem;
