/**
 * Created by Elf on 05.09.2016.
 */
import { NetInfo } from 'react-native';

export async function isInternetAvailable() {
    let isConnected = await NetInfo.isConnected.fetch();

    return isConnected;
}