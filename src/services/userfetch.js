
//Data of server API
const genericUrl = "https://playground.4geeks.com/contact";
const user = "david"

//Function Post Create User if there is not on the API DB.
const postCreateUser = async () => {
	try {
		const response = await fetch(`${genericUrl}/agendas/${user}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		})
		console.log("Creando Usuario:", user)
		const data = await response.json();
		console.log("Creado el Usuario:", data.slug, "con el ID", data.id);
		FetchGetContacts();

	} catch (error) {
		console.error('Error al crear el usuario', error);
	}
}

//Function Get Contacts from API DB
export const FetchGetContacts = async () => {
	try {
		const response = await fetch(`${genericUrl}/agendas/${user}`);
		const data = await response.json();

		if (response.ok) {
			return data.contacts;
		} else {
			console.log("No existe el usuario.");
			postCreateUser();
			return [];
		}


	} catch (error) {
		console.error('Error al obtener los datos de la API', error)
		return [];
	}
}

//Function Delete from ID on the DB
export const FetchDeleteContact = async (id) => {
	try {
		const response = await fetch(`${genericUrl}/agendas/${user}/contacts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			console.log("error al ejecutar el borrado")
		};
		return true;
	} catch (error) {
		console.log('Error al borrar los datos');
	}
}

//Function create new Contact on the List of API DB.
export const FetchPostContact = async (item) => {
	try {
		const response = await fetch(`${genericUrl}/agendas/${user}/contacts/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		})
		if (response.ok) {

			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.log('Error al realizar el PUT en el servidor');
	}
}

//Function edit an exisiting Contact on the List of API DB
export const FetchPutContact = async (id, item) => {

	try {
		console.log(id);
		const response = await fetch(`${genericUrl}/agendas/${user}/contacts/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		})
		if (response.ok) {

			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.log('Error al realizar el PUT en el servidor');
	}
}