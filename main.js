let nombre = document.getElementById("nombre");
let glucemia = document.getElementById("glucemia");
let presion = document.getElementById("presion");
let medicamentos = document.getElementById("medicamentos");
let cantMedicamentos = document.getElementById("cantMedicamentos");
let btnSiguiente = document.getElementById("btnSiguiente");
let divMedicamentos = document.getElementById("divMedicamentos");
let infoUsuario = [];
let pantalla2 = document.getElementById("pantalla2");
let medicionGlucemia = document.getElementById("medicionGlucemia");
let medicionPresion = document.getElementById("medicionPresion");
let medicamentoATildar = document.getElementById("medicamentoATildar");
let detalleFecha = document.getElementById("detalleFecha");
let detalleGlucemia = document.getElementById("detalleGlucemia");
let detallePresion = document.getElementById("detallePresion");
let detalleMedicamentos = document.getElementById("detalleMedicamentos");
let divNombreMedicamentos = document.getElementById("divNombreMedicamentos");
let pantallaMedicamentos = document.getElementById("pantallaMedicamentos");
let listaDeMediciones = document.getElementById("listaDeMediciones");
let valorFecha = document.getElementById("valorFecha");

//Definiendo Fecha
let fecha = new Date();
let año = fecha.getFullYear();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate();
let fechaHoy;
if (mes < 10) {
	fechaHoy = año + "-0" + mes + "-" + dia;
} else {
	fechaHoy = año + "-" + mes + "-" + dia;
}
valorFecha.value = fechaHoy;

//Inicio
let usuario = JSON.parse(localStorage.getItem("Usuario"));
let mediciones = JSON.parse(localStorage.getItem("Mediciones"));
console.log("medicones: " + mediciones);
if (!mediciones) {
	mediciones = [];
	mediciones[0] = "sin medicion";
	console.log("medicones: " + mediciones);
}

let medicamentosStore = JSON.parse(localStorage.getItem("Medicamentos"));
let pantalla1 = document.getElementById("pantalla1");
Pantalla2();

//PANTALLA 1
btnSiguiente.addEventListener("click", () => {
	infoUsuario[0] = nombre.value;
	infoUsuario[1] = glucemia.checked;
	infoUsuario[2] = presion.checked;
	infoUsuario[3] = medicamentos.checked;
	infoUsuario[4] = cantMedicamentos.value;
	console.log(infoUsuario);
	localStorage.setItem("Usuario", JSON.stringify(infoUsuario));
	usuario = JSON.parse(localStorage.getItem("Usuario"));
	if (medicamentos.checked === true) {
		pantallaMedicamentos.style.display = "block";
		pantalla1.style.display = "none";
		DetallesMedicamentos(cantMedicamentos.value);
	} else {
		Pantalla2();
	}
});

medicamentos.addEventListener("change", Medicamentos);

function Medicamentos() {
	if (medicamentos.checked === true) {
		console.log("estamos en medicamentos");
		divMedicamentos.style.display = "block";
	} else {
		divMedicamentos.style.display = "none";
		cantMedicamentos.value = "";
	}
}

//PANTALLA 2

listaDeMediciones.addEventListener("click", AbrirDetalleDeMediciones);

function AbrirDetalleDeMediciones(e) {
	console.log(e.target.getAttribute("data-info"));
	if (e.target.getAttribute("data-info") == "detalle") {
		let ubicacionDeLaMedicion = e.target.getAttribute("data-detalle-medicion");
		crearModalDetalle(ubicacionDeLaMedicion);
	}
}

function crearModalDetalle(num) {
	detalleFecha.innerHTML = ``;
	let p0 = document.createElement("p");
	p0.appendChild(document.createTextNode("Fecha: " + mediciones[num][0]));
	detalleFecha.appendChild(p0);
	if (usuario[1] === true) {
		detalleGlucemia.innerHTML = ``;
		let p1 = document.createElement("p");
		p1.appendChild(document.createTextNode("Glucemia: " + mediciones[num][1]));
		detalleGlucemia.appendChild(p1);
	}
	if (usuario[2] === true) {
		detallePresion.innerHTML = ``;
		let p2 = document.createElement("p");
		p2.appendChild(document.createTextNode("Presión: " + mediciones[num][2]));
		detallePresion.appendChild(p2);
	}
	if (usuario[3] === true) {
		detalleMedicamentos.innerHTML = ``;
		medicamentosStore = JSON.parse(localStorage.getItem("Medicamentos"));
		let pMedicamentos = document.createElement("h5");
		pMedicamentos.appendChild(document.createTextNode("Medicamentos: "));
		detalleMedicamentos.appendChild(pMedicamentos);
		for (let j = 0; j < usuario[4]; j++) {
			if (mediciones[num][3 + j] === true) {
				let li = document.createElement("li");
				detalleMedicamentos.appendChild(li);
				let divColor = document.createElement("div");
				divColor.classList.add("colorpastillas");
				divColor.style.backgroundColor = medicamentosStore[j * 2 + 1];
				li.appendChild(divColor);
				let p3 = document.createElement("p");

				li.appendChild(p3);
				p3.appendChild(document.createTextNode(medicamentosStore[j * 2]));
			}
		}
	}
}

function crearPantallaDeMediciones() {
	listaDeMediciones.innerHTML = ``;
	mediciones = JSON.parse(localStorage.getItem("Mediciones"));
	for (let i = 0; i < mediciones.length; i++) {
		let button = document.createElement("button");
		button.classList.add("list-group-item");
		button.classList.add("list-group-item-action");
		button.setAttribute("data-bs-target", "#ModalDetalleDeMediciones");
		button.setAttribute("data-bs-toggle", "modal");
		button.setAttribute("data-info", "detalle");
		button.setAttribute("data-detalle-medicion", i);
		let fecha = document.createElement("h5");
		fecha.appendChild(document.createTextNode(mediciones[i][0]));
		button.appendChild(fecha);
		let hr = document.createElement("hr");
		button.appendChild(hr);
		let divPresionYGlucemia = document.createElement("div");
		divPresionYGlucemia.setAttribute("data-info", "detalle");
		divPresionYGlucemia.setAttribute("data-detalle-medicion", i);
		divPresionYGlucemia.classList.add("presionyglucemia");
		let divMedicamentosyPastillas = document.createElement("div");
		divMedicamentosyPastillas.setAttribute("data-info", "detalle");
		divMedicamentosyPastillas.setAttribute("data-detalle-medicion", i);
		divMedicamentosyPastillas.classList.add("medicamentosypastillas");
		if (usuario[1] === true) {
			let p1 = document.createElement("p");
			p1.appendChild(document.createTextNode("Glucemia: " + mediciones[i][1]));
			button.appendChild(divPresionYGlucemia);
			divPresionYGlucemia.appendChild(p1);
			p1.setAttribute("data-info", "detalle");
			p1.setAttribute("data-detalle-medicion", i);
		}
		if (usuario[2] === true) {
			let p2 = document.createElement("p");
			p2.appendChild(document.createTextNode("Presión: " + mediciones[i][2]));
			divPresionYGlucemia.appendChild(p2);
			if (usuario[1] !== true) {
				button.appendChild(divPresionYGlucemia);
			}
			p2.setAttribute("data-info", "detalle");
			p2.setAttribute("data-detalle-medicion", i);
		}
		if (usuario[3] === true) {
			medicamentosStore = JSON.parse(localStorage.getItem("Medicamentos"));
			let p3 = document.createElement("p");
			p3.appendChild(document.createTextNode("Medicamentos: "));
			button.appendChild(divMedicamentosyPastillas);
			divMedicamentosyPastillas.appendChild(p3);
			p3.setAttribute("data-info", "detalle");
			p3.setAttribute("data-detalle-medicion", i);
			for (let j = 0; j < usuario[4]; j++) {
				if (mediciones[i][3 + j] === true) {
					let divColor = document.createElement("div");
					divColor.classList.add("colorpastillas");
					divColor.style.backgroundColor = medicamentosStore[j * 2 + 1];
					divColor.setAttribute("data-info", "detalle");
					divColor.setAttribute("data-detalle-medicion", i);
					divMedicamentosyPastillas.appendChild(divColor);
				}
			}
		}
		listaDeMediciones.appendChild(button);
	}
}
function Pantalla2() {
	if (usuario) {
		pantalla1.style.display = "none";
		pantallaMedicamentos.style.display = "none";
		pantalla2.style.display = "block";
		if (usuario[1] === true) {
			medicionGlucemia.style.display = "block";
			detalleGlucemia.style.display = "block";
		}
		if (usuario[2] === true) {
			medicionPresion.style.display = "block";
			detallePresion.style.display = "block";
		}
		if (usuario[3] === true) {
			medicamentoATildar.style.display = "block";
			detalleMedicamentos.style.display = "block";
			let medicamentosStore = JSON.parse(localStorage.getItem("Medicamentos"));
			if (!medicamentosStore) {
				pantalla2.style.display = "none";
				pantallaMedicamentos.style.display = "block";
				DetallesMedicamentos(usuario[4]);
			} else {
				CrearMedicamentosModal(medicamentosStore);
			}
		}
		if (!mediciones) {
			mediciones = JSON.parse(localStorage.getItem("Mediciones"));
		}
		if (mediciones[0] !== "sin medicion") {
			crearPantallaDeMediciones();
		}
	}
}

//PANTALLA Modal Cargar Medicamentos
let guardarMediciones = document.getElementById("guardarMediciones");

guardarMediciones.addEventListener("click", GuardarMediciones);

function GuardarMediciones() {
	let medicion = [];
	let valorGlucemia = document.getElementById("valorGlucemia");
	let valorPresion = document.getElementById("valorPresion");
	medicion[0] = valorFecha.value;
	if (usuario[1] === true) {
		if (valorGlucemia.value === "") {
			valorGlucemia.value = "N/A";
		}
		medicion[1] = valorGlucemia.value;
		valorGlucemia.value = "";
	} else {
		medicion[1] = false;
	}
	if (usuario[2] === true) {
		if (valorPresion.value === "") {
			valorPresion.value = "N/A";
		}
		medicion[2] = valorPresion.value;
		valorPresion.value = "";
	} else {
		medicion[2] = false;
	}
	if (usuario[3] === true) {
		for (let i = 0; i < usuario[4]; i++) {
			let tomoMedicamento = document.getElementById("tomoMedicamento" + i);
			medicion[3 + i] = tomoMedicamento.checked;
		}
	}
	console.log(medicion);
	if (mediciones[0] === "sin medicion") {
		mediciones[0] = medicion;
		console.log("primera medicion " + medicion);
		console.log(mediciones);
		localStorage.setItem("Mediciones", JSON.stringify(mediciones));
		mediciones = JSON.parse(localStorage.getItem("Medicamentos"));
	} else {
		console.log("mas mediciones");
		mediciones.push(medicion);
		localStorage.setItem("Mediciones", JSON.stringify(mediciones));
		mediciones = JSON.parse(localStorage.getItem("Medicamentos"));
	}
	Pantalla2();
}
function CrearMedicamentosModal(medicamentos) {
	medicamentoATildar.innerHTML = ``;
	let lu = document.createElement("lu");
	medicamentoATildar.appendChild(lu);

	for (let i = 0; i < medicamentos.length; i = i + 2) {
		let li = document.createElement("li");
		let input = document.createElement("input");
		li.appendChild(input);
		input.setAttribute("type", "checkbox");
		input.classList.add("form-check-input");
		input.setAttribute("id", "tomoMedicamento" + i / 2);
		let h4 = document.createElement("h4");
		h4.appendChild(document.createTextNode(medicamentos[i]));
		let divColor = document.createElement("div");
		divColor.classList.add("colorpastillas");
		divColor.style.backgroundColor = medicamentos[i + 1];
		lu.appendChild(li);
		li.appendChild(h4);
		li.appendChild(divColor);
	}
}

//PANTALLA Medicamentos

let finalizarMedicamento = document.getElementById("finalizarMedicamento");
finalizarMedicamento.addEventListener("click", FinalizarMedicamentos);

function DetallesMedicamentos(cantMedicamentos) {
	let lu = document.createElement("lu");
	divNombreMedicamentos.appendChild(lu);
	for (let i = 0; i < cantMedicamentos; i++) {
		let li = document.createElement("li");
		let h3 = document.createElement("h3");
		lu.appendChild(li);
		li.appendChild(h3);
		h3.appendChild(document.createTextNode(i + 1 + ":"));
		let input = document.createElement("input");
		li.appendChild(input);
		input.setAttribute("id", "medicamento" + i);
		let inputColor = document.createElement("input");
		inputColor.setAttribute("id", "medicamentoColor" + i);
		inputColor.setAttribute("type", "color");
		inputColor.setAttribute(
			"value",
			"#" +
				Math.floor(Math.random() * 16).toString(16) +
				Math.floor(Math.random() * 16).toString(16) +
				Math.floor(Math.random() * 16).toString(16) +
				Math.floor(Math.random() * 16).toString(16) +
				Math.floor(Math.random() * 16).toString(16) +
				Math.floor(Math.random() * 16).toString(16)
		);
		inputColor.classList.add("inputcolor");
		li.appendChild(inputColor);
		console.log("medicamentos papa");
	}
	console.log("DetallesMedicamentos");
}

function FinalizarMedicamentos() {
	console.log("FinalizarMedicamentos");
	let medicamentos = [];
	for (let i = 0; i < usuario[4]; i++) {
		let medicamento = document.getElementById("medicamento" + i);
		let color = document.getElementById("medicamentoColor" + i);
		console.log(medicamento);
		console.log(medicamento.value);
		medicamentos.push(medicamento.value);
		medicamentos.push(color.value);
	}

	localStorage.setItem("Medicamentos", JSON.stringify(medicamentos));
	Pantalla2();
}
