// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getHTML(context, templatePath) {
	// 网页入口文件的绝对路径
	const resourcePath = path.join(context.extensionPath, templatePath);
	// 网页入口文件所处的目录
	const dirPath = path.dirname(resourcePath);
	// 使用正则表达式替换css和JS等本地资源的路径为符合vscode-resource:协议的格式
	let html = fs.readFileSync(resourcePath, 'utf-8').replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
		return `${$1}${vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString()}"`;
	});
	return html;
}
function getVscodePath(str) {
	return str.replace(/\//g, "\\\\");
}
function activate(context) {
	let mapFilePath = '';
	let disposable = vscode.commands.registerCommand('callgraph.showWebview', function (info) {
		// The code you place here will be executed every time your command is executed
		// 创建并显示Webview
		const panel = vscode.window.createWebviewPanel(
			// webview标识
			'callgraph',
			// webview面板标题
			'callgraph',
			// webview面板所在的分栏
			vscode.ViewColumn.One,
			// 其它webview选项
			{
				enableScripts: true, // 启用JS，默认禁用
				retainContextWhenHidden: true, // webview隐藏时保持状态，避免被重置
			}
		);
		const panelPointer = panel;
		panel.webview.onDidReceiveMessage(message => {
			console.log('插件收到的消息：', message);
			switch (message?.message?.type) {
				case 'getSettings':
					const settings = context.globalState.get('settings');
					console.log(settings);
					console.log('panelPointer', panelPointer)
					panelPointer.webview.postMessage({
						data: {
							type: 'getSettings',
							settings
						}
					});
					break;
				case 'setSettings':
					context.globalState.update('settings', message?.message?.settings);
					break;
				default:
					const funcName = message?.message?.name;
					if (funcName) {
						console.log("mapFilePath: ", mapFilePath);
						if (!fs.existsSync(mapFilePath)) {
							vscode.window.showErrorMessage(`无法读取档案${mapFilePath}`);
							return;
						}
						const mapArray = fs.readFileSync(mapFilePath, 'utf-8')?.split("\n");
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
						} else {
							vscode.window.showErrorMessage(`映射文件swlu_map.txt中找不到${funcName}函数`);
						}

					}
					break;
			}
		}, undefined, context.subscriptions);
		panel.webview.html = getHTML(context, 'src/build/index.html');
		const dataPath = getVscodePath(info.path.slice(1));
		console.log("dataPath: ", getVscodePath(path.dirname(info.path.slice(1))))
		mapFilePath = getVscodePath(`${path.dirname(info.path.slice(1))}/swlu_map.txt`);
		let data = fs.readFileSync(dataPath, 'utf-8');
		setTimeout(() => {
			panelPointer.webview.postMessage({ data });
			console.log(data)
		}, 2500)

	});
	context.subscriptions.push(disposable);
}
// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
