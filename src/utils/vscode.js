export const postVscode = (data) => {
    console.log(data);
    window.vscode?.postMessage({
        message: data
    });
}