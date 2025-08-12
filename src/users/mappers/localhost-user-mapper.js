import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localhostUserToModel = ( localhostUser ) => {

	const { 
		avatar,
		balance,
		first_name,
		gender,
		id,
		isActive,
		last_name
	} = localhostUser;
	
	//como las propiedades son iguales sentitizamos las propiedades es decir id:id, mejor solo id
	return new User({
		avatar,
		balance,
		firstName: first_name,
		gender,
		id,
		isActive,
		lastName: last_name,
	});
};