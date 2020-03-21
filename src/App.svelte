<script>
	import Wifi from './Wifi.svelte';
	import HostIp from './HostIp.svelte';
	import Plotter from './Plotter.svelte';
	import Upload from './upload/Upload.svelte';
	import { writable } from "svelte/store";
	const hostname = writable(localStorage.getItem("hostname") || '');

	export let toggleSettings = false;

	export let hostip;
	hostip = (hostname !== '') ? localStorage.getItem("hostname") : hostip;

	export let file = "";
	export const wifi = {
		ssid: "ssid",
		password: "password",
	}
	export const plotter = {
		zoomFactor: 0
	};

	function handleSetHostInput(e) {
		hostip = e.detail.host;
		localStorage.setItem("hostname", hostip);
	}

	function handleSetWifiInput(e) {
		wifi.ssid = e.detail.ssid;
		wifi.password = e.detail.password;
	}

	function handleSetPlotterInput(e) {
		plotter.zoomFactor = e.detail.zoomFactor;
	}

	function handleUploadInput(e) {
		file = e.detail.file;
	}

	async function setWifi() {
		const options =  {
			method: "POST",
			headers: new Headers({
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}),
			body: JSON.stringify(wifi)
		}
		const response = await fetch('http://' + hostip + '/wifi', options);
		const string = await response.text();
		const json = string === "" ? {} : JSON.parse(string);
		return json;
	}

	function handleSetWifi(e) {
		setWifi().then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		});
	}

	async function setConfig() {
		const options =  {
			method: "POST",
			headers: new Headers({
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}),
			body: JSON.stringify(plotter)
		}
		const response = await fetch('http://' + hostip + '/config', options);
		const string = await response.text();
		const json = string === "" ? {} : JSON.parse(string);
		return json;
	}

	function handleSetConfig(e) {
		setConfig().then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		});
	}

	async function getConfig() {
		const options =  {
			method: "GET",
			headers: new Headers({
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		}
		const response = await fetch('http://' + hostip + '/config', options);
		const string = await response.text();
		const json = string === "" ? {} : JSON.parse(string);
		return json;
	}

	function handleGetConfig(e) {
		getConfig().then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		})
	}

	async function getPlot() {
		const options =  {
			method: "GET",
			headers: new Headers({
				'content-type': 'text/plain',
				'Access-Control-Allow-Origin': '*'
			})
		}
		const response = await fetch('http://' + hostip + '/plot', options);
		const string = await response.text();
		return string;
	}

	function handleGetPlot(e) {
		getPlot().then( (response) => {
			alert(response);
		}).catch( (error) => {
			alert(error.message);
		})
	}

	function handleToggleSettings(e) {
		toggleSettings = !toggleSettings;
	}

	async function upload() {
		let data = new FormData();
		data.append('/wall-plotter.data', file);
		const options =  {
			method: "POST",
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			}),
			body: data
		}
		const response = await fetch('http://' + hostip + '/plot', options);
		const string = await response.text();
		return string;
	}

	function handleUpload(e) {
		upload().then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		});
	}

	async function plotterControl(command) {
		const options =  {
			method: "POST",
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			})
		}
		const response = await fetch('http://' + hostip + '/' + command, options);
		const string = await response.text();
		return string;
	}

	function handlePlotterStart(e) {
		plotterControl("start").then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		});
	}


	function handlePlotterStop(e) {
		plotterControl("stop").then( (response) => {
			alert(JSON.stringify(response));
		}).catch( (error) => {
			alert(error.message);
		});
	}

	function readTextFile(file)
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					var allText = rawFile.responseText;
					alert(allText);
				}
			}
		}
		rawFile.send(null);
	}

</script>

<main>
	<h1>Plotter-UI</h1>
	<hr>
	<label class="clickable" for="settings" on:click={handleToggleSettings}>Settings:</label>
	<ul id="settings" class="{toggleSettings ? 'unfolded' : 'folded'}">
		<label class="clickable" for="hostsettings">Host:</label>
		<li id="hostsettings">
			<HostIp  on:sethost={handleSetHostInput} hostip={hostip}></HostIp>
		</li>
		<hr>
		<label class="clickable" for="wifisettings">WiFi:</label>
		<li id="wifisettings">
			<Wifi on:setwifi={handleSetWifiInput}></Wifi>
			<button class="btn btn-3 btn-sep icon-send" on:click={handleSetWifi}>set Wifi</button>
		</li>
		<hr>
		<label class="clickable" for="plottersettings">Plotter:</label>
		<li id="plottersettings">
			<Plotter on:setplotter={handleSetPlotterInput}></Plotter>
			<button class="btn btn-4 btn-sep icon-send" on:click={handleSetConfig}>set Config</button>
			<button class="btn btn-1 btn-sep icon-info" on:click={handleGetConfig}>get Config</button>
		</li>
	</ul>
	<hr>
	<label for="plottercontroll">Plotter Control:</label>
	<ul id="plottercontroll">
		<Upload on:setfilename={handleUploadInput}></Upload>
		<button class="btn btn-4 btn-sep icon-send" on:click={handleUpload}>upload</button>
	</ul>
	<ul>
		<button class="btn btn-1 btn-sep icon-info" on:click={handleGetPlot}>show Data</button>
	<ul>
	</ul>
		<button class="btn btn-2 btn-sep icon-send" on:click={handlePlotterStart}>Start</button>
		<button class="btn btn-3 btn-sep icon-heart" on:click={handlePlotterStop}>Stop</button>
	</ul>
</main>

<style>
	ul {
		color: #5f5f5f;
		font-size: 0.85em;
		font-weight: 200;
	}

	main {
		overflow: scroll;
		text-align: left;
		padding: 0.8em;
		margin: 0 auto;
		font-size: 1em;
	}

	label {
		color: #5f5f5f;
		font-size: 0.85em;
		font-weight: 200;
	}

	.clickable {
		cursor: pointer;
	}

	h1 {
		color: #9e9e9e;
		font-size: 2.2em;
	}



	.folded {
		display: none;
		transition: height 1s ease-out;
	}
	.unfolded {
		height: 100%;
		display: block;
		transition: height 1s ease-in;
	}

	/* General button style */
	.btn {
		border: none;
		font-family: 'Verdana';
		font-size: 0.85em;
		color: inherit;
		background: none;
		cursor: pointer;
		display: inline-block;
		text-transform: uppercase;
		margin: 0.5em;
		letter-spacing: 1px;
		font-weight: 700;
		outline: none;
		position: relative;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		transition: all 0.3s;
	}

	.btn:after {
		content: '';
		position: absolute;
		z-index: -1;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		transition: all 0.3s;
	}

	/* Pseudo elements for icons */
	.btn:before {
		font-family: 'Verdana';
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		position: relative;
		-webkit-font-smoothing: antialiased;
	}


	/* Icon separator */
	.btn-sep {
		padding: 12px 30px 12px 80px;
	}

	.btn-sep:before {
		background: rgba(0,0,0,0.15);
	}

	/* Button 1 */
	.btn-1 {
		background: #3498db;
		color: #fff;
	}

	.btn-1:hover {
		background: #2980b9;
	}

	.btn-1:active {
		background: #2980b9;
		top: 2px;
	}

	.btn-1:before {
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
		line-height: 2;
		font-size: 1.5em;
		width: 60px;
	}

	/* Button 2 */
	.btn-2 {
		background: #2ecc71;
		color: #fff;
	}

	.btn-2:hover {
		background: #27ae60;
	}

	.btn-2:active {
		background: #27ae60;
		top: 2px;
	}

	.btn-2:before {
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
		line-height: 2;
		font-size: 1.5em;
		width: 60px;
	}

	/* Button 3 */
	.btn-3 {
		background: #e74c3c;
		color: #fff;
	}

	.btn-3:hover {
		background: #c0392b;
	}

	.btn-3:active {
		background: #c0392b;
		top: 2px;
	}

	.btn-3:before {
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
		line-height: 2;
		font-size: 1.5em;
		width: 60px;
	}

	/* Button 3 */
	.btn-4 {
		background: #34495e;
		color: #fff;
	}

	.btn-4:hover {
		background: #2c3e50;
	}

	.btn-4:active {
		background: #2c3e50;
		top: 2px;
	}

	.btn-4:before {
		position: absolute;
		height: 100%;
		left: 0;
		top: 0;
		line-height: 2;
		font-size: 1.5em;
		width: 60px;
	}

	.icon-heart:before {
		content: "\f55a";
	}

	.icon-info:before {
		content: "\f05a";
	}

	.icon-send:before {
		content: "\f1d8";
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
