import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

interface HomlessRiskIndicatorProps {
  riskSituation: 'low' | 'medium' | 'high';
}

export const HomelessContainer = styled.TouchableOpacity`
  background-color: ${colors.background};
  border-radius: 10px;
  padding: 20px;
  margin: 0 24px 16px 24px;
  flex-direction: row;
  align-items: center;

  box-shadow: 0px 10px 14px ${colors.shadow};
`;

export const HomelessAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 36px;
`;

export const HomelessInfo = styled.View`
  flex: 1;
  padding: 0 10px 0 20px;
`;

export const HomelessName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 15px;
  color: ${colors.tertiary};
`;

export const HomelessMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const HomelessMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.secondary};
  font-family: 'RobotoSlab-Regular';
  font-size: 13px;
`;

export const HomlessRiskIndicator = styled.View<HomlessRiskIndicatorProps>`
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
      : colors.gray};
`;
