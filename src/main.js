import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		hostip: '192.168...'
	}
});

export default app;
