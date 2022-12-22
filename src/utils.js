import {Appwrite} from 'appwrite';

// Init your Web SDK
const appwrite = new Appwrite();

appwrite.setEndpoint('http://localhost/v1').setProject('627acf30d9ca546f3273');

appwrite.account.createAnonymousSession().then(
    (response) => {
        console.log(response);
    },
    (error) => {
        console.log(error);
    }
);

export const db = appwrite.database;
export const COLLECTION_ID = '627acfa58ad73f9e514e';


