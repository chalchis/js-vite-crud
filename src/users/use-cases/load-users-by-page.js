import { localhostUserToModel } from "../mappers/localhost-user-mapper";
import { apiCache } from "../models/api-cache";

export const loadUsersByPage = async ( page = 1 ) => {

	try
	{
		//url api
		const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${page}`;

		//solicitar los usuarios
		const response = await fetch(url);
		
		if (!response.ok)  
		{
			throw new Error('Failed to load users');
		}
			
		//data completa
		const res = await response.json();

		console.log(res);

		//crear un nuevo array de usuarios
		const usersData = res.data.map( user => localhostUserToModel(user) );

		//Actualiza el caché con valores crudos
        apiCache.items = res.items;
        apiCache.last = res.last;
        apiCache.pages = res.pages;

		//console.log('----Users loaded:', usersData);

		return usersData;
	}
	catch (error)
	{
		console.error('Error loading users:', error);
		throw error;
	}
};