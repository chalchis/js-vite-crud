
import './render-table.css';
import usersStore from '../../store/users-store';
import { showDialog } from '../render-button/render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';


// Variable para almacenar la tabla
let table;

//funcion que crea la tabla y la devuelve
const createTable = () => {

	const tableElement = document.createElement('table');

	tableElement.className = 'custom-table'; // Asigna la clase CSS

	const tableHeader = document.createElement('thead');

	tableHeader.innerHTML = `
		<tr>
			<th>ID</th>
			<th>Avatar</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Active</th>
			<th>Actions</th>
		</tr>
	`;

	const tableBody = document.createElement('tbody');

	tableElement.append(tableHeader, tableBody);
	
	return tableElement
};

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {

	console.log('entra a render table');
	
	//usuarios que tenemos en el store
	const users = usersStore.getUsers();	
	
	//si no existe la tabla, crearla
	if ( !table )
	{
		//crear la tabla
		table = createTable();
		element.append(table);

		//eventos
		setupEventos( table );
	}
		
	let tableBody = '';

	console.log({users});
	
	//agregar los usuarios a la tabla
	for (const user of users) 
	{
		//crear una fila por cada usuario
		tableBody += `<tr>
			<td>${ user.id }</td>
			<td>
				<div class="avatar" style="background-image: url('https://i.pravatar.cc/300/${user.firstName}')"></div>
			</td>
			<td>${ user.firstName }</td>
			<td>${ user.lastName }</td>
			<td>
				${ user.isActive === true ? `<span class="active">Active</span>` : `<span class="inactive">Inactive</span>` }
			</td>
			<td>
				<a data-id="${ user.id }" class="edit-button">Edit</a> |
				<a data-id="${ user.id }" class="delete-button">Delete</a>
			</td>
		</tr>`;
	}

	//agregar el cuerpo a la tabla
	table.querySelector('tbody').innerHTML = tableBody;
};

/**
 * Configura los event listeners para los botones de la tabla.
 * @param {HTMLTableElement} table - La tabla a la que se le asignarán los eventos.
 */
const setupEventos = (table) => {

	//evento
	table.addEventListener('click', async(event) => {

		//destino
		const target = event.target;

		//elemento con atributo data-algo
		const id = target.getAttribute('data-id');

		if ( target.classList.contains('edit-button') ) 
		{
			console.log('Edit user with ID:', id);
			// Lógica para editar (ej: `usersStore.selectUserForEdit(id)`)

			//mostrar el dialog
			showDialog( id );
		}

		if ( target.classList.contains('delete-button') ) 
		{
			try
			{
				console.log('Delete user with ID:', id);
				
				await deleteUserById( id );

				await usersStore.reloadPage();

				//document.querySelector('#current-page').innerText = usersStore.getCurrentPage();

				renderTable();
			}
			catch(error)
			{
				console.error("Error al eliminar:", error);
			}
		}
	});
};

