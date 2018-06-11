import { DrawerNavigator } from "react-navigation"
import { FirstDrawerScreen } from "../views/example/first-drawer-screen"
import { SecondDrawerScreen } from "../views/example/second-drawer-screen"

export const DrawerStack = DrawerNavigator(
  {
    screen1: { screen: FirstDrawerScreen },
    screen2: { screen: SecondDrawerScreen },
  },
  {
    drawerPosition: "right",
    initialRouteName: "screen1",
    //drawerBackgroundColor: "blue",
    drawerBackgroundColor: "#FDFBE0",
    drawerWidth: 300,
  },
)
