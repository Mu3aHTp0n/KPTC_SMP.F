import { Link } from "react-router-dom"

export default function ProfileHeader({nickname = 'Loading...'}) {
    return (
        <header className="flex justify-between items-center px-10 h-[70px] bg-[#212121]">
            <Link className="flex items-center" to='/'>
                <img className="mr-2" src="https://spworlds.ru/img/logo.svg" alt="KPTC_SMP_LOGO" />
                <p className='text-xl font-bold text-white'>kptc smp</p>
            </Link>
            <button className="text-white">{nickname}</button>
        </header>
    )
}
