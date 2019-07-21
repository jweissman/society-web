import React from "react";
import AppHeader from "../compounds/AppHeader";
import { Responsive, SegmentGroup, Segment } from "semantic-ui-react";

interface Props {
    userPhotoUrl: string
    onChangeUser: Function
    onVisitHome: Function
}

export default class ActivityFeedPage extends React.Component<Props> {
    render() {
        return <div className="Page">
            <AppHeader
                userName={'Nobody'}
                userPhotoUrl={this.props.userPhotoUrl}
                onChangeUser={this.props.onChangeUser}
                onVisitHome={this.props.onVisitHome}
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
                        {/* <Segment> */}
                            {/* <HeroImage photoUrl={this.props.heroPhotoUrl}> */}
                                {/* {hero} */}
                            {/* </HeroImage> */}
                        {/* </Segment> */}
                        {this.props.children || <Segment>Nothing here!</Segment>}
                    </SegmentGroup>
                </div>
            </main>
        </div> 
    }
}