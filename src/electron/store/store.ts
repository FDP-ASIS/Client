import Store from 'electron-store';

const store = new Store({ name: 'fdp_config' });

export { store as sharedPreferences };
