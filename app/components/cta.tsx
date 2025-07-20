import React, { FunctionComponent } from 'react';
import type { ICta } from "@/lib/interfaces";

const Cta: FunctionComponent<ICta> = ({ label, target, url, theme }) => {
	let themeClasses;
	if (theme === 'dark' || theme === null) {
		themeClasses = 'text-white bg-black border-black hover:text-black hover:bg-white';
	}
	else {
		themeClasses = 'text-black bg-white border-white hover:text-white hover:bg-black';
	}

	return (
		<a className={`block w-fit border-2 px-4 py-1 no-underline rounded-md transition duration-300 ease-in-out ${themeClasses}`} href={url} target={`_${target}`}>{label}</a>
	)
}

export default Cta;