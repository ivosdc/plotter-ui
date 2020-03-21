<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const maxDigits = 50;
    const maxSteps = 5;


    export const plotter = {
        zoomFactor: 10
    }

    export let zoomDigits;
    $: zoomDigits = plotter.zoomFactor / (maxDigits / maxSteps);

    function setPlotter() {
        dispatch('setplotter', {
            zoomFactor: zoomDigits
        });
    }


</script>

<main>
        <label for="zoomfactor">Zoomfactor:</label>
            <input id="zoomfacter" type=range bind:value={plotter.zoomFactor}  min=0 max={maxDigits} on:input={setPlotter}>
            <input type=text bind:value={zoomDigits}  min=0 max={maxSteps} size=2 disabled>

</main>

<style>
    label {
        color: #5f5f5f;
        font-size: 0.85em;
        font-weight: 200;
    }

    input {
        background-color: #ededed;
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
