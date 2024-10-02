
import { useEffect, useRef, useState, } from 'react';
import { Keyboard, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Icon } from '@rneui/themed';
import { Colors } from '../../../assets/styles/Colors';
import { Dimension } from '../../../assets/styles/Dimension';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import { IconsName, IconsType } from '../../../assets/styles/Icon';
import { dpHeight } from '../../../assets/styles/Sizes';
import { ActivityIndicator } from 'react-native';



const SearchableDropdownCustom = (props) => {
    const {
        list,
        setOpen,
        setClose,
        isOpen,
        placeholder,
        inputStyle,
        inputStyle2,
        searchableDropMain,
        iconColor,
        IconStyle,
        iconSize,
        error,
        keyboardType,
        handleChange,
        editable,
        value,
        label,
        setList,
        itemContainer,
        lbltxt,
        requiredAsterisk,
        placeholderTextColor,
        defaultStyle,
        errorText,
        labelStyle,
        labelText,
        search,
        getMore,
        fetching,
        staticSearch,
        params,
        setPage,
        setPagination,
        params1,
        withoutouterLayer
    } = props;


    const [searchValue, setSearchSearch] = useState('');
    const [subList, setSubList] = useState([]);
    const textInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setSubList(list);
        }
    }, [isOpen]);


    useEffect(() => {
        if (value) {
            setSearchSearch(value.title);
        } else {
            setSearchSearch('');
        }
    }, [value])


    useEffect(() => {
        if (!staticSearch) {
            setPagination()
            setPage(1)
            search('', 1, params, params1);
        }
    }, [isOpen])


    const handleSelect = (item) => {
        // setSearchSearch(item.title);
        handleChange(item);
        setClose();
        setList(subList);
    };



    const handleStaticSearch = (e) => {
        let list = [...subList]
        if (e.length > 0) {
            let filterlist = list.filter((data) => data.title.toLowerCase().indexOf(e.toLowerCase()) > -1);
            setList(filterlist);
            setSearchSearch(e);
        }
        else {
            setList(list);
            setSearchSearch(e);
        }
    };


    const handleSearch = (e) => {
        setSearchSearch(e);
        if (params || params1) {
            search(e, 1, params, params1);
        } else {
            search(e, 1);
        }
    };


    const handleOpenOnIconClick = () => {
        setOpen();
        if (subList && subList.length > 0) {
            setList(subList);
        }
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };


    const handleOnBlur = () => {
        setClose();
        if (subList && subList.length > 0) {
            setList(subList);
        }
        if (value) {
            setSearchSearch(value.title);
        }
        else {
            setSearchSearch('');
        }
    };


    /* 
    props : -

    value   ----> main value as object {"id": "", "name": ""}
    subList ----> main items list for search 

    */


    return (
        <>
            <View style={withoutouterLayer ? styles.mainCintainer2 : styles.mainCintainer}>
                {label ?
                    <Text style={lbltxt ? lbltxt : styles.lbltxt}>{label ? label : ''}{requiredAsterisk ? <Text style={styles.requiredAsterisk}>*</Text> : null}</Text>
                    : null}

                <View style={searchableDropMain ? searchableDropMain : [styles.searchableDropMain]}>
                    <TextInput
                        ref={textInputRef}
                        editable={editable}
                        autoFocus={isOpen}
                        onFocus={() => setOpen ? setOpen() : null}
                        onBlur={() => setClose ? handleOnBlur() : null}
                        containerStyle={styles.containerStyle}
                        style={!isOpen ? defaultStyle ? defaultStyle : [styles.inputStyleClose] : isOpen ? [(inputStyle ? inputStyle : styles.inputStyleOpen), styles.activeInput] : (inputStyle2 ? inputStyle2 : styles.inputStyleClose)}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.placeholderColor}
                        multiline={false}
                        keyboardType={keyboardType}
                        value={searchValue}
                        onChangeText={(e) => staticSearch ? handleStaticSearch(e) : handleSearch(e)}
                    />
                    {
                        <TouchableOpacity
                            style={IconStyle ? IconStyle : styles.iconStyle1}
                            activeOpacity={1}
                            onPress={() => { isOpen ? (setClose(), Keyboard.dismiss()) : handleOpenOnIconClick() }}
                        >
                            <Icon
                                type={isOpen ? IconsType.entypo : IconsType.entypo}
                                name={isOpen ? IconsName.up : IconsName.down}
                                color={iconColor ? iconColor : Colors.grey2}
                                size={iconSize ? iconSize : Dimension.large3}
                            />
                        </TouchableOpacity>
                    }
                    {
                        isOpen ?
                            <View style={[{ maxHeight: dpHeight(24), borderRadius: dpHeight(1) }, GlobalStyles.shadow]}>
                                <ScrollView
                                    nestedScrollEnabled
                                    showsVerticalScrollIndicator={false}
                                    style={itemContainer ? itemContainer : [styles.itemContainer]}
                                    keyboardShouldPersistTaps={'handled'}
                                    onScrollEndDrag={() => getMore ? getMore() : ''}
                                >
                                    <View style={styles.listArea}>
                                        {
                                            list && list.length > 0 ?
                                                list.map((item, i) => (
                                                    <TouchableOpacity key={i} onPress={() => (Keyboard.dismiss(), handleSelect(item))}>
                                                        <View style={value && value.id === item.id ? styles.listItemselected : styles.listItemMain}>
                                                            <Text style={value && value.id === item.id ? styles.title2 : styles.title}>{item.title}</Text>
                                                        </View>
                                                        <View style={styles.line} />
                                                    </TouchableOpacity>
                                                ))
                                                :
                                                <View style={styles.nomain}>
                                                    <Text style={styles.title}>No Data Found</Text>
                                                </View>
                                        }
                                    </View>
                                    {fetching ? (
                                        <ActivityIndicator
                                            color={Colors.primary}
                                            size={'small'}
                                            style={{ alignSelf: 'center', paddingTop: dpHeight(2), paddingBottom: dpHeight(2) }}
                                        />
                                    ) : null}
                                </ScrollView>
                            </View>
                            :
                            null
                    }
                </View>
                {error && <Text style={errorText ? errorText : styles.errorText}>{error}</Text>}
            </View>
        </>
    )
};

export default SearchableDropdownCustom;