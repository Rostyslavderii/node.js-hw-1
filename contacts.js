const fs = require('fs').promises;
const path = require('path');

const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');
    
async function readFile() {
        try {
            const data = await fs.readFile(contactsPath, 'utf8')
            // console.log(data)
            // const newContent = `${data} school`
            // await fs.writeFile(contactsPath, newContent, 'utf8');
            const list = JSON.parse(data);
            return list;
            //await fs.rename('./dateUtils.js', './tmp/NewName.js');
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
        const list = await listContacts();
        const contact = list.find(({ id }) => id === contactId);
        console.table(contact);

    } catch (err) {
        console.error(err)
    }
}

async function removeContact(contactId) {
    const list = await listContacts();
    const newlist = list.filter(({ id }) => id !== contactId);
    writeFile([...newlist])
}

async function addContact(name, email, phone) {
    const data = await listContacts();

    const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
}

    data.push(newContact);
    await fs.writeFile(contactsPath, newContent, 'utf8');
    return newContact;
}


    module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact
    }