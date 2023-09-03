export default function WarningAlert({ message, callback }) {
	return (
		<div className="flex justify-between w-11/12 sm:w-5/6 lg:w-2/3 mx-auto rounded-md bg-red-300 text-red-800 p-4">
			<span>{message}</span>
			<button
				onClick={() => {
					sessionStorage.setItem('warning', 0);
					callback(sessionStorage.getItem('warning') === '1');
				}}
			>
				x
			</button>
		</div>
	)
}