
/**
 * 
 * @param {String|Number} id 
 * @returns 
 */
export const deleteUserById = async( id ) => {

	const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;	
	
	const response = await fetch(url, {
		method: 'DELETE', //GET, POST, PUT, DELETE, etc.
		//mode: 'same-origin', // no-cors, cors, *same-origin
		//credentials: 'same-origin', // include, same-origin, *omit
		cache: 'no-cache', //default, no-cache, reload, force-cache, only-if-cached
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer' //client, no-referrer
	});

	//verificar respuesta
	if ( !response.ok )
	{
		throw new Error(`Error: ${response.status}`);
	}

	const deleteResultado = await response.json();

	console.log(`borrado resultado ${ deleteResultado }`);
	
	return true;
};