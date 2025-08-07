
class ApiCache 
{
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