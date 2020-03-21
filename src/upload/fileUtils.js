export function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
    return files.length
        ? [...files]
        : items
            .filter(({ kind }) => kind === "file")
            .map(({ getAsFile }) => getAsFile());
}

export function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = "";
    return files;
}

export function createUploadFile( data ) {
    var file = new File([data], "/wall-plotter.data", {type: "text/plain"});
    return file;
}
