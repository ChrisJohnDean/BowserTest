import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { StyleSheet, View, Image, ScrollView } from "react-native"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { UserStoreType } from "../../../models/user-store"
import { Container, Text, Title } from "native-base"
import { MyHeader } from "../../shared/myHeader"

export interface CreatorScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStoreType
  projectLead: string
}

@inject("userStore")
@observer
export class CreatorProfileScreen extends React.Component<CreatorScreenProps, {}> {
  generateProjectImageElements() {
    let user = this.props.userStore.selectedUser
    const projectImageElements = user.project_image_urls.map((item, index) => {
      return <Image style={styles.projectImages} key={index} source={{ uri: item }} />
    })
    return projectImageElements
  }

  render() {
    // should be able to use this.props.navigation.getParams blah blah .creator
    let user = this.props.userStore.selectedUser
    console.log(user)
    return (
      <Container style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation}>
          <Title>Creator Profile</Title>
        </MyHeader>
        <View style={styles.topLargeView}>
          <Image style={styles.thumb} source={{ uri: user.image_url }} />
          <Text style={styles.title}>{user.project_lead}</Text>
        </View>
        <View style={styles.smallView} />
        <ScrollView style={{ height: 200 }}>
          <View style={styles.bottomLargeView}>{this.generateProjectImageElements()}</View>
        </ScrollView>
        <View style={styles.smallView}>
          <Text style={styles.bottomViewText}>FOLLOW</Text>
          <Text style={styles.bottomViewText}>MESSAGE</Text>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  topLargeView: {
    flex: 4,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
  },
  smallView: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    alignItems: "center",
    // backgroundColor: "#d3d3d3",
    // justifyContent: "center",
  },
  thumb: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  title: {
    // textAlign: "center",
    // justifyContent: "center",
    fontWeight: "bold",
    fontSize: 34,
    //marginTop: 30,
    color: "#23415a",
    textAlign: "auto",
    flexWrap: "wrap",
    marginBottom: -15,
    marginTop: 30,
  },
  bottomLargeView: {
    // flex: 4,
    height: 248,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    // alignItems: "center",
  },
  projectImages: {
    width: 124,
    height: 124,
    // flex: 1,
  },
  bottomViewText: {
    fontSize: 26,
    flex: 1,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
  },
})
