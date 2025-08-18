import { User } from "../models/user";
import { userModelToLocalhost } from "../mappers/user-to-localhost-mapper";
import { localhostUserToModel } from "../mappers/localhost-user-mapper";

/**
 * 
 * @param {*} userLike 
 */
export const saveUser = async( userLike ) => {

	//instancia
	const user = new User( userLike );

	//validamos
	if ( !user.firstName || !user.lastName ) throw 'Campos Vacios';

	//mapper
	const userToSave = userModelToLocalhost( user );

	let userUpdated;

	//verificamos si estamos editando al tener un id
	if ( user.id )
	{
		console.log('update');

		//si pasa por aca es para actualizar el usuario
		userUpdated = await updateUser( userToSave );

		console.log({algo: userUpdated});
	}
	else
	{
		//si pasa por aca es para crear un nuevo usuario 
		userUpdated = await createUser ( userToSave );
	}

	return localhostUserToModel( userUpdated );
};

/**
 * 
 */
//funcion crear usuario
const createUser = async( data ) => {

	const url = `${ import.meta.env.VITE_BASE_URL }/users`;
	
	try
	{
		const response = await fetch(url, {
			method: 'POST', //GET, POST, PUT, DELETE, etc.
			//mode: 'same-origin', // no-cors, cors, *same-origin
			//credentials: 'same-origin', // include, same-origin, *omit
			cache: 'no-cache', //default, no-cache, reload, force-cache, only-if-cached
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', //client, no-referrer
			headers: { 
				Accept: 'application/json', 'Content-Type': 'application/json' 
			},
			body: JSON.stringify(data) // must match 'Content-Type' header
		});

		//verificar respuesta
		if ( !response.ok ) 
		{
			throw new Error(`Error: ${response.status}`);
		}

		const newUser = await response.json();

		console.log({nuevo: newUser});

		return newUser;
	}
	catch(error)
	{
		console.error('Error al enviar los datos:', error);
	}
};

//actualizar usuario
const updateUser = async( user ) => {

	const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;

	console.log({actualizado: user});

	try
	{
		const response = await fetch(url, {
			method: 'PATCH', //GET, POST, PUT, DELETE, etc.
			//mode: 'same-origin', // no-cors, cors, *same-origin
			//credentials: 'same-origin', // include, same-origin, *omit
			cache: 'no-cache', //default, no-cache, reload, force-cache, only-if-cached
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', //client, no-referrer
			headers: { 
				Accept: 'application/json', 'Content-Type': 'application/json' 
			},
			body: JSON.stringify(user) // must match 'Content-Type' header
		});

		//verificar respuesta
		if ( !response.ok ) 
		{
			throw new Error(`Error: ${response.status}`);
		}

		const updUser = await response.json();

		console.log(updUser);

		return updUser;
	}
	catch(error)
	{
		console.error('Error al actualizar los datos:', error);
	}
};