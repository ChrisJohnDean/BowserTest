import * as React from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from "react-native"
import { Left, Icon, Button, Header, Right, Title } from "native-base"
import { NavigationScreenProps } from "react-navigation"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { FilmStoreType } from "../../../models/Filmstore"
import { UserStoreType } from "../../../models/user-store"
import { MyHeader } from "../../shared/myHeader"

interface ListItemProps {
  onPressItem: any
  index: any
  item: any
  data: any
}

export class ListItem extends React.Component<ListItemProps, {}> {
  _onPress = () => {
    this.props.onPressItem(this.props.index, this.props.item)
  }

  public render() {
    const item = this.props.item
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.image_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.title}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

// type Props = {};
let colors = ["#e43446", "#4fb84f", "#e23d96", "#c2c500", "#72c2a7", "#f37021"]

export interface SecondExampleScreenProps extends NavigationScreenProps<{}> {
  filmStore: FilmStoreType
  userStore: UserStoreType
}

@inject("filmStore", "userStore")
@observer
export class SecondExampleScreen extends React.Component<SecondExampleScreenProps, {}> {
  navigation: any
  edition: string
  filmTypeUrl: string

  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
    this.edition = this.navigation.getParam("edition", "Community Videos")
    this.filmTypeUrl = this.navigation.getParam("filmTypeUrl", "")
  }

  componentDidMount() {
    this.props.filmStore.fetchFilms(this.filmTypeUrl, this.edition)
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: colors[index % colors.length] }}>
        <ListItem item={item} data={item} index={index} onPressItem={this._onPressItem} />
      </View>
    )
  }

  _onPressItem = (index, item) => {
    let url = "https://www.storyhive.com/creator/profile/id/" + item.creator_id.creator_id
    this.edition === "Community Videos"
      ? (this.props.filmStore.addSelectedCommunityFilm(
          this.props.filmStore.communityFilms[index].id,
        ),
        this.props.userStore.fetchUser(
          url,
          item.project_lead,
          item.creator_id.creator_id,
          this.props.filmStore.selectedCommunityFilm.id,
        ))
      : (this.props.filmStore.addSelectedOtherFilm(this.props.filmStore.otherFilms[index].id),
        this.props.userStore.fetchUser(
          url,
          item.project_lead,
          item.creator_id.creator_id,
          this.props.filmStore.selectedOtherFilm.id,
        ))

    this.navigation.navigate("filmPlayer", { filmData: item, edition: this.edition })
  }

  render() {
    const data =
      this.edition === "Community Videos"
        ? this.props.filmStore.communityFilms
        : this.props.filmStore.otherFilms

    return (
      <View style={styles.container}>
        <MyHeader navigation={this.props.navigation}>
          <Title>{this.edition}</Title>
        </MyHeader>
        {!this.props.filmStore.isFetching ? (
          <FlatList data={data} keyExtractor={this._keyExtractor} renderItem={this._renderItem} />
        ) : (
          <View style={styles.textContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    // marginTop: 67,
    backgroundColor: "#F5FCFF",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
    borderColor: "#000",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 80 / 8,
    marginRight: 10,
  },
})
