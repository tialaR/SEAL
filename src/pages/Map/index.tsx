import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

const Map: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Mapa</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: 'blue', paddingTop: 10, fontSize: 16 }}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
