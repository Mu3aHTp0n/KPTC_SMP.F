import { IUser } from '@shared/model/IUser';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUser = {
	id: 0,
	email: '',
	username: '',
	dateRegistration: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
})

export default userSlice.reducer;