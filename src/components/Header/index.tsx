import Link from "next/link";
export default function Header() {
	const menus = [
		{
			name: "Inbox",
			link: "/inbox",
			bgColor: "bg-gray-500",
			borderColor: "border-gray-500",
		},
		{
			name: "Tasks",
			link: "/tasks",
			bgColor: "bg-teal-600",
			borderColor: "border-teal-600",
		},
		{
			name: "Notes",
			link: "/notes",
			bgColor: "bg-orange-700",
			borderColor: "border-orange-700",
		},
		{
			name: "Boards",
			link: "/boards",
			bgColor: "bg-sky-600",
			borderColor: "border-sky-600",
		},
	];

	return (
		<nav className='w-full h-14 bg-cyan-950 flex fixed justify-between items-center px-10 border-b-2 border-orange-700'>
			<div className='flex'>
				<div className='pr-10'>
					<p>TaNBo</p>
					{/* TODO: ロゴを画像に差し替える */}
				</div>
				<ul className='flex block'>
					{menus.map((menu) => (
						// TODO: 押下できる範囲を広げたいたいめ、Linkコンポーネントとliタグを逆にした挙動が望ましいが、エラーが出るので要検討。
						<li
							key={menu.name}
							className={`px-8 py-2 mr-3 rounded block ${menu.bgColor}`}>
							<Link href={menu.link}>{menu.name}</Link>
						</li>
					))}
				</ul>
			</div>
			<p>ログアウト</p>
		</nav>
	);
}
