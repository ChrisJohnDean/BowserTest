import { StackNavigator } from "react-navigation"
import { ExampleNavigator } from "./example-navigator"
import { DrawerStack } from "./drawer-navigator"

export const RootNavigator = StackNavigator(
  {
    exampleStack: { screen: ExampleNavigator },
    //drawerStack: { screen: DrawerNavigation },
    drawerStack: { screen: DrawerStack },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
