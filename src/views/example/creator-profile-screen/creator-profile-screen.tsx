// import * as React from "react"
import React, { Component } from "react"
import { NavigationScreenProps } from "react-navigation"
import { StyleSheet, View, Image, ScrollView } from "react-native"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { UserStoreType } from "../../../models/user-store"
import { FilmStoreType } from "../../../models/FilmStore"
import { Container, Text, Title } from "native-base"
import { MyHeader } from "../../shared/myHeader"

export interface CreatorScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStoreType
  filmStore: FilmStoreType
}

// @inject("userStore", "filmStore")
// @observer
export class CreatorProfileScreen extends Component<CreatorScreenProps, {}> {
  creator: any
  selectedFilm: any

  constructor(props) {
    super(props)
    this.creator = this.props.navigation.getParam("creator")
  }

  generateProjectImageElements() {
    const projectImages = this.creator.project_image_urls.map((item, index) => {
      console.log("arrrrr")
      return <Image style={styles.projectImages} key={index} source={{ uri: item }} />
    })
    console.log("image count: ", projectImages.length)
    while (projectImages.length <= 5) {
      projectImages.push(
        <View style={styles.emptyProjectViews} key={projectImages.length}>
          <Text style={styles.emptyViewText}>Coming Soon</Text>
        </View>,
      )
    }
    return projectImages
  }

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#cef9fd" }}>
        <MyHeader navigation={this.props.navigation}>
          <Title>Creator Profile</Title>
        </MyHeader>
        <View style={styles.topLargeView}>
          <Image style={styles.thumb} source={{ uri: this.creator.image_url }} />
          <Text style={styles.title}>{this.creator.project_lead}</Text>
        </View>
        <View style={styles.smallView}>
          <View style={styles.userDataViews}>
            <Text style={styles.numberText}>86</Text>
            <Text style={styles.belowNumberText}>Projects</Text>
          </View>
          <View style={styles.userDataViews}>
            <Text style={styles.numberText}>22.1k</Text>
            <Text style={styles.belowNumberText}>Followers</Text>
          </View>
          <View style={styles.userDataViews}>
            <Text style={styles.numberText}>536</Text>
            <Text style={styles.belowNumberText}>Following</Text>
          </View>
        </View>
        <View style={styles.smallView}>
          <View style={styles.textBoxView}>
            <Text style={styles.bottomViewText}>FOLLOW</Text>
          </View>
          <View style={styles.textBoxView}>
            <Text style={styles.bottomViewText}>MESSAGE</Text>
          </View>
        </View>
        <View style={styles.bottomLargeView}>
          <ScrollView contentContainerStyle={styles.homeView}>
            {this.generateProjectImageElements()}
          </ScrollView>
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
  homeView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallView: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    justifyContent: "center",
  },
  thumb: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 34,
    color: "#23415a",
    textAlign: "auto",
    flexWrap: "wrap",
    // marginBottom: -5,
    marginTop: 15,
  },
  bottomLargeView: {
    height: 248,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  projectImages: {
    width: 124,
    height: 124,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyProjectViews: {
    width: 124,
    height: 124,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4baeb6",
  },
  bottomViewText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4baeb6",
    textAlign: "center",
  },
  emptyViewText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#cef9fd",
    textAlign: "center",
  },
  textBoxView: {
    flexGrow: 1,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    alignItems: "center",
  },
  userDataViews: {
    flex: 1,
    // borderWidth: 0.5,
    // borderColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 3,
  },
  belowNumberText: {
    color: "#a9a9a9",
    fontSize: 20,
  },
})
