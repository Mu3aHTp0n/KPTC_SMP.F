export interface ILoginResponse {
	jwtTokenPairDto: {
		refreshToken: string;
		accessToken: string;
	};
	roles: string[];
}