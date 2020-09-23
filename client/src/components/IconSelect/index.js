import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { vectorIcons, kittenIcons } from '../../assets/icons';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Item = ({ item, onPress, style }) => {
  if (!vectorIcons[item]) return null;
  const icon = vectorIcons[item]({ size: 35, color: '#FFFFFF' });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.item, style]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const IconSelect = ({ route, navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { setIcon } = route.params;

  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();

  const renderBackAction = () => (
    <TopNavigationAction onPress={back} icon={kittenIcons.BackIcon} />
  );

  const back = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item === selectedId ? '#7E0087' : '#5B58AF';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item);
          setIcon(item);
        }}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <Layout style={[styles.container, { paddingTop }]}>
      <TopNavigation accessoryLeft={renderBackAction} />
      <FlatList
        data={Object.keys(vectorIcons)}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedId}
        numColumns={3}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
  },
});

export default IconSelect;
