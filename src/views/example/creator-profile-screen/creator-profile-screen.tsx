import * as React from "react"
import { NavigationScreenProps } from "react-navigation"
import { inject } from "mobx-react"
import { observer } from "mobx-react"
import { UserStoreType } from "../../../models/user-store"
import { Container, Text, Title } from "native-base"
import { MyHeader } from "../../shared/myHeader"
import { WithSubscription } from "../../shared/higher-order-component"

const HeaderHoc = WithSubscription(MyHeader)

export interface CreatorScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStoreType
}

@inject("userStore")
@observer
export class CreatorProfileScreen extends React.Component<CreatorScreenProps, {}> {
  render() {
    return (
      <Container>
        <HeaderHoc navigation={this.props.navigation}>
          <Title>User Profile</Title>
        </HeaderHoc>
        <Text>Hello World</Text>
      </Container>
    )
  }
}
