import React from 'react';
import { Responsive, Segment, Header, Icon, Container } from "semantic-ui-react";
import Human from "../../values/Human";
import Activity from './Activity';
import UserTile from './UserTile';
import './ProfileBody.scss'

interface Props {
    human: Human
    lookupHuman: Function
    changeHuman: Function
}

const ProfileBody: React.FC<Props> = ({ human, lookupHuman, changeHuman }: Props) => <div className='Profile-main'>
    <div className='Profile-body'>
        <Responsive minWidth={992}>
            <UserTile
                human={human}
                lookupHuman={lookupHuman}
                changeHuman={changeHuman}
            />
        </Responsive>
        <Segment className='Feed'>
            <Responsive maxWidth={991}>
                <UserTile
                    human={human}
                    lookupHuman={lookupHuman}
                    changeHuman={changeHuman}
                />
            </Responsive>
            <Header>{human.name}'s Recent Activity</Header>
            <Container>
                {human.activities.map(activity => <Activity activity={activity} human={human} />)}
            </Container>
        </Segment>
    </div>
</div>

export default ProfileBody;
