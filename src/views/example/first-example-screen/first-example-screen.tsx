import * as React from "react"
import Button from "react-native-button"
import { NavigationScreenProps } from "react-navigation"
import{
  View,
  Text,
  Picker,
  StyleSheet,
  ActivityIndicator,
} from "react-native"

export interface FirstExampleScreenProps extends NavigationScreenProps<{}> {}
  //nextScreen = () => this.props.navigation.navigate("secondExample")


const filmEditionUrls = [
  {"edition": "Community Videos", "urlString": "https://www.storyhive.com/api/grid-data/portal-community-videos"},
  {"edition": "Music Videos", "urlString": "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/music/cycleId/10"},
  {"edition": "Web Series", "urlString": "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/web/cycleId/12"},
  {"edition": "Digital Shorts", "urlString": "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/short/cycleId/8"},
  {"edition": "Animation", "urlString": "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/short/cycleId/9"},
]

interface State {
    url: "https://www.storyhive.com/api/grid-data/portal-community-videos",
    currentSelectedEditionId: 0
}

export class FirstExampleScreen extends React.Component<FirstExampleScreenProps, State> {
  public state: State

  constructor(props) {
      super(props)
      this.state = {
        url: "https://www.storyhive.com/api/grid-data/portal-community-videos",
        currentSelectedEditionId: 0,
      }
    }

    _onPress = () => {
      //console.log(this.state.url)
      // console.log("url:222")
      // console.log(filmEditionUrls[this.state.currentSelectedEditionId].edition)
      this.props.navigation.navigate("secondExample", {
        filmTypeUrl: this.state.url, edition: filmEditionUrls[this.state.currentSelectedEditionId].edition,
      })

      // this.props.navigator.push({
      //     title: "Story Hive",
      //     component: FilmList,
      //     passProps: {filmTypeUrl: this.state.url, edition: filmEditionUrls[this.state.currentSelectedEditionId].edition}
      // });
    }


    updateUrl = (url, index) => {
        console.log(url, index)
      this.setState({url: url, currentSelectedEditionId: index})
    }

    _generatePickerItems() {
      const pickerItems = filmEditionUrls.map((item, index) => {
          return <Picker.Item key={index} label={item.edition} value={item.urlString} />
      })
      return pickerItems
    }

    render() {
      console.log("url:222")
      console.log(filmEditionUrls[this.state.currentSelectedEditionId].edition)
        return (
              <View style={styles.container}>
                  <View style={styles.view}>
                      <Text style={styles.text}>{filmEditionUrls[this.state.currentSelectedEditionId].edition}</Text>
                  </View>
                  {
                      filmEditionUrls.length > 0 ?
                      <Picker
                          selectedValue={this.state.url}
                          onValueChange={this.updateUrl}>
                          {this._generatePickerItems()}
                      </Picker>
                      :
                      <View style={styles.textContainer}>
                          <ActivityIndicator size="large" color="#0000ff"/>
                      </View>
                  }
                  <View style={styles.buttonView}>
                      <Button
                          containerStyle={{
                              padding: 10,
                              marginBottom: 30,
                              height: 45,
                              width: 300,
                              overflow: "hidden",
                              borderRadius: 4,
                              backgroundColor: "#013220",
                          }}
                          onPress={this._onPress}
                          style={{ fontSize: 20, color: "white" }}
                      >
                          Watch Now!
                      </Button>
                  </View>
              </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#c2f2d0",
  },
  view: {
      flex: 1,
      justifyContent: "center",
  },
  buttonView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  text: {
      fontSize: 32,
      alignSelf: "center",
      color: "#800000",
      marginTop: 110,
      fontFamily: "Futura-Mediumitalic",
      textDecorationLine: "underline",
  },
  textContainer: {
      flex: 1,
      justifyContent: "center",
  },
})
