import { Text, View } from "react-native";
import styles from "./styles";


const SingleTitleHeader = (props) => {
    const { title } = props;

    return (
        <View style={styles.main}>
            <View style={styles.innerArea}>
                <View style={styles.iconTextSec}>
                    <Text style={styles.heading}>{title ? title : ''}</Text>
                </View>
            </View>
        </View>
    )
};

export default SingleTitleHeader;