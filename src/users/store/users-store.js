import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {	
	currenPage: 0,
	users: [],
};

const loadNextPage = async () => {

	const users = await loadUsersByPage( state.currenPage + 1 );

	//termina si no hay usuarios
	if ( users.length === 0 ) return;
	
	//actualizar
	state.currenPage = state.currenPage + 1;
	state.users = users;
};

const loadPreiousPage = async () => {

	//termina si estamos en la primera pagina
	if ( state.currenPage <= 1 ) return;

	//cargar usuarios
	const users = await loadUsersByPage( state.currenPage - 1 );

	//termina si no hay usuarios
	if ( users.length === 0 ) return;

	//actualizar
	state.currenPage = state.currenPage - 1;
	state.users = users;	
};

//al haber una edicion
const onUserChange = ( updateUser ) => {

	let wasFound = false;

	//recorremos los usuarios que en este momento tiene users y
	//volvemos a llenar users del objeto state
	state.users = state.users.map( user => {

		//comparar
		if ( user.id === updateUser.id )
		{
			//bandera
			wasFound = true;

			//data
			return updateUser;
		}

		//data
		return user;
	});

	//cada pagina muestra 10 usuarios
	//si tenemos < de 10 podriamos añadir ese usuario y la tabla podra mostrar un registro mas
	//es decir si se tienen 8 registros visibles ya seran nueve
	if ( state.users.length < 10 && wasFound )
	{
		state.users.push( updateUser );
	}

};

//------------------------
const reloadPage = async () => {

};

export default { 
	state,
	reloadPage,
	onUserChange,
	loadPreiousPage,
	loadNextPage,
	getUsers: () => [...state.users],//se crea un nuevo array con los mismos elementos
	getCurrentPage: () => state.currenPage,    
};