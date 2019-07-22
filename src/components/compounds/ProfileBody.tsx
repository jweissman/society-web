import React from 'react';
import { Responsive, Segment, Header, Icon, Container, SegmentGroup, Input, Button, Divider } from "semantic-ui-react";
import Human from "../../values/Human";
import Activity from './Activity';
import UserTile from './UserTile';
import './ProfileBody.scss'

interface Props {
    me?: boolean
    human: Human
    lookupHuman: (id: number) => Human
    changeHuman: (h: Human) => void
    createActivity: (h: Human, s: string) => void
}

interface State {
    input: string
}

class ProfileBody extends React.Component<Props, State> {
    state = { input: '' }
    handleInputChange = (e: any) => { this.setState({ input: e.target.value })}
    render() {
        let { me, human, lookupHuman, changeHuman, createActivity } = this.props;
        let activities = human.activities.slice().sort((a,b) =>
            a.createdAt > b.createdAt ? -1 : 1
        )

        return (<div className='Profile-body'>
            {/* <SegmentGroup horizontal> */}
            <Responsive as={Segment} minWidth={968} color={human.favoriteColor} className='aside-wrapper'>
            <div className='aside'>
                <UserTile
                    human={human}
                    lookupHuman={lookupHuman}
                    changeHuman={changeHuman}
                />
            </div>
            </Responsive>
            <Segment className='main'>
                {me && <>
                    <Header size='huge'>What are you up to?</Header>
                    <Input
                        size='massive'
                        // icon='share'
                        placeholder="What's going on?"
                        value={this.state.input}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        primary type='submit' size='massive'
                        onClick={()=>
                            // alert(JSON.stringify(this.state.input))
                            createActivity(human, this.state.input)
                        }
                    >
                        <Icon name='share' />
                        Share
                    </Button>
                    <br/><br/>
                    <Divider />
                </>}
                {/* <Segment> */}
                    <div className='Feed'>
                    <Responsive as={Segment} maxWidth={968} color={human.favoriteColor} className='inline-header-wrapper'>
                        <UserTile
                            human={human}
                            lookupHuman={lookupHuman}
                            changeHuman={changeHuman}
                        />
                    </Responsive>

                    <Header size='large'>
                        {human.name}'s Recent Activity
                        <Header.Subheader>
                            {activities.length} events shown
                        </Header.Subheader>
                        </Header>

                    <Container>
                        {/* <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}> */}
                            {activities.map(activity => <Activity
                                key={activity.id}
                                activity={activity}
                                humanId={human.id}
                            />)}
                        {/* </ReactCSSTransitionGroup> */}
                    </Container>
                </div>
                {/* </Segment > */}
            </Segment>
            {/* </SegmentGroup> */}
        </div >);
    }
}

export default ProfileBody;
