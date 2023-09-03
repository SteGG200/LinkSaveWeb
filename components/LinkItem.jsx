import  React from 'react';
import Dropdown from './Dropdown';

function LinkItem(props) {
	const {deleteLink, link} = props;
	
	return (
		<li
			className="flex justify-between h-[40px]"
		>
			<div
				className="flex items-center truncate w-1/2 max-lg:w-2/3 max-sm:w-4/5"
			>
				<a href={link.url}>{link.title}</a>
			</div>
			<Dropdown link={link} deleteLink={deleteLink}/>
		</li>
	)
}

export default LinkItem;