import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import RateListItem from '../../components/RateListItem.js';

import {updateFavorites} from '../../store/actions/settings';
import {Divider} from 'react-native-paper';

const ConversionScreen = () => {
  return <Text>ConversionScreen</Text>;
};

export default ConversionScreen;
