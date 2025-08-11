import { showDialog } from '../render-button/render-modal/render-modal';
import './render-add-button.css';

export const renderAddButton = ( element ) => {

	const fabButton = document.createElement('button');
	//fabButton.classList.add('fab-button');
	fabButton.className = 'fab-button'; // Usar className para agregar la clase CSS
	fabButton.innerText = '+';

	//agregar el botón al elemento
	element.append( fabButton);

	//eventos
	fabButton.addEventListener('click', () => {

		//mostrar el dialog
		showDialog();
	});
};