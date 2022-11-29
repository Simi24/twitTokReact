import CommunicationController from "../model/CC";

import StorageManager from "../model/storeManager";

import SeguitiContext from '../context';

const context = SeguitiContext;

//TODO: mettere direttamente l'immagine placeholder agli utenti con immagine null
//così posso togliere gli if inutili quando faccio il render dei componenti
    
let SM = new StorageManager();

export default class TwokLoaderHelper{

    async handleStoreNewPicture(sid, uid){
        const user = await CommunicationController.getPicture(sid, uid)
        console.log("Prendo l'immagine che non ho")
        SM.storeUserPicture(user.uid, user.pversion, user.name, user.picture,
            risultatoStorePicture => console.log('Nuovo utente inserito', (risultatoStorePicture.nome), (risultatoStorePicture.uid)),
            error => console.log('errore in store user picture ',error)
            )
    }


    async handleUpdatePicture(sid, uid, name){
        const user = await CommunicationController.getPicture(sid, uid)
        console.log("Update User")
        SM.updateUserPicture(user.uid, user.pversion, user.picture, user.name,
            risultatoUpdatePicture => console.log('Utente aggiornato'),
            error => console.log('errore in store user picture ',error)
            )
    }


    async handleStoreUserPicture2(sid, uid, pversion, name){
        //console.log('pversion del getTwok: ', pversion)
        //ritorna picture, name e pVersion
        console.log(sid)
        console.log('Uid: ', uid)
        SM.getUserPicture(uid,
            risultatoGetUserPicture => {console.log('Utente trovato nel DB', pversion, risultatoGetUserPicture.pVersion, name, risultatoGetUserPicture.name) ; if(risultatoGetUserPicture == 1){
                console.log('Utente non trovato nel DB, inseriamolo')
                this.handleStoreNewPicture(sid, uid, name)
            } else if((pversion > risultatoGetUserPicture.pVersion) || (name != risultatoGetUserPicture.name)) {
                this.handleUpdatePicture(sid, uid, name)
            } else {
                console.log('Non dobbiamo aggiornare il db')
            }},
            error => console.log('errore in getUserPicture', error)
            )
    }

    
    async createList(sid) {
        console.log('Il sid esiste: ', sid)
        let listaTwok = []
        for (let i = 0; i < 9; i++) {
            //console.log('faccio la richiesta numero: ' + i)
            const twok = await CommunicationController.getTwok(sid).catch(e => console.log('errore in create list: ', e))
            console.log(twok)
                //let twok = new Twok(result.uid, result.name, result.pversion, result.tid, result.text)
            this.handleStoreUserPicture2(sid, twok.uid, twok.pversion, twok.name)

            listaTwok.push(twok) 
            //console.log('iterazione: ' + i + lista)
        }

        //console.log(listaTwok)

        return listaTwok
    }


    async addTwok(sid, lista){
        //console.log(lista.length)
        for(let i = 0; i < 3; i++){
            const twok = await CommunicationController.getTwok(sid)

            this.handleStoreUserPicture2(sid, twok.uid, twok.pversion, twok.name)
            lista.push(twok);

        }

        return lista
    }
    

    async getUserTwoks(sid, uid) {
        let listaTwok = []
        for(let i = 0; i < 5; i++){
            const twok = await CommunicationController.getTwok(sid, uid)
            listaTwok.push(twok)
        }
        return listaTwok
    }

    async addUserTwok(sid, uid, lista){
        for(let i = 0; i<3; i++){
            const twok = await CommunicationController.getTwok(sid, uid)
            lista.push(twok)
        }
        return lista
    }

    

}
