import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { StyleSheet, View, Image } from "react-native"
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
  user: any

  constructor(props) {
    super(props)
    this.user = this.props.userStore.selectedUser
  }

  render() {
    console.log(this.user)
    return (
      <Container style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation}>
          <Title>Creator Profile</Title>
        </MyHeader>
        <View style={styles.largeView}>
          <Image style={styles.thumb} source={{ uri: this.user.image_url }} />
          <Text style={styles.title}>{this.user.project_lead}</Text>
        </View>
        <View style={styles.smallView} />
        <View style={styles.smallView} />
        <View style={styles.largeView} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  largeView: {
    flex: 4,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  smallView: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  thumb: {
    width: 130,
    height: 130,
    borderRadius: 80 / 8,
  },
  title: {
    // textAlign: "center",
    // justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    //marginTop: 30,
    color: "#23415a",
    textAlign: "auto",
    flexWrap: "wrap",
    marginBottom: 20,
  },
})
