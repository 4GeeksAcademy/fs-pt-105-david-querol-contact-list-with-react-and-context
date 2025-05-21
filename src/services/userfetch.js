
//Data of server API
const genericUrl = "https://playground.4geeks.com/contact";
const user = "david"

//Function Get Contacts from API DB
export const FetchGetContacts = async () => {
	try {
		const response = await fetch(`${genericUrl}/agendas/${user}`);

		if (!response.ok) {
			if (response.status === 404) return [];
		}
		const data = await response.json();
		return Array.isArray(data.contacts) ? data.contacts : [];
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
			console.log("error al ejecutar el borrado", response.status)
			return false;
		};
		return true;
	} catch (error) {
		console.log('Error al borrar los datos', error);
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
		if (!response.ok) {
			console.log('error en la consulta', response.status);
			}
			const data = await response.json();
			return data;
		
	} catch (error) {
		console.log('Error al realizar el POST en el servidor', error);
		return false;
	}
}

//Function edit an exisiting Contact on the List of API DB
export const FetchPutContact = async (id, item) => {

	try {
		const response = await fetch(`${genericUrl}/agendas/${user}/contacts/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		})
		if (!response.ok) {
			console.log('error en la consulta', response.status)
			}
			const data = await response.json();
			return data;
		
	} catch (error) {
		console.log('Error al realizar el PUT en el servidor');
		return false;
	}
}