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
import { NavigationScreenProps } from "react-navigation"
import { inject } from "mobx-react"
import { observer } from "mobx-react"

interface ListItemProps {
  onPressItem: any
  index: any
  item: any
  data: any
}

class ListItem extends React.Component<ListItemProps, {}> {
  _onPress = () => {
    this.props.onPressItem(this.props.index, this.props.item)
  }


  public render() {
    const item = this.props.item
    console.log(item.image_url)
    console.log(item.title)
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source ={{uri: this.props.item.image_url}}/>
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{this.props.item.title}</Text>
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
  filmTypeUrl: string
  edition: string
  filmStore: any
}

@inject("filmStore")
@observer
export class SecondExampleScreen extends React.Component<SecondExampleScreenProps, {}> {
  goBack = () => this.props.navigation.goBack(null)

  constructor(props) {
    super(props)
    console.log(props.navigation.state.params)
  }

  componentDidMount() {
    console.log("now", this.props)
    // console.log(this.props.filmTypeUrl)
    this.props.filmStore.fetchFilms(this.props.navigation.getParam("filmTypeUrl", ""),this.props.navigation.getParam("edition", ""))
    //console.log(getSnapshot(FilmStore.films))
  }

  // componentWillUnmount() {
  //   this.props.filmStore.clearFilms()
  // }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({item, index}) => (

      <View style={{backgroundColor: colors[index % colors.length]}}>
          <ListItem
              item={item}
              data = {item}
              index={index}
              onPressItem={this._onPressItem}
          />
      </View>
  )

  _onPressItem = (index, item) => {
      console.log("Pressed row: "+index)
      console.log(item)
      //console.log(FilmStore.communityFilms[index].id)
      console.log(this.props.edition)
      this.props.edition === "Community Videos"
        ? this.props.filmStore.addSelectedCommunityFilm(this.props.filmStore.communityFilms[index].id)
        : this.props.filmStore.addSelectedOtherFilm(this.props.filmStore.otherFilms[index].id)
        //xthis.props.navigation.navigate("secondExample", {filmData: item, edition: this.props.edition})
      // this.props.navigator.push({
      //     title: "Hive Player",
      //     component: FilmPlayer,
      //     passProps: {filmData: item, edition: this.props.edition}
      // });
  }

  render() {
    const { filmStore, navigation } = this.props
    const edition = navigation.getParam("edition", "Community Videos")
    const data = edition === "Community Videos" ? filmStore.communityFilms : filmStore.otherFilms
    console.log(this.props.filmStore, this.props.edition)

    return (

      <View style={styles.container}>
      {
        !filmStore.isFetching ?
            <FlatList
              data={data}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
        :
        <View style={styles.textContainer}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      }
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
    marginTop: 67,
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
    borderRadius: 80/2,
    marginRight: 10,
  },
})
