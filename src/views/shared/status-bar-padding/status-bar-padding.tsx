import * as React from "react"
import { View } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

export function StatusBarPadding() {
  var newHeight = getStatusBarHeight() + 5
  return <View style={{ paddingTop: newHeight, backgroundColor: "#e43446" }} />
}
