import React from 'react';
import { SegmentGroup, Segment, Container, Header, Icon } from "semantic-ui-react";
import { UserBubble } from "../atoms/UserBubble";
import { Event } from "../../values/Human";
import './Activity.scss';
import HeroImage from './HeroImage';
import HumanService from '../../services/HumanService';

interface Props { activity: Event, humanId: number }
const Activity: React.FC<Props> = ({ activity, humanId }) => {
    let human = HumanService.lookup(humanId);
 return (<SegmentGroup
    key={activity.id}
    className='Activity'
>
    <Segment color={human.favoriteColor} className='Activity-header'>
        <Container className='Activity-author'>
            {human.photoUrl && <UserBubble photoUrl={human.photoUrl} />}
            <b>{human.name}</b> did something
            {activity.createdAt &&
            <span style={{color:'#d4d4d4',marginLeft: '5px'}}>at {activity.createdAt.toLocaleTimeString &&
                activity.createdAt.toLocaleTimeString('en-US')}</span>
            }
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
    <HeroImage
        photoUrl={`https://source.unsplash.com/random/1080x720/?${activity.keywords.join('+')}`}
    >
        {/* // backgroundColor: '#eaeaea'
                // background: `center / 100% url(https://source.unsplash.com/random/640x480/?${activity.keywords.join('+')})`,
                // backgroundSize: 'cover',
                // height: '280px',
        // }}> */}
        {/* <Container fluid style={{ width: '30%' }}> */}
            <Segment style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                width: '100%'
            }}>
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
        {/* </Container> */}
    </HeroImage>

    <Segment style={{ backgroundColor: '#f4f4f4' }}>
        <Container fluid style={{ width: '30%' }}>
            {activity.keywords.map(k => `#${k}`)}
        </Container>
    </Segment>
</SegmentGroup>);
}

export default Activity;