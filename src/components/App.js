import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

const LOCAL_STORAGE_KEY = "contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // New state variable

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, contact]);
  };

  useEffect(() => {
    const retrievedContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrievedContacts) {
      setContacts(retrievedContacts);
      setDataFetched(true); // Mark data as fetched
    }
  }, []);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, dataFetched]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
