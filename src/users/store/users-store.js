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

	const users = await loadUsersByPage( state.currenPage - 1 );

	//termina si no hay usuarios
	if ( users.length === 0 ) return;

	//termina si estamos en la primera pagina
	if ( state.currenPage <= 1 ) return;

	//actualizar
	state.currenPage = state.currenPage - 1;
	state.users = users;	
};

const onUserChange = () => {

	throw new Error('loadNextPage function not implemented');
};

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