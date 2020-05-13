import { sharedPreferences } from '../store/store';
import { AuthKeys } from '../store/keys/auth';

export const getAuthTokenStore = (): string | null => {
	return sharedPreferences.get(AuthKeys.Token, null);
};

// export const setAuthStore = (token:string) => {
// 	sharedPreferences.get
// };
