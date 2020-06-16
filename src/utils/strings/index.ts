import english from './english';

export interface Strings {
	LOGIN: string;
	USERNAME: string;
	PASSWORD: string;
	ENTER_USERNAME: string;
	ENTER_PASSWORD: string;
	OK: string;
	HIDE: string;
	SHOW: string;
	USERNAME_OR_PASSWORD_NOT_ENTERED: string;
	LOGIN_FAILED: string;
	HELLO: string;
}

enum Languages {
	ENGLISH,
}

let currentLanguage: Languages = Languages.ENGLISH;
let currentStrings: Strings;

switch (currentLanguage) {
	// case Languages.ENGLISH:
	// 	currentStrings = english;
	// 	break;

	default:
		currentStrings = english;
		break;
}

export default currentStrings;
