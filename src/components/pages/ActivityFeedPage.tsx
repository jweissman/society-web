import React from "react";
import AppHeader from "../compounds/AppHeader";
import { Responsive, SegmentGroup, Segment } from "semantic-ui-react";
import './ActivityFeedPage.scss';
import HumanService from "../../services/HumanService";
import Human, { Event } from '../../values/Human';
import Activity from "../compounds/Activity";

interface Props {
    user: Human
    userPhotoUrl: string
    onChangeUser: Function
    onVisitHome: Function
    onVisitProfile: Function
}

export default class ActivityFeedPage extends React.Component<Props> {
    render() {
        let items: Event[] = HumanService.all().
            filter(human => this.props.user.friends.includes(human.id)).
            flatMap(human => human.activities);

        items = items.sort((a: Event, b: Event) => a.createdAt > b.createdAt ? -1 : 1)
        return <div className="Page">
            <AppHeader
                userName={'Nobody'}
                userPhotoUrl={this.props.userPhotoUrl}
                onChangeUser={this.props.onChangeUser}
                onVisitHome={this.props.onVisitHome}
                onVisitProfile={this.props.onVisitProfile}
            />
            <main className='App-main'>
                <Responsive minWidth={992}>
                    <div className='Page-aside'>
                        <Segment>Nothing here either!</Segment>
                        {/* {aside} */}
                    </div>
                </Responsive>
                <div className='Page-main'>
                    <SegmentGroup className='Page-mainGroup'>
                        {items.map(it => it.creatorId && <Activity
                            activity={it}
                            humanId={it.creatorId}
                        />)}
                        {/* <Segment> */}
                            {/* <HeroImage photoUrl={this.props.heroPhotoUrl}> */}
                                {/* {hero} */}
                            {/* </HeroImage> */}
                        {/* </Segment> */}
                        {/* {this.props.children || <Segment>Nothing here!</Segment>} */}
                    </SegmentGroup>
                </div>
            </main>
        </div> 
    }
}