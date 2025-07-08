// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

export const logout = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	// navigate('/')
	location.reload();
}