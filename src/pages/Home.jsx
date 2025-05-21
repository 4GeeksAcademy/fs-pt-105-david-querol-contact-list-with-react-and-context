
//REACT DEPENDENCES
import { useGlobalReducer } from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//FETCH SERVICES FUCNTIONS
import { FetchGetContacts, FetchDeleteContact } from "../services/userfetch.js"

//COMPONENTS
import { ContactCard } from "../components/ContactCard.jsx";
import { ConfirmModal } from "../components/ConfirmModal.jsx"

//HOME COMPONENT
export const Home = () => {

	//GLOBAL REDUCER 
	const { store, dispatch } = useGlobalReducer();

	//NAVIGATE HOOK
	const navigate = useNavigate();

	//USE STATES
	const [focusItem, setFocusItem] = useState({ id: '', name: '' });
	const [showModal, setShowModal] = useState(false);

	//get API data when component are loaded and dispatch at the GlobalReducer Store.
	useEffect(() => {
		const getData = async () => {
			const data = await FetchGetContacts();
			dispatch({ type: "set_contacts", payload: data });
		}
		getData();
	}, [dispatch])

	//DELETE from API DB and from the GlobalReducer Store.
	const confirmDelete = async () => {
		try {
			const success = await FetchDeleteContact(focusItem.id);
			if (success) {
				dispatch({ type: "delete_contact", payload: focusItem.id });
			}
		} catch (error) {
			console.log("error");
		}
		setShowModal(false);
	}

	//shows modal with Focused ID State.
	const openModal = (id, name) => {
		setFocusItem({ id: id, name: name });
		setShowModal(true);
	}

	return (
		<>
			<div className="bg-light px-2" style={{ minHeight: `100vh` }}>
				<div
					className="border-0 card bg-transparent container-fluid align-items-end pe-0 py-4"
					style={{ maxWidth: `70vh` }}
				>
					<Link to="/addcontact">
						<button className="btn btn-success rounded-0">Añade Contacto</button>
					</Link>
				</div>

				{store.contacts.length === 0 && <div className="text-center">
					<p>No hay contactos por el momento</p>
				</div>}

				{store.contacts.map((item) => {
					return (
						<ContactCard
							key={item.id}
							item={item}
							onEdit={() => navigate(`editcontact/${item.id}`)}
							onDelete={() => openModal(item.id, item.name)}
						/>
					)
				}
				)}
				
				<div className="pb-5 "></div>

				<ConfirmModal
					show={showModal}
					onClose={() => setShowModal(false)}
					onConfirm={confirmDelete}
					contactName={focusItem.name}
				/>
			</div>
		</>
	);
}; 