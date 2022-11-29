import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../model/CC';

export default class StorageManager{
    constructor() {
        this.db = SQLite.openDatabase("myDB");
        const queryTable = 'CREATE TABLE IF NOT EXISTS PICTURE (uid INTEGER PRIMARY KEY, pVersion INTEGER, name STRING, picture STRING)'
        this.db.transaction(tx => {
            tx.executeSql(queryTable)
        });
    }

    async setItem() {
        await AsyncStorage.setItem('sid', result.sid)
    }

    static async checkFirstRun(){
        const sid = await AsyncStorage.getItem("sid")
        if (sid) {
            console.log("Siamo già loggati " + sid)
        } else {
            console.log('first run')
            //torna il sid come oggetto
            const sid = await CommunicationController.register()
            console.log('il sid nuovo: ', sid.sid)
            await AsyncStorage.setItem('sid', sid.sid)
            
        }
    }

    static async getSid(){
        const sid = await AsyncStorage.getItem("sid").catch(e => console.log('errore in getSidSM: ', e))
        return sid
    }

    getUserPicture(uid, onResult, onError){
        const transaction = (tx) =>{
            let query = 'SELECT picture, pVersion, name FROM PICTURE where uid = ?'
            tx.executeSql(query, [uid],
                (tx, queryResult) => {
                    if(queryResult.rows.length > 0) {
                        onResult(queryResult.rows._array[0])
                    } else {
                        onResult(1)
                    }
                }, 
                (tx, error) => {
                    onError('errore in getUserPicture:' +error)
                }

                )}
        const error = (e) => {onError(e)};
        this.db.transaction(transaction, error);
    };

    storeUserPicture(uid, pVersion, name, picture, onResult, onError){
        const transaction = (tx) =>{
            let query = "INSERT INTO PICTURE VALUES(?, ?, ?, ?)";
            tx.executeSql(query, [uid, pVersion, name, picture],
                (tx, queryResult) => {  
                    if (queryResult.rows.length > 0) {
                        onResult(queryResult.rows._array[0].value)
                    } else {
                        onResult(1)
                    }
                },
                (tx, error) => {
                    onError(error)
                }
                )}

        const error = (e) => {onError(e)};
        this.db.transaction(transaction, error);
    }

    updateUserPicture(uid, pVersion, picture, name, onResult, onError){
        const transaction = (tx) =>{
            let query = "UPDATE PICTURE SET picture = ?, pVersion= ?, name=? WHERE uid = ?";
            tx.executeSql(query, [picture, pVersion, name, uid],
                (tx, queryResult) => {
                    onResult('Tutto a posto, immagine aggiornata')
                }, 
                (tx, error) => {
                    onError(error)
                }
            )}

        const error = (e) => {onError(e)};
        this.db.transaction(transaction, error);
    }
}
