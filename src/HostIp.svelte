<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let hostip;

    function setHost() {
        dispatch('sethost', {
            host: hostip
        });
    }

</script>

<main>
    <label for="hostname">Name :</label>
    <input id="hostname" bind:value={hostip} placeholder="enter host" on:input={setHost}>
</main>

<style>
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
