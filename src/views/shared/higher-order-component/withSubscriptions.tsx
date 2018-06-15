import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { FilmStoreType } from "../../../models/Filmstore"

export interface MySubscriptionProps extends NavigationScreenProps<{}> {}

export var WithSubscription = WrappedComponent => {
  class WithSubscription extends React.Component<MySubscriptionProps, {}> {
    render() {
      //console.log("hooked up", this.props.navigation)
      return <WrappedComponent navigation={this.props.navigation} />
    }
  }
  return WithSubscription
}
