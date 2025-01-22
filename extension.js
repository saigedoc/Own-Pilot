// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


function getWebviewContent() {
	return `
<!DOCTYPE html>
<html lang="en">
<head>

    <style>

		input {
			border-color: rgb(41, 41, 41);
			border-radius: 7px;
			width: 60%;
		}

		h1 {
			width: 100%;
			white-space: pre-wrap;
			overflow-x: hidden;
			padding: 10px;
			word-wrap: break-word;
		}

		div {
			width: 100%;
		}

		input {
			height: 10%;
			width: 100%;
		}
		
		#responce_div {
			
			width: 45%;
			margin-right: auto;
			margin-left: 25px;
		}

		#responce {
			border: solid;
			border-width: 2px;
			border-color: rgb(41, 41, 41);
			border-radius: 10px;
			width: 100%;
			text-align: start;
		}

		#inputs_div {
			width: 45%;
			margin-left: auto;
			margin-right: 25px;
		}

		#inputs {
			border: solid;
			border-width: 2px;
			border-color: rgb(41, 41, 41);
			border-radius: 10px;
			width: 100%;
			text-align: start;
		}

		body {
			
		}

		#chat_area {
			overflow-y: scroll;
			overflow-x: hidden;
			height: 85vh;
			width: 100%;
		}
		
		#input_area {
			height: 15vh;
			width: 100%;
			margin-top: 0px;
			margin-bottom: auto;
		}
		
		textarea {
			height: 80%;
			width: 100%;
			margin: 0 auto;
			resize: none;
		}

    </style>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Pilot</title>
    <script>
		const vscode = acquireVsCodeApi();
        function send(msg) {
            if(event.key === 'Enter') {
                var i = document.createElement("h1");
                var chatArea = document.getElementById("chat_area");
				var d_i = document.createElement("div");
                d_i.id = "inputs_div";
				i.id = "inputs"
                i.textContent = msg.value;
				d_i.appendChild(i);
                chatArea.appendChild(d_i);

                vscode.postMessage({
                    command: 'send',
                    text: msg.value
                });
            }
        }

        window.addEventListener('message', event =>{
            const message = event.data;
            switch (message.command) {
                case 'responce':
                    var r = document.createElement("h1");
                    var chatArea = document.getElementById("chat_area");
					var d_r = document.createElement("div");
                    d_r.id = "responce_div";
					r.id = "responce"
                    r.textContent = message.text;
                    d_r.appendChild(r);
                    chatArea.appendChild(d_r);
                    break;
            }
        })

    </script>
</head>
<body>
    <div id="chat_area" >
        <div id="responce_div"> <h1 id="responce">Ask me something.</h1> </div>
    </div>
    <div id="input_area">
    	<textarea type="text" class="send" onkeydown="send(this)"></textarea>
	</div>
</body>
</html>`;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "LocalOllamaPilot" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('LocalOllamaPilot.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		//vscode.window.showErrorMessage("test");
		
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.Active,
			{
			  enableScripts: true
			}
		);
	
		panel.webview.html = getWebviewContent();
		//panel.webview.postMessage({ command: 'refactor' });
		panel.webview.postMessage({ command: 'responce', text: 'test0' });
		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'send':
						panel.webview.postMessage({ command: 'responce', text: message.text });
				  		return;
			  	}
			},
			undefined,
			context.subscriptions
		);

		//mypanel.webview.html = "HellowWorld"
		//vscode.window.showInformationMessage(mybox.value);
	});
	
	context.subscriptions.push(disposable);
	
	
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
