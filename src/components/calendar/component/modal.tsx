import React from 'react';
import Modal from 'react-native-modal';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../utils/constants/colors';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: string[];
  onSelect: (item: string) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, data, onSelect }) => {
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onSelect(item)}>
                <Text style={styles.txt}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
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
    width: 150,
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
    color: colors.INPUT_ACTIVE_COLOR
  }
})
