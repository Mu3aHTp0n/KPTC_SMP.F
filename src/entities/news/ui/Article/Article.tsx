import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"

import altImage from "@shared/assets/newsAltImage.jpg"

interface Props {
  id: number
  preview?: string
  title: string
  datePublication: string
}

export default function Article({preview = 'https://i.imgur.com/mwKFlE0.png', id, title, datePublication}: Props) {
  return (
    <article className="article">
        <Link to={`/news/${id}`}>
          <img className="article__preview rounded-md w-full aspect-[67/44] mb-4" src={preview} onError={event => {
            event.target.src = altImage
          }} alt={altImage} />
          <h3 className="article__title break-all text-xl text-white hover:text-[#4A88FC]">{title}</h3>
        </Link>
        <p className="article__date text-sm text-[#4A88FC] mt-2">
          <FontAwesomeIcon className="mr-2" icon={faCalendar} />
          {datePublication.slice(0, 10)}
        </p>
    </article>
  )
}
