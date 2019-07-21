import React from 'react';
import Human from "../../values/Human";
import { Segment, Header, Icon, SegmentGroup } from "semantic-ui-react";
import { UserBubble } from "../atoms/UserBubble";

interface Props { human: Human, lookupHuman: Function, changeHuman: Function }
const UserTile: React.FC<Props> = ({ human, lookupHuman, changeHuman }) => <Segment className='User-Tile' color={human.favoriteColor}>
    {human.photoUrl && <UserBubble photoUrl={human.photoUrl} />}
    {/* <div className='User-Bubble' style={{
                    background: `center / 150% url(${human.photoUrl})`,
                }} /> */}
    <Header size='large'>
        {human.name}
        <Header.Subheader>
            {human.about}
        </Header.Subheader>
    </Header>
    <Header>Quote</Header>
    <i>"{human.quote}"</i>
    <Segment className='Friends'>
        <Header size='tiny' icon>
            <Icon name='group' />
            Friends of {human.name}
        </Header>
        <SegmentGroup>
            {human.friends.map((id: number) => {
                let h = lookupHuman(id)
                return <Segment
                    className='Friends--list-item'
                    compact
                    color={h.favoriteColor}
                    key={h.id}
                    onClick={() => changeHuman(h)}
                >
                    <UserBubble photoUrl={h.photoUrl} />
                    {h.name}
                </Segment>
            })}
        </SegmentGroup>
    </Segment>
</Segment>
export default UserTile;