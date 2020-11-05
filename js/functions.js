$(document).ready(function(){

	storage = localStorage;
	let hard =  new Array()
	md5pass = "f47f2e23285cf03c61c43e3098a422bb"
	creds = "root" + md5pass
	md5creds = md5(creds)
	hard.push("root")
	hard.push(md5pass)
	storage.setItem(md5creds, JSON.stringify(hard))

	$("#bLogin").click(function(){
		login = $("#tLogin").val()
		pass = $("#tPass").val()
		creds = login + pass
		md5creds = md5(creds)
		if(storage.hasOwnProperty(md5creds)){
			info = JSON.parse(storage.getItem(md5creds))
			storage.setItem("user", info[0])

			$("#tLogin").val("")
			$("#tPass").val("")

			alert("Logado")
		} else {
			alert("Login não reconhecido")
		}
	});

	$("#bRegister").click(function(){
		if ($("#tPass").val() === $("#tRepeat").val()){

			let info = new Array()
			creds = $("#tLogin").val() + $("#tPass").val()
			md5pass = md5($("#tPass").val())
			md5creds = md5(creds)
			info.push($("#tLogin").val())
			info.push(md5pass)
			storage.setItem(md5creds, JSON.stringify(info))

			$("#tLogin").val("")
			$("#tPass").val("")
			$("#tRepeat").val("")

			alert("Cadastrado")
		} else {
			alert("Senhas diferentes")
		}
	});

});
