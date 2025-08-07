import { renderButtons } from "./presentation/render-button/render-button";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

//ponemos en mayusculas el nombre de la funcion para indicar que es la principal de la app
export const UsersApp = async( element ) => {

    element.innerHTML = `Cargando usuarios...`;

    await(usersStore.loadNextPage());

    element.innerHTML = ``;

    //console.log(usersStore.getUsers());
    renderTable( element );

    renderButtons( element );
};