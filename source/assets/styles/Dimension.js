import { Dimensions } from 'react-native';
import { dpFont } from './Sizes';
const width = Dimensions.get('window').width;

export const Dimension = {
    windowWidth: width,
    width: '100%',
    height: '100%',
    start: {
        x: 0,
        y: 0,
    },
    end: {
        x: 1,
        y: 0,
    },
    medium: dpFont(20),
    semimedium: dpFont(18),
    small: dpFont(16),
    large: dpFont(22),
    large2: dpFont(24),
    large3: dpFont(26),
    Large: dpFont(30),
    semilarge: dpFont(25),
    big: dpFont(28),
    verysmall: dpFont(14),
    extraSmall: dpFont(12),
    Big: dpFont(34)
};
