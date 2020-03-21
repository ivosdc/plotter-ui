<script>
    import {
        getFilesFromDropEvent,
        getFilesFromInputEvent,
        createUploadFile} from "./fileUtils";
    import {
        convertSvgToPlotterformat,
        createSvg} from "./svgUtils";
    import { createEventDispatcher } from "svelte";
    export let multiple = false;
    let dragging = false;
    let svgOriginal = '';
    let plotterFormat = '';
    let svgModified = '';
    let rawdatafile = {};
    $: svgModified = createSvg(plotterFormat);
    const dispatch = createEventDispatcher();

    function startDragging() {
        dragging = true;
    }

    function stopDragging() {
        dragging = false;
    }

    const onFile = getFilesFunction => event => {
        stopDragging();
        const files = getFilesFunction(event);
        var reader = new FileReader();
        reader.onload = function(event) {
            svgOriginal = event.target.result;
        };
        reader.onloadend = function() {
            plotterFormat = convertSvgToPlotterformat(svgOriginal);
            rawdatafile = createUploadFile(plotterFormat);
            dispatch("setfilename", {file: rawdatafile});
        };
        reader.readAsText(files[0]);
    };

</script>

<main>
    <label>
        <div class="dragarea" class:dragging
            on:drop|preventDefault={onFile(getFilesFromDropEvent)}
            on:dragover|preventDefault={startDragging}
            on:dragleave|preventDefault={stopDragging}>
        <slot {dragging}>
                Drag &amp; Drop your file(s) or
                <strong>browse.</strong>
        </slot>
        <input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)}/>
        </div>
    </label>
    <label for="svgmodified">Rendered SVG:</label>
    <div id="svgmodified" class="preview">{@html svgModified}</div>
</main>

<style>
    label {
        color: #5f5f5f;
        font-size: 0.85em;
        font-weight: 200;
    }
    input {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }

    .dragarea {
        text-align: center;
        padding-top: 2em;
        border: #ccc solid 1px;
        background-color: #ededed;
        width: 300px;
        height: 3em;
    }

    .dragarea:hover {
        cursor: pointer;
        background-color: #caeeb9;
    }

    .preview {
        white-space: pre-line;
        text-align: left;
        font-family: "Courier New";
        font-size: 0.85em;
        padding-top: 1em;
        border: #ccc solid 1px;
        background-color: #ededed;
        width: 300px;
        max-height: 450px;
        overflow: scroll;
    }
</style>
