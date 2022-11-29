import CommunicationController from "../model/CC";
import StorageManager from "../model/storeManager";

let sid = null;
StorageManager.getSid()
.then(result => sid = result)

const SM = new StorageManager();

export default class FollowedLoaderHelper {


    async getFollowed() {
        let listaCC = await CommunicationController.getFollowed(sid)


        return listaCC
   
    }

    
}
