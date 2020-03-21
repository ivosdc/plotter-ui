<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function setWifi() {
        dispatch('setwifi', {
            ssid: wifi.ssid,
            password: wifi.password
        });
    }

    export const wifi = {
        ssid: "",
        password: "",
    }
</script>

<main>
    <table><tr><td>
    <label for="ssid">SSID:</label>
        <input id="ssid" bind:value={wifi.ssid} on:input={setWifi}>
    </td><td>
    <label for="password">Password:</label>
        <input id="password" bind:value={wifi.password} on:input={setWifi}>
    </td></tr></table>
</main>

<style>
    table tr td {
        padding: 0px;
        margin: 0px;
    }

    label {
        display: block;
        color: #5f5f5f;
        font-size: 0.85em;
        font-weight: 200;
    }

    input {
        color: #494949;
        font-size: 0.85em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
