const fs = require('fs').promises;
const path = require('path');

const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');
    
async function readFile() {
        try {
            const data = await fs.readFile(contactsPath, 'utf8')

            const list = JSON.parse(data);
            return list;

        } catch (err) {
            console.error(err)
        }
}
    

async function listContacts() {
    const contacts = await readFile();
    console.table(contacts);
}

async function getContactById(contactId) {
    try {

        const list = await readFile();
        const contact = list.find(({ id }) => id === contactId);
        console.table(contact);
    if (!contact) {
    return null;
    }
        return contact;
    } catch (err) {
        console.error(err)
    }
}

async function writeFile(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
  } catch (err) {
    console.error(err);
  }
}


async function removeContact(contactId) {
    const list = await readFile();
    const newlist = await list.filter(({ id }) => id !== contactId);
    writeFile([...newlist]);
    return readFile();
}



async function addContact(name, email, phone) {
    const data = await readFile();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    data.push(newContact);
    await writeFile(data);
    return newContact;
}


    module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact
    }