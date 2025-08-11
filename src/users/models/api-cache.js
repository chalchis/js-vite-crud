
class ApiCache 
{
	/*
	static instance no es una palabra reservada ni tiene un significado especial. 
	Es simplemente un nombre de propiedad estática que tú eliges 
	para implementar el patrón Singleton. 
	Podrías usar cualquier otro nombre válido, como _instance, singletonInstance
	Usa static para que pertenezca a la clase (no a las instancias).
	*/
	static instance;
	
	/**
	 * 
	 * @param {*} numItems 
	 * @param {*} last 
	 * @param {*} pages 
	 * @returns 
	 */
	constructor( numItems, last, pages ) 
	{
		// Singleton: Si ya existe una instancia, la retorna
		if (ApiCache.instance) return ApiCache.instance;
		
		// Define propiedades como en tu clase User
		this.items = numItems;
		this.last = last;
		this.pages = pages;
		
		// Guarda la instancia
		ApiCache.instance = this;
	}
}

// Exportamos la instancia única (inicializada vacía)
export const apiCache = new ApiCache();