import Human from "../values/Human";
import React from "react";
import HumanService from "../services/HumanService";
import ProfilePage from "./pages/ProfilePage";
import { Container, Header, Segment } from "semantic-ui-react";
import PhotoTemplate from "./templates/PhotoTemplate";
import faker from 'faker';

import './Society.scss';

interface Props {
  template?: boolean
}

interface State {
  constructed: boolean
  progress: number
  user?: Human
  human?: Human
}

export default class Society extends React.Component<Props, State> {
  state: State = {
    constructed: false,
    progress: 0,
    user: undefined,
    human: undefined,
  }

  async componentDidMount() {
    console.log("Mounted society...")
    await HumanService.seed((progress: number) => {
      this.setState({ progress })
    })
    console.log("Done with seed!")
    this.setState({
      user: HumanService.lookup(1),
      constructed: true,
      human: HumanService.lookup(1),
    })
  }

  updateHuman = async (human: Human) => {
    console.log("UPDATE HUMAN", { human, name: human.name })
    await this.setState({ human })
    console.log("DONE UPDATE HUMAN")
  }
  updateUser = async (user: Human) => {
    console.log("UPDATE USER", { user, name: user.name })
    await this.setState({ user })
    console.log("DONE UPDATE USER")
  }
  visitHome = () => {
    let { user } = this.state
    if (user) {
      console.log("VISIT HOME", { user, name: user.name })
      this.updateHuman(user)
    }
  }

  render() {
    let { constructed, human, user } = this.state;
    if (constructed && human !== undefined && user !== undefined) {
      return this.props.template ? <PhotoTemplate
        onChangeUser={this.updateUser}
        onVisitHome={() => {}}
        userPhotoUrl={faker.image.people()}
        heroPhotoUrl={faker.image.people()} doTemplateContent
      /> : <ProfilePage
        human={human}
        user={user}
        onVisitHome={this.visitHome}
        changeHuman={this.updateHuman}
        changeUser={this.updateUser}
        lookupHuman={HumanService.lookup}
      />
    } else {
      return <div className='Construction'>
        <Container>
          <Segment>
            <Header>Constructing the World...</Header>
            Please wait just a moment, building some interesting people ({this.state.progress}%)...
            (Please note: we'll only do this once!)
          </Segment>
        </Container>
      </div>
    }
  }
}