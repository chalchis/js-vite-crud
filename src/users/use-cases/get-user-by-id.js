import { localhostUserToModel } from "../mappers/localhost-user-mapper";

export const getUserById = async ( id ) => {

	try
	{
		//url api
		const url = `${ import.meta.env.VITE_BASE_URL }/users/${id}`;

		//solicitar los usuarios
		const response = await fetch(url);
		
		if (!response.ok)  
		{
			throw new Error('Failed to load user');
		}
			
		//data completa
		const data = await response.json();

		//mapper
		const usersData = localhostUserToModel( data );

		console.log('----User loaded:', usersData);

		return usersData;
	}
	catch (error)
	{
		console.error('Error data user', error);
	}
};