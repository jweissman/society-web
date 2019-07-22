import React from 'react';
import { Menu } from "semantic-ui-react";
import './AppHeader.scss';
import { UserBubble } from '../atoms/UserBubble';
import Masquerade from '../atoms/Masquerade';


interface Props {
    userName: string
    userPhotoUrl: string
    onChangeUser: Function
    onVisitHome: Function
    onVisitProfile: Function
}
const AppHeader: React.FC<Props> = ({
    userName,
    userPhotoUrl,
    onVisitHome,
    onVisitProfile,
    onChangeUser,
}) => <Menu className='App-header'>
        <Menu.Item header>Society</Menu.Item>
        <Menu.Item name='Home' link onClick={(e) => onVisitHome()}></Menu.Item>
        <Menu.Item name='Profile' link onClick={(e) => onVisitProfile()}></Menu.Item>
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