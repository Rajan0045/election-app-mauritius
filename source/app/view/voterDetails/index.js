import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Font } from '../../../assets/styles/FontsFamily'
import globalStyles from '../../../assets/styles/GlobalStyles'
import { Images } from '../../../assets/styles/Images'
import { createStyles } from './style'


const VoterDetails = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null
    const styles = createStyles(apiColors);

    return (
        <View style={styles.main}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.subMain}>
                    <View style={styles.viewImg}>
                        <Image
                            source={Images.voter}
                            style={globalStyles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col1}>
                            <Text style={styles.userName}>Savannah</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.ptrButton}>PTR</Text>
                            <Text style={styles.votedButton}>Voted</Text>
                        </View>
                    </View>
                    <Text style={styles.phoneNumber}>78944-73895</Text>
                    <View style={styles.vSpace}>
                        <Text style={styles.idTxt}>Id Number (TAN, NIC and ERC)</Text>
                        <Text style={styles.idNumber}>PDES03028F</Text>
                    </View>
                    <View style={styles.vSpace}>
                        <Text style={styles.idTxt}>Name of Constituency</Text>
                        <Text style={styles.idNumber}>Port Louis South and Port Louis Central</Text>
                    </View>
                </View>
                <View style={styles.activityMain}>
                    <Text style={styles.activityTxt}>Activity</Text>
                    <View style={styles.line} />
                    {
                        [1, 2, 3, 4, 5].map((item, i) => {
                            return (
                                <View style={styles.activityView} key={i}>
                                    <Text style={styles.activity}><Text style={{ fontFamily: Font.bold }}>Talan Aminof</Text> has changed  status with <Text style={{ fontFamily: Font.bold }}>MSM</Text></Text>
                                    <Text style={styles.timeTxt}>18:09PM</Text>
                                </View>
                            )
                        })
                    }

                </View>
            </ScrollView>
        </View>
    )
}

export default VoterDetails
