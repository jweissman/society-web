import Human, { LifeEvent } from "../values/Human";
import React from "react";
import HumanService from "../services/HumanService";
import ProfilePage from "./pages/ProfilePage";
import { Container, Header, Segment, SegmentGroup, Progress } from "semantic-ui-react";
import PhotoTemplate from "./templates/PhotoTemplate";
import faker from 'faker';
import { Event } from '../values/Human'

import './Society.scss';
import HeroImage from "./compounds/HeroImage";
import ActivityFeedPage from "./pages/ActivityFeedPage";

type Page = 'Home' | 'Profile'

interface Props {
  template?: boolean
}

interface State {
  constructed: boolean
  progress: number
  user?: Human
  human?: Human
  page: Page
}

export default class Society extends React.Component<Props, State> {
  state: State = {
    constructed: false,
    progress: 0,
    user: undefined,
    human: undefined,
    page: 'Profile'
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
    await this.setState({ human })
  }

  updateUser = async (user: Human) => {
    await this.setState({ user })
  }

  visitProfile = () => {
    let { user } = this.state
    if (user) {
      console.log("VISIT HOME", { user, name: user.name })
      this.updateHuman(user)
      this.setState({ page: 'Profile' })
    }
  }

  visitHome = () => {
      this.setState({ page: 'Home' })
  }

  createActivity: (h: Human, d: string) => void = (human, description) => {
    let e: Event = new LifeEvent(human.id, "a thing happened", description, 'favorite', ['fun'])
    human.activities.push(e)
    // console.log("new activites", human.activities)
    this.setState({ human })
  };

  renderProfileTemplate() {
    return <PhotoTemplate
        onChangeUser={this.updateUser}
        onVisitHome={() => {}}
        onVisitProfile={() => {}}
        userPhotoUrl={faker.image.people()}
        heroPhotoUrl={faker.image.people()}
        doTemplateContent
      />;
  }

  renderPage = () => {
    if (!this.state.user || !this.state.human) {
      return <p>no user or human?</p>
    }
    switch(this.state.page) {
      case 'Home': return this.state.user.photoUrl && <ActivityFeedPage
        user={this.state.user}
        userPhotoUrl={this.state.user.photoUrl}
        onVisitHome={this.visitHome}
        onVisitProfile={this.visitProfile}
        onChangeUser={this.updateUser}
      />
      case 'Profile': return this.props.template ? this.renderProfileTemplate() : <ProfilePage
        human={this.state.human}
        user={this.state.user}
        onVisitHome={this.visitHome}
        onVisitProfile={this.visitProfile}
        changeHuman={this.updateHuman}
        changeUser={this.updateUser}
        lookupHuman={HumanService.lookup}
        createActivity={this.createActivity}
      />
    }
  }

  render() {
    let { constructed, human, user } = this.state;
    if (constructed) { //} && human !== undefined && user !== undefined) {
      return this.renderPage();
      // return this.props.template ? this.renderProfileTemplate() : <ProfilePage
      //   human={human}
      //   user={user}
      //   onVisitHome={this.visitProfile}
      //   changeHuman={this.updateHuman}
      //   changeUser={this.updateUser}
      //   lookupHuman={HumanService.lookup}
      // />
    } else {
      return <div className='Construction'>
        <Container>
          <SegmentGroup>
            <HeroImage photoUrl={"https://source.unsplash.com/random"}  />
            <Segment>
              <Header>Constructing the World...</Header>
              Please wait just a moment, building some interesting people
              (Please note: we'll only do this once!)
          </Segment>
          <Segment>
            <Progress value={this.state.progress} total={100} />
          </Segment>
          </SegmentGroup>
        </Container>
      </div>
    }
  }
}