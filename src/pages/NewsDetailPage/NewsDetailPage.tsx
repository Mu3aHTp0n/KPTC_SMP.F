import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import altImage from '@shared/images/newsAltImage.jpg'

export default function NewsDetailPage() {
	const { id } = useParams();
	const BACKEND_API = import.meta.env.VITE_BACKEND_HOST

	const [articleData, setArticleData] = useState({
		id: 0,
		title: '',
		datePublication: '',
		imageName: '',
		content: '',
	})

	useEffect(() => {
		if (!id) return
		axios.get(`${BACKEND_API}/news/${id}`)
		.then(response => {
			console.log(response);
			setArticleData(response.data)
		})
	},[id])

  return (
    <div className='bg-neutral-950 text-white min-h-[100vh]'>
		<main className="bg-zinc-800 max-w-5xl min-h-[100vh] mx-auto px-10 py-8">
			<header>
				<h1 className="text-5xl mb-3">{articleData.title}</h1>
				<p className="text-blue-700 mb-2">{articleData.datePublication.slice(0, 10) + ' ' + articleData.datePublication.slice(-8)}</p>
			</header>
			<hr className="w-full border border-solid border-gray-700 mb-4" />
			<div className="relative overflow-hidden">
				<img className="absolute rounded-2xl w-full mx-auto -z-10 mb-4 blur-[50px] brightness-50"
					src={`${BACKEND_API}/news/${articleData.id}/resource?imageName=${articleData.imageName}`}
					onError={event => {
						event.target.src = altImage
					}}
					alt={'Network error'} />
				<img className="rounded-2xl max-w-[80%] mx-auto mb-4 relative"
					src={`${BACKEND_API}/news/${articleData.id}/resource?imageName=${articleData.imageName}`}
					onError={event => {
						event.target.src = altImage
					}}
					alt={'Network error'} />
			</div>
			<p>{articleData.content}</p>
		</main>
	</div>
  )
}
