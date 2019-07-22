import React from 'react';
import { Dropdown } from "semantic-ui-react";
import HumanService from "../../services/HumanService";
import Human from "../../values/Human";

interface Props { onChangeUser: Function, onVisitHome: Function, userName: string }
const Masquerade: React.FC<Props> = (props: Props) => <Dropdown
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
    style={{ width: '258px', color: '#000' }}
    options={HumanService.all().map((human: Human) => {
        return {
            key: human.id,
            text: human.name,
            value: human.id,
            image: { avatar: true, src: human.photoUrl }
        }})}
    />

    export default Masquerade