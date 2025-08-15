import './render-modal.css';
// Importa el contenido HTML como un string literal, sin procesar
import modalHtml from './render-modal.html?raw';
import { getUserById } from '../../../use-cases/get-user-by-id';

let modalElement;
let dialogElement;
let loadedUser = {};

/**
 * 
 * @param {*} element 
 * @returns 
 */
//crear el dialog en el dom simplemente inicializado
export const renderModal = ( element, callback ) => {

	//si ya existe el modal, no lo volvemos a crear
	if ( modalElement ) return;

	//crear un div contenedor
	modalElement = document.createElement('div');

	//anexar el html template
	modalElement.innerHTML = modalHtml;
	
	//no incluir el div contenedor al elemento
	element.append(modalElement.firstChild);

	//referenciamos elementos en memoeria
	dialogElement = document.getElementById('myDialog');
	
	//eventos inicializa
	setupModalEvents(dialogElement, callback);
};

/**
 * 
 * @param {String|Number} id 
 */
//poder mostrar el dialog desde otros archivos
export const showDialog = async( id ) => {

	loadedUser = {};

	//si no existe
	if (!dialogElement)  throw new Error('Dialog no ha sido renderizado. Llama a renderModal() primero.');

	//si hay id
	if ( id )
	{
		const user = await getUserById( id );

		console.log(user);

		console.log(dialogElement);
		
		//llenar los campos
		fillDialogInputs(dialogElement, user);
	}
	
	//metodo nativo para mostrar un dialog
	dialogElement.showModal();
};

/**
 * 
 * @param {*} dialogElement 
 * @returns 
 */
//eventos del dialog
const setupModalEvents = ( dialogElement, callback ) => {

	//si no existe
	if ( !dialogElement ) return;

	//referenciar desde el dialog
	const closeBtn = dialogElement.querySelector('.dialog-btn-close');
	const cancelBtn = dialogElement.querySelector('.dialog-btn-secondary');
	const formDialog = dialogElement.querySelector('form');

	//evento-----------------------------------------------------------

	// Cerrar diálogo
	closeBtn.addEventListener('click', (event) => {

		//resetar inputs
		resetDialogInputs(dialogElement);
		
		//metodo nativo para cerrar un dialog
		dialogElement.close();
	});

	//evento-----------------------------------------------------------

	// Cancelar diálogo
	cancelBtn.addEventListener('click', (event) => {

		//resetar inputs
		resetDialogInputs(dialogElement);
		
		//metodo nativo para cerrar un dialog
		dialogElement.close();
	});

	//evento-----------------------------------------------------------

	// Evento cancel es nativo para los dialog o usando esc
	dialogElement.addEventListener('cancel', (event) => {

		//resetar inputs
		resetDialogInputs(dialogElement);
	});

	//evento-----------------------------------------------------------

	//hacer click fuera del dialog
	dialogElement.addEventListener('click', (event) => {
		
		// 1. El clic fue directamente en el elemento <dialog> (no en sus hijos) y
		// 2. El diálogo está actualmente abierto como modal
		if (event.target === dialogElement && dialogElement.open)
		{
			//resetar inputs
			resetDialogInputs(dialogElement);

			//metodo nativo para cerrar un dialog
			dialogElement.close();
		}
	});

	//evento-----------------------------------------------------------

	//evitar submit
	formDialog.addEventListener('submit', async(event) => {

		console.log({antes: loadedUser});

		//evitar submit
		event.preventDefault();

		try
		{
			//data del form
			const formData = new FormData( formDialog );

			const formDataObject = Object.fromEntries(formData.entries());
			
			// Asegurar que isActive sea booleano
  			formDataObject.isActive = formData.has('isActive'); // true si está marcado, false si no
			
			console.log('Datos del formulario:', formDataObject);
			
			//guadar los elementos del form
			const userLike = { ...loadedUser };	

			//iterar los elementos encontrados y destructuramos
			for (const [key, value] of Object.entries(formDataObject))
			{
				if ( key === 'balance')
				{
					//guardamos en el objeto userLike
					userLike[key] = +value;//lo vuelve numero

					continue;
				}

				// if ( key === 'isActive' )
				// {
				// 	console.log({checkbox:value});

				// 	//guardamos en el objeto userLike
				// 	userLike[key] = (value === 'true') ? true : false;

				// 	continue;
				// }

				userLike[key] = value;
			}

			console.log({despues: userLike});
			
			//Esperar la operación asíncrona (API, base de datos, etc.)
			const resultado = await callback(userLike)

			//Si todo sale bien, limpiar y cerrar
			resetDialogInputs(dialogElement);
			
			dialogElement.close();
		}
		catch(error)
		{
			//Manejo de errores
			console.error('Error:', error);	
		}
	});
};

//para rellenas los campos en el dialog
const fillDialogInputs = ( dialogElement, user ) => {

	//si no existen
	if (!dialogElement || !user) return;

	// Mapear los campos del usuario a los IDs de los inputs del modal
	const inputs = {
		firstName: dialogElement.querySelector('#firstName'),
		lastName: dialogElement.querySelector('#lastName'),
		balance: dialogElement.querySelector('#balance'),
		isActive: dialogElement.querySelector('#isActive'),
	};

	// Asignar valores (si el campo existe en el usuario y en el modal)
	if (inputs.firstName && user.firstName) inputs.firstName.value = user.firstName;
	if (inputs.lastName && user.lastName) inputs.lastName.value = user.lastName;
	if (inputs.balance && user.balance) inputs.balance.value = user.balance;
	if (inputs.isActive && user.isActive !== undefined) 
	{
		console.log('fill campos' + user.isActive);
		//inputs.isActive.value = user.isActive;
		inputs.isActive.checked = Boolean(user.isActive); // Asegurar que es booleano
	}

	console.log({loaderEdit: user});
	loadedUser = user
};

//resetear los campos del dialog
const resetDialogInputs = ( dialogElement ) => {

	// Inputs de texto
	dialogElement.querySelector('#firstName').value = '';
	dialogElement.querySelector('#lastName').value = '';
	dialogElement.querySelector('#balance').value = '';
	dialogElement.querySelector('#isActive').checked = false;
};

