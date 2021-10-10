import { FC } from "react";

const Sidebar: FC = ({ children }) => {
	return (
		<aside className="h-full w-48 float-left bg-indigo-100 dark:bg-gray-800">
			{children}
		</aside>
	);
};

export default Sidebar;
