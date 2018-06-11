import * as React from "react"
import { Header, Left, Button, Icon, Right, Text } from "native-base"
import { StyleSheet, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"

export interface MyHeaderProps extends NavigationScreenProps<{}> {}

export class MyHeader extends React.Component<MyHeaderProps, {}> {
  render() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Text>{this.props.navigation.getParam("edition", "Community Videos")}</Text>
        {/* {this.props.children} */}
        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate("drawerStack")}>
            <Icon name="funnel" />
          </Button>
        </Right>
      </Header>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFBE0",
  },
})
