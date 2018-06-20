import * as React from "react"
import Button from "react-native-button"
import { NavigationScreenProps } from "react-navigation"
import { View, Text, Picker, StyleSheet, ActivityIndicator, Animated, Easing } from "react-native"

export interface FirstExampleScreenProps extends NavigationScreenProps<{}> {}
//nextScreen = () => this.props.navigation.navigate("secondExample")

const filmEditionUrls = [
  {
    edition: "Community Videos",
    urlString: "https://www.storyhive.com/api/grid-data/portal-community-videos",
  },
  {
    edition: "Music Videos",
    urlString:
      "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/music/cycleId/10",
  },
  {
    edition: "Web Series",
    urlString:
      "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/web/cycleId/12",
  },
  {
    edition: "Digital Shorts",
    urlString:
      "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/short/cycleId/8",
  },
  {
    edition: "Animation",
    urlString:
      "https://www.storyhive.com/api/grid-data/edition-projects/phase/10/cycleType/short/cycleId/9",
  },
]

interface State {
  url: "https://www.storyhive.com/api/grid-data/portal-community-videos"
  currentSelectedEditionId: 0
}

export class FirstExampleScreen extends React.Component<FirstExampleScreenProps, State> {
  public state: State
  animatedValue1: Animated.Value
  animatedValue2: Animated.Value
  animatedValue3: Animated.Value

  constructor(props) {
    super(props)
    this.state = {
      url: "https://www.storyhive.com/api/grid-data/portal-community-videos",
      currentSelectedEditionId: 0,
      // animatedValue3 : new Animated.Value(0),
    }
    this.animatedValue1 = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(0)
    this.animatedValue3 = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    const createAnimation = function(value, duration, easing, delay) {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
      })
    }
    Animated.parallel([
      createAnimation(this.animatedValue1, 1500, Easing.ease, 200),
      createAnimation(this.animatedValue2, 1500, Easing.bounce, 200),
    ]).start()
  }

  _onPress = () => {
    //this.animatedValue2.setValue(0)
    Animated.timing(this.animatedValue2, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      delay: 50,
    }).start()
    this.props.navigation.navigate("secondExample", {
      filmTypeUrl: this.state.url,
      edition: filmEditionUrls[this.state.currentSelectedEditionId].edition,
    })
  }

  _onPressTwo = () => {
    this.animatedValue3.setValue(0)
    Animated.spring(this.animatedValue3, {
      toValue: 1,
    }).start()
  }

  updateUrl = (url, index) => {
    console.log(url, index)
    this.setState({ url: url, currentSelectedEditionId: index })
  }

  _generatePickerItems() {
    const pickerItems = filmEditionUrls.map((item, index) => {
      return <Picker.Item key={index} label={item.edition} value={item.urlString} />
    })
    return pickerItems
  }

  render() {
    const spinText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "720deg"],
    })
    const introButton = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [-600, 70],
    })
    const scaleButton = this.animatedValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.95, 1],
    })
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Animated.View style={{ marginTop: 110, transform: [{ rotate: spinText }] }}>
            <Text style={styles.text}>
              {filmEditionUrls[this.state.currentSelectedEditionId].edition}
            </Text>
          </Animated.View>
        </View>
        {filmEditionUrls.length > 0 ? (
          <Picker selectedValue={this.state.url} onValueChange={this.updateUrl}>
            {this._generatePickerItems()}
          </Picker>
        ) : (
          <View style={styles.textContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.buttonView}>
          <Animated.View style={{ top: introButton, position: "absolute" }}>
            <Button
              containerStyle={{
                padding: 10,
                // marginBottom: 40,
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
          </Animated.View>
        </View>
        <View style={styles.buttonView}>
          <Animated.View style={{ transform: [{ scale: scaleButton }] }}>
            <Button
              containerStyle={{
                padding: 10,
                // marginTop: 100,
                height: 45,
                width: 300,
                overflow: "hidden",
                borderRadius: 4,
                backgroundColor: "#013220",
              }}
              onPress={this._onPressTwo}
              style={{ fontSize: 20, color: "white" }}
            >
              Watch Now 2!
            </Button>
          </Animated.View>
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
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
  },
  text: {
    fontSize: 32,
    alignSelf: "center",
    //justifyContent: "center",
    color: "#800000",
    //marginTop: 110,
    fontFamily: "Futura-Mediumitalic",
    textDecorationLine: "underline",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
})
