/**
 * Created by Elf on 23.08.2016.
 */
import { Dimensions, PixelRatio } from 'react-native';

export default class DimensionUtils {

    static getWidthDimInPerc(percents) {
        return percents * Dimensions.get('window').width / 100;
    }

    static getHeightDimInPerc(percents) {
        return percents * Dimensions.get('window').height / 100;
    }

    static getWidthDimWithRatioInPerc(percents) {
        return PixelRatio.get() * DimensionUtils.getWidthDimInPerc(percents);
    }

    static getHeightDimWithRatioInPerc(percents) {
        return PixelRatio.get() * DimensionUtils.getHeightDimInPerc(percents);
    }
}
