import React from 'react';
import { Dropdown, Menu } from "semantic-ui-react";
import './AppHeader.scss';
import { UserBubble } from '../atoms/UserBubble';
import HumanService from '../../services/HumanService';
import Human from '../../values/Human';

interface MasqueradeProps { onChangeUser: Function, onVisitHome: Function, userName: string }
const Masquerade: React.FC<MasqueradeProps> = (props: MasqueradeProps) => <Dropdown
    button
    size='small'
    className='icon'
    floating
    labeled
    icon='user circle'
    text={props.userName}
    onChange={async (_e, { value }) => {
        // @ts-ignore
        let id: number = value
        await props.onChangeUser(HumanService.lookup(id))
        props.onVisitHome()
    }}
    search
    header="Let the Masquerade begin!"
    style={{ width: '258px' }}
    options={HumanService.all().map((human: Human) => {
        return {
            key: human.id,
            text: human.name,
            value: human.id,
            image: { avatar: true, src: human.photoUrl }
        }})}
    />

interface Props {
    userName: string
    userPhotoUrl: string
    onChangeUser: Function
    onVisitHome: Function
}
const AppHeader: React.FC<Props> = ({
    userName,
    userPhotoUrl,
    onVisitHome,
    onChangeUser,
}) => <Menu className='App-header'>
    <Menu.Item name='society' className='App-name'></Menu.Item>
        <Menu.Item>
            <Masquerade
                userName={userName}
                onVisitHome={onVisitHome}
                onChangeUser={onChangeUser}
            />
        </Menu.Item>
        <Menu.Item position='right'>
            <div
                className='App-user'
                onClick={(e) => onVisitHome()}
                style={{
                    cursor: 'pointer'
                }}
            >
                <UserBubble photoUrl={userPhotoUrl} />
                {userName}
            </div>
        </Menu.Item>
    </Menu>

export default AppHeader;