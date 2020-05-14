import { sharedPreferences } from '../store/store';
import { AuthKeys } from '../store/keys/auth';

export const getAuthTokenStore = (): string | null => {
	return sharedPreferences.get(AuthKeys.Token, null);
};

export const setAuthTokenStore = (token: string): boolean => {
	sharedPreferences.set(AuthKeys.Token, token);
	return true;
};
