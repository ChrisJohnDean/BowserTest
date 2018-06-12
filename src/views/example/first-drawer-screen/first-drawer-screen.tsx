import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import { Title, Text, Header, Left, Button, Icon, Right } from "native-base"
import { MyHeader } from "../../shared/myHeader"

interface FirstDrawerScreenProps extends NavigationScreenProps<{}> {}

interface myState {
  flexDirectionIsColumn: boolean
}

export class FirstDrawerScreen extends React.Component<FirstDrawerScreenProps, myState> {
  constructor(props) {
    super(props)
    this.state = {
      flexDirectionIsColumn: true,
    }
  }

  switchDirection = () => {
    this.state.flexDirectionIsColumn
      ? this.setState({
          flexDirectionIsColumn: false,
        })
      : this.setState({
          flexDirectionIsColumn: true,
        })
  }

  render() {
    //var myStyle: any //= styles.view3
    return (
      <View style={styles.container}>
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
        <View style={styles.view1}>
          <View style={{ flex: 1, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ flex: 2, backgroundColor: "#055401", margin: 5 }} />
        </View>
        <View style={styles.view2}>
          <View style={{ flex: 1, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ flex: 1, backgroundColor: "#055401", margin: 5 }} />
          <View style={{ flex: 2, backgroundColor: "#bbf2b8", margin: 5 }} />
        </View>
        {console.log(this.state.flexDirectionIsColumn)}
        <TouchableHighlight onPress={this.switchDirection} style={{ flex: 1 }}>
          {/* {
            this.state.flexDirectionIsColumn
            ? myStyle = styles.view3
            : myStyle = styles.view5
          }
          <View style={myStyle}>
                <View style={{flex: 1, backgroundColor: "#055401", margin: 5}}>
                </View>
                <View style={{flex: 1, backgroundColor: "#bbf2b8", margin: 5}}>
                </View>
                <View style={{flex: 1, backgroundColor: "#055401", margin: 5}}>
                </View>
              </View> */}
          {this.state.flexDirectionIsColumn ? (
            <View style={styles.view3}>
              <View style={{ flex: 1, backgroundColor: "#055401", margin: 5 }} />
              <View style={{ flex: 1, backgroundColor: "#bbf2b8", margin: 5 }} />
              <View style={{ flex: 1, backgroundColor: "#055401", margin: 5 }} />
            </View>
          ) : (
            <View style={styles.view5}>
              <View style={{ flex: 1, backgroundColor: "#055401", margin: 5 }} />
              <View style={{ flex: 1, backgroundColor: "#bbf2b8", margin: 5 }} />
              <View style={{ flex: 1, backgroundColor: "#055401", margin: 5 }} />
            </View>
          )}
        </TouchableHighlight>
        <View style={styles.view4}>
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
          <View style={{ height: 80, width: 80, backgroundColor: "#bbf2b8", margin: 5 }} />
        </View>
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
  view1: {
    flex: 1,
    backgroundColor: "#4fb84f",
    flexDirection: "row",
  },
  view2: {
    flex: 1,
    backgroundColor: "#72c2a7",
    flexDirection: "row",
  },
  view3: {
    flex: 1,
    backgroundColor: "#f37021",
  },
  view4: {
    flex: 1,
    backgroundColor: "#e23d96",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  view5: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f37021",
  },
})
