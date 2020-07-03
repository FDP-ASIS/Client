import { sharedPreferences } from '../store/store';
import { Keys } from '../store/keys/auth';

export const getAuthTokenStore = (): string | null => {
	return sharedPreferences.get(Keys.AuthToken, null);
};

export const setAuthTokenStore = (token: string): boolean => {
	sharedPreferences.set(Keys.AuthToken, token);
	return true;
};

export const removeAuthTokenStore = (): boolean => {
	sharedPreferences.delete(Keys.AuthToken);
	return true;
};
