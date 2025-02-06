import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { vh, vw } from '../../utils/dimensions';


const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, data, onSelect, currentItem, dataType}) => {
  const label = currentItem?.[dataType]?.label;

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.item, item === label && { backgroundColor: colors.INPUT_ACTIVE_COLOR, borderRadius: 6 }]} onPress={() => onSelect(item)}>
                  <Text style={[styles.txt, item === label && { color: colors.WHITE }]}>{item}</Text>
                </TouchableOpacity>
              )
            }
            }
            initialScrollIndex={dataType === 'month' ? 0 : currentItem[dataType]?.index}
            windowSize={150}
            initialNumToRender={150}
            maxToRenderPerBatch={150}
            getItemLayout={(data, index) => (
              { length: 29, offset: 29 * index, index }
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal >
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    width: vw(200),
    height: vh(375),
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  dropdownItemText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  dropdownItemSelected: {
    backgroundColor: colors.PRIMARY,
    color: colors.WHITE,
  },
  dropdownItemTextSelected: {
    color: colors.WHITE,
  },
  txt: {
    fontSize: 16,
    color: colors.INPUT_ACTIVE_COLOR,
    alignSelf: 'center'
  },
  item: {
    marginVertical: 5,
    width: vw(100),
    borderBottomColor: colors.GRAY_300
  }
})
