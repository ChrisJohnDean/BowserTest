import { StackNavigator } from "react-navigation"
import { FirstExampleScreen } from "../views/example/first-example-screen"
import { SecondExampleScreen } from "../views/example/second-example-screen"
import { FilmPlayerScreenLogged } from "../views/example/film-player-screen"
import { CreatorProfileScreen } from "../views/example/creator-profile-screen"

export const ExampleNavigator = StackNavigator(
  {
    firstExample: { screen: FirstExampleScreen },
    secondExample: { screen: SecondExampleScreen },
    filmPlayer: { screen: FilmPlayerScreenLogged },
    creatorProfile: { screen: CreatorProfileScreen },
  },
  {
    headerMode: "none",
  },
)
