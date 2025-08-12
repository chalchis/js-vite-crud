import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-button/render-button";
import { renderModal } from "./presentation/render-button/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";



//ponemos en mayusculas el nombre de la funcion para indicar que es la principal de la app
export const UsersApp = async( element ) => {

	element.innerHTML = `Cargando usuarios...`;

	await(usersStore.loadNextPage());

	element.innerHTML = ``;

	//console.log(usersStore.getUsers());
	//carga tabla con usuarios
	renderTable( element );

	//carga un boton en la UI paginacion
	renderButtons( element );

	//carga un boton en la UI para modar un modal
	renderAddButton( element );

	//carga el dialog en UI solo inicializa pero ya esta en el DOM
	renderModal( element, async( userLike ) => {

		const user = await saveUser( userLike );
	});
};