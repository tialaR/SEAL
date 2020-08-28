import React, { PureComponent } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import {
  SelectRiskContainer,
  RiskIndicator,
  RiskText,
  SelectRiskItemList,
  ModalContainer,
  ModalBackgroundScreen,
} from './styles';

interface Props {
  onRiskPress: (risk: string) => void;
  riskSituation: string;
}

interface State {
  currentRisk: string;
  currentRiskDescription: string;
  modalVisible: boolean;
  height: number;
  x: number;
  y: number;
}

const list = [
  { situation: 'low', description: 'Baixo' },
  { situation: 'medium', description: 'Médio' },
  { situation: 'high', description: 'Alto' },
];

export default class SelecRisktList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentRisk: this.props.riskSituation,
      currentRiskDescription: this.configureRiskdescription(
        this.props.riskSituation,
      ),
      modalVisible: false,
      height: 0,
      x: 0,
      y: 0,
    };
  }

  // Esconder Lista
  private hideModal = () => {
    this.setState({ modalVisible: false });
  };

  // Mensure modal (dimensionar modal na tela toda)
  private containerRef: View | null = null;

  private measure = () => {
    this.hideModal();
    {
      this.containerRef &&
        this.containerRef.measureInWindow((x, y, width, height) => {
          this.setState({ modalVisible: true, x, y: y + 40, height });
        });
    }
  };

  private onLayout = () => {
    if (!this.containerRef) return;
    this.containerRef.measureInWindow((_x, _y, _width) => {
      // console.warn(x, y, width, height);
    });
  };

  configureRiskdescription = (situation: string) => {
    switch (situation) {
      case 'high':
        return 'Risco Alto';
        break;
      case 'medium':
        return 'Risco médio';
        break;
      case 'low':
        return 'Risco baixo';
        break;
      default:
        return 'Risco baixo';
        break;
    }
  };

  handleRiskChange = (situation: string) => {
    const description = this.configureRiskdescription(situation);

    this.setState({
      currentRisk: situation,
      currentRiskDescription: description,
    });
  };

  render() {
    const { modalVisible, x, y } = this.state;
    return (
      <>
        <View ref={ref => (this.containerRef = ref)} onLayout={this.onLayout}>
          <SelectRiskContainer onPress={this.measure}>
            <RiskIndicator riskSituation={this.state.currentRisk} />
            <RiskText>{this.state.currentRiskDescription}</RiskText>
          </SelectRiskContainer>

          {list && (
            <Modal
              transparent
              visible={modalVisible}
              onRequestClose={this.hideModal}
            >
              <TouchableWithoutFeedback onPress={this.hideModal}>
                <ModalBackgroundScreen>
                  <ModalContainer style={{ top: y, left: x }}>
                    <FlatList
                      data={list}
                      style={{ flex: 1 }}
                      contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: colors.white,
                      }}
                      bounces={false}
                      showsVerticalScrollIndicator
                      renderItem={({ item: risk }) => (
                        <SelectRiskItemList
                          onPress={() => {
                            this.handleRiskChange(risk.situation);
                            this.props.onRiskPress(risk.situation);
                          }}
                        >
                          <RiskIndicator riskSituation={risk.situation} />
                          <RiskText>{risk.description}</RiskText>
                        </SelectRiskItemList>
                      )}
                      keyExtractor={(_, index) => {
                        return `${index}`;
                      }}
                    />
                  </ModalContainer>
                </ModalBackgroundScreen>
              </TouchableWithoutFeedback>
            </Modal>
          )}
        </View>
      </>
    );
  }
}
