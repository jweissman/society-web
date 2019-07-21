import React from 'react';
import { SegmentGroup, Segment, Container, Header, Icon } from "semantic-ui-react";
import { UserBubble } from "../atoms/UserBubble";
import Human, { Event } from "../../values/Human";
import './Activity.scss';

interface Props { activity: Event, human: Human }
const Activity: React.FC<Props> = ({ activity, human }) => <SegmentGroup
    key={activity.id}
    className='Activity'
>
    <Segment color={human.favoriteColor} className='Activity-header'>
        <Container className='Activity-author'>
            {human.photoUrl && <UserBubble photoUrl={human.photoUrl} />}
            <b>{human.name}</b> did something!
        </Container>
        <div className='Activity-actions'>
            <span className='Activity-action'>
                <span>0</span>
                <Icon name='heart' color='red' />
            </span>
            <span className='Activity-action'>
                <span>1</span>
                <Icon name='favorite' color='yellow' />
            </span>
        </div>
    </Segment>
    <Segment style={{ backgroundColor: '#eaeaea' }}>
        <Container fluid style={{ width: '30%' }}>
            <Segment>
                <div className='Activity-body'>
                    <Header icon>
                        <Icon name={activity.icon} />
                        {activity.name}
                    </Header>
                    <Container>
                        {activity.description}
                    </Container>
                </div>
            </Segment>
        </Container>
    </Segment>
</SegmentGroup>

export default Activity;