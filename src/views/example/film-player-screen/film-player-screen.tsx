import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native"
import YouTube from "react-native-youtube"
import { NavigationScreenProps } from "react-navigation"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { FilmStoreType } from "../../../models/FilmStore"
import { UserStoreType } from "../../../models/user-store"
import { MyHeader } from "../../shared/myHeader"
import { Left, Icon, Button, Header, Title } from "native-base"
import { WithSubscription } from "../../shared/higher-order-component"

const HeaderHoc = WithSubscription(MyHeader)

interface FilmPlayerScreenProps extends NavigationScreenProps<{}> {
  filmStore: FilmStoreType
  userStore: UserStoreType
}

@inject("filmStore", "userStore")
@observer
export class FilmPlayerScreen extends Component<FilmPlayerScreenProps, {}> {
  navigation: any
  filmData: any
  edition: string
  selectedFilm: any

  constructor(props: FilmPlayerScreenProps) {
    super(props)
    this.navigation = this.props.navigation
    this.filmData = this.navigation.getParam("filmData", {})
    this.edition = this.navigation.getParam("edition", "Community Videos")
    this.selectedFilm =
      this.edition === "Community Videos"
        ? this.props.filmStore.selectedCommunityFilm
        : this.props.filmStore.selectedOtherFilm
  }

  navigate = () => {
    //let user: any
    //const users = this.props.userStore.users

    this.props.userStore.addSelectedUser(this.selectedFilm.creator_id)
    this.selectedFilm.addCreatorProfileImageUrl(this.props.userStore.selectedUser.image_url)
    // var i
    // for (i = 0; i < users.length; i++) {
    //   if (users[i].project_lead === this.selectedFilm.project_lead) {
    //     this.selectedFilm.addCreatorProfileImageUrl(users[i].image_url)
    //     user = users[i]
    //     break
    //   }
    // }
    this.navigation.navigate("creatorProfile", {
      projectLead: this.selectedFilm.project_lead,
      //userProjects: user.project_names,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader navigation={this.props.navigation}>
          <Title /*style={{marginTop: 15}}*/>{this.edition}</Title>
        </MyHeader>
        <View style={styles.upperView}>
          <Image style={styles.thumb} source={{ uri: this.selectedFilm.image_url }} />
          <Text style={styles.title}>{this.selectedFilm.title}</Text>
        </View>
        <View style={styles.textBox}>
          <YouTube
            videoId={this.selectedFilm.video_link} // The YouTube video ID
            play={false} // control playback of video with true/false
            fullscreen={true} // control whether the video should play in fullscreen or inline
            loop={true} // control whether the video should loop when ended
            apiKey={"AIzaSyBRPkRzflSheuVv2mkNm98rYyffqMFbAts"}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: "stretch", height: 300 }}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.quote}>"{this.selectedFilm.elevator_pitch}"</Text>
          <TouchableHighlight onPress={this.navigate}>
            <Text style={styles.projectLead}>By: {this.selectedFilm.project_lead}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#ec9aa1",
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
  upperView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  projectLead: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 18,
    color: "#23415a",
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 18,
    color: "#FFF",
    marginBottom: -25,
  },
  textBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  thumb: {
    width: 130,
    height: 130,
    borderRadius: 80 / 8,
  },
})

export const FilmPlayerScreenLogged = WithSubscription(FilmPlayerScreen)
