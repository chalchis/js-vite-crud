
import './render-table.css';
import usersStore from '../../store/users-store';


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
			<th>FirtsName</th>
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

	let tableBody = '';

	//usuarios que tenemos en el store
	const users = usersStore.getUsers();	

	//si no existe la tabla, crearla
	if ( !table )
	{
		//crear la tabla
		table = createTable();
		element.append(table);
	}

	//agregar los usuarios a la tabla
	for (const user of users) 
	{
		//crear una fila por cada usuario
		tableBody += `<tr>
			<td>${ user.id }</td>
			<td>
				<div class="avatar" style="background-image: url('https://i.pravatar.cc/300/${user.firtsName}')"></div>
			</td>
			<td>${ user.firtsName }</td>
			<td>${ user.lastName }</td>
			<td>
				${ user.isActive ? `<span class="active">Active</span>` : `<span class="inactive">Inactive</span>` }
			</td>
			<td>
				<a href="#/edit/${user.id}" class="edit-button">Edit</a> |
				<a href="#/delete/${user.id}" class="delete-button">Delete</a>
			</td>
		</tr>`;
	}

	//agregar el cuerpo a la tabla
	table.querySelector('tbody').innerHTML = tableBody;
};

