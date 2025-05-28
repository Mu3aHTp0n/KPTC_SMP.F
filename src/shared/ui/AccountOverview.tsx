import { Link } from "react-router-dom";
import ProfileInfoBlock from "@shared/ui/ProfileInfoBlock/ProfileInfoBlock";
import { InfoBlockItem } from '@shared/ui/InfoBlockItem';

interface Props {
	userData: {
		username: string;
		email: string;
		registrationDate: string;
	};
}

export default function AccountOverview({ userData }: Props) {

	return (
		<ProfileInfoBlock title="Личные данные" LinkButton={<Link to={'/profile/personal-info'}>Управление &#8594;</Link>} style='ml-8'>
			<InfoBlockItem itemTitle="Имя пользователя" endItem={userData.username}/>
			<InfoBlockItem itemTitle="Дата регистрации" endItem={userData.registrationDate}/>
			<InfoBlockItem itemTitle="Электронная почта" endItem={userData.email}/>
		</ProfileInfoBlock>
	);
}
