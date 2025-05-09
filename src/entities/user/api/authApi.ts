import { baseApi } from '@shared/api/baseApi';

import { ILogin } from '@shared/model/ILogin';
import { ILoginResponse } from '../model/ILoginResponse';

export const authApi = baseApi.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<ILoginResponse, ILogin>({
			query: (data) => ({
				url: 'auth/login',
				method: 'POST',
				body: data
			}),
		})
	})
})