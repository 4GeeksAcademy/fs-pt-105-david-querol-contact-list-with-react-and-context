//Initial Data of Store
export const initialStore = () => {
  return {
    contacts: []
  }
}

//Store Reducer shared Data.
export const storeReducer = (store, action = {}) => {
  switch (action.type) {
    case 'set_contacts':   //Gets data on store when page is loaded.
      return {
        ...store,
        contacts: action.payload
      };
    case 'updated_content':  //Update content of a existing contact
      return {
        ...store,
        contacts: store.contacts.map((item) => item.id === action.payload.id ? action.payload : item)
      };
    case 'new_contact':   //Adds a new contact at the end of the list on the store.
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };
    case 'delete_contact': //Deletes a contact with its id.
      return {
        ...store,
        contacts: store.contacts.filter((item) => item.id !== action.payload)
      }
    default:
      throw Error('Unknown action.');
  }
}
