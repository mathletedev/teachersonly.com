import { FC } from "react";

const Sidebar: FC = ({ children }) => {
	return <aside className="h-full w-48 bg-indigo-100">{children}</aside>;
};

export default Sidebar;
