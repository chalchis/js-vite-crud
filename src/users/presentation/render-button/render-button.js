import './render-button.css';
import usersStore from "../../store/users-store";
import { renderTable } from '../render-table/render-table';
import { apiCache } from '../../models/api-cache';

//botones paginacion
export const renderButtons = ( element ) => {

	//button
	const nextButton = document.createElement('button');
	nextButton.innerText = 'Next >';

	//button
	const prevButton = document.createElement('button');
	prevButton.innerText = '< Prev';

	//pagina actual
	const currentPageLabel = document.createElement('span');
	currentPageLabel.id = 'current-page';
	currentPageLabel.innerHTML = usersStore.getCurrentPage();

	// Crea un contenedor específico para los botones
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'pagination-container'; // Clase para CSS

	//agregar los botones al elemento
	buttonsContainer.append(prevButton, currentPageLabel, nextButton);
	element.append(buttonsContainer);

	//--------------------------------------------------------------------

	//evento click del boton next
	nextButton.addEventListener('click', async () => {

		console.log(apiCache.pages);
		console.log(usersStore.getCurrentPage());

		//verificar si hay mas paginas
		if ( usersStore.getCurrentPage() < apiCache.pages )
		{
			await usersStore.loadNextPage();
			currentPageLabel.innerText = usersStore.getCurrentPage();
			renderTable(element);
		}
	});

	//--------------------------------------------------------------------

	//evento click del boton prev
	prevButton.addEventListener('click', async () => {

		//verificar si hay paginas anteriores
		if ( usersStore.getCurrentPage() > 1 )
		{
			await usersStore.loadPreiousPage();
			currentPageLabel.innerText = usersStore.getCurrentPage();
			renderTable(element);
		}
	});
};