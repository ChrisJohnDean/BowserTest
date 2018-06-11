import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { View, StyleSheet } from "react-native"
import { Title, Text, Header, Left, Button, Icon, Right } from "native-base"
import { MyHeader } from "../../shared/myHeader"

interface FirstDrawerScreenProps extends NavigationScreenProps<{}> {}

export class FirstDrawerScreen extends React.Component<FirstDrawerScreenProps, {}> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <MyHeader navigation={this.props.navigation}>
          <Title>
          </Title>
        </MyHeader>
        <Text style={{flex: 1, textAlign: "center"}}> Hello </Text> */}
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("firstExample")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Text>Screen 1</Text>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#c2f2d0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFBE0",
  },
})
