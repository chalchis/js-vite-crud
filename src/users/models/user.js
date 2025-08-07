
//esta clase es una respresentacion de un usuario en la base de datos seria la data que se guarda en la base de datos
/*
Esta clase User es un "espejo" de cómo se estructura la información de un usuario en la base de datos. Es decir:

En la base de datos (como MySQL, MongoDB, etc.), los usuarios tienen datos guardados en tablas o documentos (ej: nombre, email, contraseña).

En el código (JavaScript), la clase User es la manera de representar esos mismos datos como un objeto para manipularlos fácilmente.

Imagina que tienes una tabla en una base de datos llamada usuarios con estas columnas:

id	nombre	email	edad
1	"Ana"	"ana@mail.com"	25

En JavaScript, la clase User sería la traducción de esa tabla a código:

export class User {
	constructor(id, nombre, email, edad) {
		this.id = id;         // Representa la columna "id"
		this.nombre = nombre; // Representa la columna "nombre"
		this.email = email;   // Representa la columna "email"
		this.edad = edad;     // Representa la columna "edad"
	}
}

*/
export class User 
{
	/**
	 * 
	 * @param {Like<User>} userData 
	 */
	constructor( userData)
	{
		// Destructuración del objeto userData
		const {	id, isActive, balance, avatar, firtsName, lastName, gender } = userData;
		
		// Asignación de propiedades a la instancia
		this.id			= id;
		this.isActive	= isActive;
		this.balance	= balance;
		this.avatar		= avatar;
		this.firtsName	= firtsName;
		this.lastName 	= lastName;
		this.gender		= gender;
	}
}