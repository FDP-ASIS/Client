import { Role } from './../../models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { User, Name } from '../../models/user';

interface UserState {
	user: User | null;
}

const initialState: UserState = {
	user: null,
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	initialState.user = new User(
		'012345678',
		new Name('first', 'middle', 'last'),
		'username',
		'mail@mail.com',
		Role.STUDENT
	);
}
// else {
// 	// production code
// }

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
