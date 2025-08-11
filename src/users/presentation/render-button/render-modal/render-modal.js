import './render-modal.css';
// Importa el contenido HTML como un string literal, sin procesar
import modalHtml from './render-modal.html?raw';

let modalElement;
let dialogElement;

/**
 * 
 * @param {*} element 
 * @returns 
 */
//crear el dialog en el dom simplemente inicializado
export const renderModal = ( element ) => {

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
	setupModalEvents(dialogElement);
};

/**
 * 
 */
//poder mostrar el dialog desde otros archivos
export const showDialog = () => {

	//si no existe
	if (!dialogElement)  throw new Error('Dialog no ha sido renderizado. Llama a renderModal() primero.');
	
	//metodo nativo para mostrar un dialog
	dialogElement.showModal();
};

/**
 * 
 * @param {*} dialogElement 
 * @returns 
 */
//eventos del dialog
const setupModalEvents = ( dialogElement ) => {

	//si no existe
	if ( !dialogElement ) return;

	//referenciar desde el dialog
	const closeBtn = dialogElement.querySelector('.dialog-btn-close');
	const cancelBtn = dialogElement.querySelector('.dialog-btn-secondary');

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

		if (event.target === dialogElement && dialogElement.open)
		{
			//resetar inputs
			resetDialogInputs(dialogElement);

			//metodo nativo para cerrar un dialog
			dialogElement.close()
		}
	});
};

//resetear los campos del dialog
const resetDialogInputs = ( dialogElement ) => {

	// Inputs de texto
	dialogElement.querySelector('#firstName').value = '';
	dialogElement.querySelector('#lastName').value = '';
	dialogElement.querySelector('#balance').value = '';
};

