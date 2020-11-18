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
	autofill();
	welcome();

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

	$("#bMaps1").click(function(){
		window.location.replace("maps.html");
	});

	$("#bMaps2").click(function(){
		window.location.replace("maps.html");
	});

	$("#bFinish").click(function(){
		if(storage.hasOwnProperty("user")){
			user = storage.getItem("user")
			if(storage.hasOwnProperty(user + "_cart")){
				window.location.replace("compras.html");
			} else {
				alert("É necessário ter algo no carrinho, vá as compras!")
			}
		} else {
			alert("Faça o login ou se cadastre para usar o carrinho")
		}
	});

	$("#bBuy").click(function(){
		if($("#tName").val() == '' || $("#tSurname").val() == '' || $("#tEmail").val() == '' || $("#tAddr").val() == '' || $("#tCpf").val() == '' || $("#tCvv").val() == '' || $("#tCcname").val() == '' || $("#tCcnumber").val() == ''){
			alert("Preencha todos os campos")
		} else {
			if($("#pType").val() == "noOpt") {
				alert("Selecione uma opção de pagamento")
			} else {
				user = storage.getItem("user")

				if ($('#savecc').is(":checked")) {
					storage.setItem(user + "_cc", $("#tCcname").val() + ":" + $("#tCcnumber").val() + ":" + $("#tCvv").val())
				}

				storage.removeItem(user + "_cart")
				alert("Compra realizada!")
				window.location.replace("index.html");
			}
		}
	});
});

var mapa;

function initMap() {

  var configuracoes = {
    center: {lat: 25.0000188, lng: -71.0087548},
    zoom: 4
  }
      
  mapa = new google.maps.Map(document.getElementById('map'), configuracoes);

  var marcador = new google.maps.Marker({
    position: {lat: 25.0000188, lng: -71.0087548},
    title: "-1 Day Store - Triangulo das Bermudas",
    map: mapa
  });

  var marcador2 = new google.maps.Marker({
    position: {lat: 17.7500199, lng: 142.4912452},
    title: "-1 Day Store - Fossa das Marianas",
    map: mapa
  });

  var marcador3 = new google.maps.Marker({
    position: {lat: 55.5815245, lng: 36.825138},
    title: "-1 Day Store - Moscow",
    map: mapa
  });
}

function addToCart(id) {
	if(storage.hasOwnProperty("user")){
		user = storage.getItem("user")
		if(storage.hasOwnProperty(user + "_cart")){
			carrinho = JSON.parse(storage.getItem(user + "_cart"))
			carrinho.push(id)
			storage.setItem(user + "_cart", JSON.stringify(carrinho))
			alert("Adicionado")
		} else {
			let carrinho = new Array()
			carrinho.push(id)
			storage.setItem(user + "_cart", JSON.stringify(carrinho))
			alert("Adicionado")
		}
	} else {
		window.location.replace("login.html");
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

function autofill(){
	if(storage.hasOwnProperty("user")){
		user = storage.getItem("user")
		if(storage.hasOwnProperty(user + "_cc")){
			ccinfo = storage.getItem(user + "_cc")
			ccArray = ccinfo.split(":")
			$("#tCcname").val(ccArray[0])
			$("#tCcnumber").val(ccArray[1])
			$("#tCvv").val(ccArray[2])
		}
	}
}

function welcome() {
	if(storage.hasOwnProperty("user")){
		user = storage.getItem("user")
		if (user != "root") {
			$("#logintitle").html(" Bem-vindo " + user)
		} else {
			$("#logintitle").html(" BCS{EsSa_fl4g_FoI_D3b0a}")
		}
	} else {
		$("#logintitle").html(" Login")
	}
}