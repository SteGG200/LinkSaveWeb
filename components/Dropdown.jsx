import React from 'react';

function Dropdown(props) {
	const wrapperRef = React.useRef(null);
	const [isOpenSetting, setOpenSetting] = React.useState(false);
	const {deleteLink, link} = props;
	React.useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setOpenSetting(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	return (
		<div className="relative w-[40px]" ref={wrapperRef}>
			{
				isOpenSetting &&
				<div className="absolute shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-md w-44 bg-[#fff] right-0 top-[40px] z-20 py-2">
					<button className="pl-2 py-2 text-left w-full outline-0 hover:bg-slate-200"
						onClick={async () => {setOpenSetting(false); await deleteLink(link.id)}}
					>
						Delete
					</button>
				</div>
			}
			<button className="hover:bg-slate-300 rounded-full flex flex-wrap w-full h-full justify-center content-center z-10"
				onClick={() => setOpenSetting(!isOpenSetting)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
				</svg>
			</button>
		</div>
	)
}

export default Dropdown;