import { Dimensions, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

interface HomlessRiskIndicatorProps {
  riskSituation: 'low' | 'medium' | 'high';
}

export const SelectRiskContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* height: 54px; */
  padding: 10px 16px 26px 16px;
  margin-bottom: 4px;
`;

export const RiskIndicator = styled.View<HomlessRiskIndicatorProps>`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${props =>
    props.riskSituation === 'low'
      ? colors.lowRisk
      : props.riskSituation === 'medium'
      ? colors.mediumRisk
      : props.riskSituation === 'high'
      ? colors.highRisk
      : colors.lowRisk};
`;

export const RiskText = styled.Text`
  color: ${colors.tertiary};
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const SelectRiskItemList = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 24px 24px 12px 24px;
`;

export const ModalContainer = styled.View`
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  position: absolute;
  width: 140px;
  padding-bottom: 20px;
`;

export const ModalBackgroundScreen = styled.View`
  background-color: transparent;
  flex: 1;
`;
