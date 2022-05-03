// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const util = require('./util');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function getWebViewContent(context, templatePath) {
	const resourcePath = util.getExtensionFileAbsolutePath(context, templatePath);
	const dirPath = path.dirname(resourcePath);
	console.log(resourcePath)
	let html = fs.readFileSync(resourcePath, 'utf-8');
	// console.log("html: ", html)
	// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
	html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
		return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});
	return html;
}
function getVscodePath(str) {
	return str.replace(/\//g, "\\\\");
}
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "callgraph" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('callgraph.helloWorld', function (info) {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from CallGraph!');
		// 1.创建并显示Webview
		const uri = vscode.window.activeTextEditor.document.uri;
		console.log("uri: ", uri);
		const panel = vscode.window.createWebviewPanel(
			// 该webview的标识，任意字符串
			'callgraph',
			// webview面板的标题，会展示给用户
			'callgraph',
			// webview面板所在的分栏
			vscode.ViewColumn.One,
			// 其它webview选项
			{
				enableScripts: true, // 启用JS，默认禁用
				retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
			}

		);
		panel.webview.onDidReceiveMessage(message => {
			console.log('插件收到的消息：', message);
			const funcName = message?.message?.name;
			if (funcName) {
				const mapArray = fs.readFileSync("C:/Users/twnan/OneDrive/桌面/GraduationProject/swlu_map.txt", 'utf-8')?.split("\n");
				const nameIndex = mapArray.findIndex((item) => item === funcName);
				if (nameIndex >= 0) {
					const targetIndex = nameIndex + 1;
					const targetArray = mapArray[targetIndex].split(":");
					console.log(targetArray);
					const lineStr = targetArray[targetArray.length - 1];
					const path = mapArray[targetIndex].slice(0, mapArray[targetIndex].length - 1 - lineStr.length);
					const destPath = getVscodePath(path);
					if (!fs.existsSync(destPath)) {
						vscode.window.showErrorMessage(`无法读取档案${path}`);
						return;
					}
					console.log(destPath);
					console.log(lineStr)
					vscode.workspace.openTextDocument(destPath).then((doc) => {
						// vscode.window.showInformationMessage('Hello World！');
						console.log("doc:", doc);
						const line = Number(lineStr) - 1;
						const options = {
							selection: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 0)),
							viewColumn: vscode.ViewColumn.Two
						};
						vscode.window.showTextDocument(doc, options);
					})
				}

			}

		}, undefined, context.subscriptions);

		panel.webview.html = getWebViewContent(context, 'src/build/index.html');
		const dataPath = getVscodePath(info.path.slice(1));

		let data = fs.readFileSync(dataPath, 'utf-8');
		setTimeout(() => {
			panel.webview.postMessage({ data });
			console.log(data)
		}, 2000)

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
