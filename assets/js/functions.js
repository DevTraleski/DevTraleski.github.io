$(document).ready(function(){

	let products = { 1:["Nefilim", 2000] ,
					 2:["Pegasus", 5000] ,
					 3:["SSH RCE", 1500] ,
					 4:["Stuxnet", 500] ,
					 5:["STJ Destroyer", 3000] ,
					 6:["Auto Meltdown", 6000]
				}

	storage = localStorage;
	let hard =  new Array()
	md5pass = "f47f2e23285cf03c61c43e3098a422bb"
	creds = "root" + md5pass
	md5creds = md5(creds)
	hard.push("root")
	hard.push(md5pass)
	storage.setItem(md5creds, JSON.stringify(hard))

	viewCart(products);

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
		if ($("#tPass").val() != $("#tRepeat").val()){
			alert("Senhas diferentes")
			return
		}

		let info = new Array()
		creds = $("#tLogin").val() + $("#tPass").val()
		md5pass = md5($("#tPass").val())
		md5creds = md5(creds)
		info.push($("#tLogin").val())
		info.push(md5pass)
		storage.setItem(md5creds, JSON.stringify(info))
		storage.setItem("user", $("#tLogin").val())

		$("#tLogin").val("")
		$("#tPass").val("")
		$("#tRepeat").val("")

		alert("Cadastrado")
	});

	$("#bCart1").click(function(){
		addToCart(1);
	});

	$("#bCart2").click(function(){
		addToCart(2);
	});

	$("#bCart3").click(function(){
		addToCart(3);
	});

	$("#bCart4").click(function(){
		addToCart(4);
	});

	$("#bCart5").click(function(){
		addToCart(5);
	});

	$("#bCart6").click(function(){
		addToCart(6);
	});
});

function addToCart(id) {
	if(storage.hasOwnProperty("user")){
		user = storage.getItem("user")
		if(storage.hasOwnProperty(user + "_cart")){
			carrinho = JSON.parse(storage.getItem(user + "_cart"))
			carrinho.push(id)
			storage.setItem(user + "_cart", JSON.stringify(carrinho))
		} else {
			let carrinho = new Array()
			carrinho.push(id)
			storage.setItem(user + "_cart", JSON.stringify(carrinho))
		}
	} else {
		alert("Faça o login ou se cadastre para adicionar ao carrinho")
	}

};

function viewCart(products) {
	if(storage.hasOwnProperty("user")){
		user = storage.getItem("user")
		if(storage.hasOwnProperty(user + "_cart")){
			carrinho = JSON.parse(storage.getItem(user + "_cart"))

			content = ""
			total = 0
			for(i = 0; i < carrinho.length; i++) {
				product = products[carrinho[i]]
				id = carrinho[i]
				name = product[0]
				price = product[1]
				total += price

				content += "<tr>"
                content += "<td> " + id + "</td>"
                content += "<td> " + name + "</td>"
                content += "<td> R$ " + price + "</td>"
                content += "</tr>"

			}

			content += "<tr><td colspan='2'>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Total: </th><td> R$ " + total + "</td></tr>"

			$("#tbContent").append(content)
		}
	}
}