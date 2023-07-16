import Header from "@/components/Header";
import Modal from "@/components/Modal";
export default function Notes() {
	return (
		<>
			<Header />
			<Modal />
			<div className='flex '>
				<div className='w-1/5 p-5 overflow-scroll h-screen pt-20'>
					<ul>
						<li className='p-4 rounded mb-3 bg-orange-700'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
						<li className='p-4 rounded mb-3 bg-orange-950'>xxxプロジェクト</li>
					</ul>
				</div>
				<div className='bg-gray-800 w-3/5 h-screen pt-20 px-10'>
					<div className='flex justify-between'>
						<p>■</p>
						<h1 className='mb-8 text-3xl'>タイトルです。</h1>
						<div className='w-10 h-10 bg-slate-600 rounded'></div>
					</div>
					<p className=''>
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
						ここが、詳細部分の記載になります。
						この辺りにテキストがズラーと並ぶイメージになります。
					</p>
				</div>
				<div className='w-1/5 h-screen overflow-scroll pt-20 p-5'>
					<p className='mb-3'>作成日: 2023/5/10</p>
					<p className='mb-3'>作成日: 2023/5/10</p>

					<div>
						<table className='w-full bg-gray-900 rounded'>
							<caption className='bg-teal-600 rounded-t'>Task</caption>
							<thead></thead>
							<tbody>
								<tr>
									<th></th>
								</tr>
								<tr>
									<td className='p-2'>状態：</td>
									<td className='p-2'>完了</td>
								</tr>
								<tr>
									<td className='p-2'>完了日：</td>
									<td className='p-2'>2023/5/22</td>
								</tr>
								<tr>
									<td className='p-2'>期限：</td>
									<td className='p-2'>2023/5/30</td>
								</tr>
								<tr>
									<td className='p-2'>予定開始日：</td>
									<td className='p-2'>2023/5/22</td>
								</tr>
								<tr>
									<td className='p-2'>予定終了日：</td>
									<td className='p-2'>2023/5/22</td>
								</tr>
								<tr>
									<td className='p-2'>進捗：</td>
									<td className='p-2'>100％</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
