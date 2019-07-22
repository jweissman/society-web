import React from "react";
import Human from "../../values/Human";
import { Header, Icon, Segment, SegmentGroup, Container } from 'semantic-ui-react';
import './ProfilePage.scss';
import PhotoTemplate from "../templates/PhotoTemplate";
import ProfileBody from "../compounds/ProfileBody";
import faker from 'faker';
import { UserBubble } from "../atoms/UserBubble";

interface Props {
    human: Human
    user: Human
    changeUser: (u: Human) => void
    changeHuman: (h: Human) => void
    lookupHuman: (id: number) => Human
    createActivity: (h: Human, d: string) => void
    onVisitHome: Function
    onVisitProfile: Function
}

export default class ProfilePage extends React.Component<Props> {
    render() {
        let { human, user, changeHuman, lookupHuman, createActivity } = this.props;
        let me = user === human;
        return <PhotoTemplate
            onChangeUser={this.props.changeUser}
            onVisitHome={this.props.onVisitHome}
            onVisitProfile={this.props.onVisitProfile}
            userName={user.name}

            userPhotoUrl={user.photoUrl || faker.image.people()}
            heroPhotoUrl={human.photoUrl || faker.image.people()}
            heroContent={
                <SegmentGroup raised className='UserOverlay'>
                    <Segment>
                        <Header>
                            {human.photoUrl && <UserBubble photoUrl={human.photoUrl} />}
                            {human.name}
                            {me && <Header.Subheader>this is you!</Header.Subheader>}
                        </Header>
                    </Segment>
                    <Segment>{human.about}</Segment>
                    <Segment>
                        <div style={{
                            fontSize: '62.5%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='user' size='tiny' color='green' />
                                    {human.friends.length} Friends
                            </Header>
                            </div>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='group' size='tiny' color='violet' />
                                    {human.friends.length} Groups
                            </Header>
                            </div>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='heart' size='tiny' color='red' />
                                    {human.friends.length} Hearts
                                </Header>
                            </div>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='star' size='tiny' color='yellow' />
                                    {human.friends.length} Stars
                                </Header>
                            </div>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='plus' size='tiny' color='blue' />
                                    {human.friends.length} Votes
                                </Header>
                            </div>
                            <div className='totem'>
                                <Header icon size='tiny'>
                                    <Icon name='mail forward' size='tiny' color='olive' />
                                    {human.friends.length} Links
                                </Header>
                            </div>
                        </div>
                    </Segment>
                </SegmentGroup>
            }
        >
            <ProfileBody
                me={me}
                human={human}
                changeHuman={changeHuman}
                lookupHuman={lookupHuman}
                createActivity={(human: Human, desc: string )=>{
                    console.log("CREATE IT", { human, desc })
                    createActivity(human, desc)
                }}
            />

        </PhotoTemplate>
    }
}