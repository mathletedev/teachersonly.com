import { FC } from "react";

interface Props {
	title: string;
	Icon: FC;
}

const SidebarItem: FC<Props> = ({ title, Icon }) => {
	return (
		<div className="sidebar-item">
			<Icon />
			<span className="w-1"></span>
			{title}
		</div>
	);
};

export default SidebarItem;
