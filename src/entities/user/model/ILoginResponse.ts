export interface ILoginResponse {
	tokens: {
		refreshToken: string;
		accessToken: string;
	};
	roles: string[];
}