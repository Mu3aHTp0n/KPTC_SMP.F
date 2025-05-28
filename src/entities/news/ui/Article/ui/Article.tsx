import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"

import altImage from "@shared/assets/newsAltImage.jpg"

import styles from "./Article.module.scss"

interface Props {
  id: number
  preview?: string
  title: string
  datePublication: string
}

export default function Article({preview = 'https://i.imgur.com/mwKFlE0.png', id, title, datePublication}: Props) {
  return (
		<article className={styles.article}>
			<Link to={`/news/${id}`}>
				<img
					className={styles.articlePreview}
					src={preview}
					onError={(event) => {
						event.currentTarget.src = altImage;
					}}
					alt={altImage}
				/>
				<h3 className={styles.articleTitle}>{title}</h3>
			</Link>
			<p className='article__date text-sm text-[#4A88FC] mt-2'>
				<FontAwesomeIcon className='mr-2' icon={faCalendar} />
				{datePublication.slice(0, 10)}
			</p>
		</article>
	);
}
