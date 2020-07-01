import english from './english';

export interface Strings {
	LOGIN: string;
	USERNAME: string;
	PASSWORD: string;
	ENTER_USERNAME: string;
	ENTER_PASSWORD: string;
	OK: string;
	YES: string;
	CANCEL: string;
	HIDE: string;
	SHOW: string;
	USERNAME_OR_PASSWORD_NOT_ENTERED: string;
	LOGIN_FAILED: string;
	HELLO: string;
	PROFILE: string;
	ABOUT_US: string;
	LOGOUT: string;
	LOGOUT_WAITING: string;
	MY_COURSES: string;
	USERS: string;
	COURSES: string;
	DEPARTMENTS: string;
	ENROLL_TO_COURSE: string;
	LOGOUT_U_SURE: string;
	SEARCH_DEPARTMENT: string;
	CODE: string;
	ENTER_CODE_TO_SEARCH: string;
	NAME: string;
	FULL_NAME: string;
	ENTER_NAME_TO_SEARCH: string;
	SETTINGS: string;
	ADD_NEW_DEPARTMENT: string;
	ADD_NEW_ROW: string;
	DELETE_ALL_DEPARTMENT: string;
	ARE_YOU_SURE: string;
	SEARCH: string;
	CLEAR: string;
	NO_RESULT_FOUND: string;
	RESULT: string;
	OPTIONS: string;
	NEXT: string;
	PREV: string;
	DELETE: string;
	EDIT: string;
	ACTIONS: string;
	EDIT_DEPARTMENT: string;
	CLOSE: string;
	SAVE: string;
	ADD_DEPARTMENT: string;
	SORT_ASC: string;
	SORT_DESC: string;
	IMPORT_FILE: string;
	ENTER_ONE_ROW: string;
	CHECK_YOUR_INFO: string;
	CREATED: string;
	DELETE_ALL_COURSE: string;
	ADD_NEW_COURSE: string;
	SEARCH_COURSE: string;
	ADD_COURSE: string;
	EDIT_COURSE: string;
	ASSIGN_LECTURER: string;
	ADD_LECTURER_BY_ID: string;
	LECTURER_ID: string;
	ADD: string;
	ADDED: string;
	ID: string;
	EDIT_USER: string;
	ENTER_NAME: string;
	ENTER_ID: string;
	ADD_USER: string;
	SEARCH_USER: string;
	ENTER_ID_TO_SEARCH: string;
	ADD_NEW_USERS: string;
	DELETE_ALL_USERS: string;
	FIRST_NAME: string;
	LAST_NAME: string;
	EMAIL: string;
	ENTER_FIRST_NAME: string;
	ENTER_LAST_NAME: string;
	ENTER_EMAIL: string;
	ROLE: string;
	NO_SELECTION: string;
	PLEASE_ENTER_ROLE: string;
	NO_COURSE_FOUND: string;
	ADD_OR_REMOVE_SOFTWARE: string;
	SOFTWARE: string;
	ADD_NEW_SOFTWARE: string;
	VERSION: string;
	SELECT: string;
	SELECT_SOFTWARE_FIRST: string;
	REMOVED: string;
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
