/**
 * Created by Elf on 17.10.2016.
 */
import { AsyncStorage } from 'react-native';
import PropsConfig from './../config/PropsConfig'

export async function saveToken(token) {
    // Save token and time to Async store
    console.log(token)
    try {
        await AsyncStorage.setItem(PropsConfig.tokenSaveTag,
            JSON.stringify({token}));

        await AsyncStorage.setItem(PropsConfig.tokenSaveTimeTag,
            JSON.stringify({tokenDate: Date.now()}));

    } catch (e) {
        console.log(e);
        // Just put a message to console it actually not critical if
        // we couldn't save token
    }
}

export async function deleteToken() {
    try {
        await AsyncStorage.removeItem(PropsConfig.tokenSaveTimeTag);

        await AsyncStorage.removeItem(PropsConfig.tokenSaveTag);

    } catch (e) {
        console.log(e);
        // Just put a message to console it actually not critical if
        // we couldn't save token
    }
}

export async function getToken() {
    // Test if it token exists and not expired otherwise if expired delete it
    try {
        const tokenTime = JSON.parse(await AsyncStorage.getItem(PropsConfig.tokenSaveTimeTag));

        if (Date.now() - tokenTime.tokenDate > PropsConfig.tokenLifeTime * 1000) // ms
        {
            // Delete token
            deleteToken();

            return null;
        }

        return JSON.parse(await AsyncStorage.getItem(PropsConfig.tokenSaveTag));

    } catch (e) {
        console.log(e);
        // Just put a message to console it actually not critical if
        // we couldn't get token user should just get a new one
    }
}