import React, { ReactNode } from "react";
import AppHeader from "../compounds/AppHeader";
import { Responsive, Segment, Header, Icon, SegmentGroup } from "semantic-ui-react";
import './PhotoTemplate.scss';
import HeroImage from "../compounds/HeroImage";
import faker from 'faker';

interface Props {
    heroPhotoUrl: string
    userPhotoUrl: string
    userName?: string
    aside?: ReactNode
    heroContent?: ReactNode
    doTemplateContent?: boolean
    onChangeUser: Function
    onVisitHome: Function
    onVisitProfile: Function
}

class PhotoTemplate extends React.Component<Props> {
    render() {
        let aside = this.props.aside
        let hero = this.props.heroContent || this.props.doTemplateContent && <>
            <Segment style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <Header icon>
                    <Icon name='user' color='grey' />
                    Odysseus
                    <Header.Subheader>this could be you!</Header.Subheader>
                </Header>
            </Segment>
        </>
        let userName = this.props.userName || 'Odysseus'
        return (<div className="Page">
            <AppHeader
                userName={userName}
                userPhotoUrl={this.props.userPhotoUrl}
                onChangeUser={this.props.onChangeUser}
                onVisitHome={this.props.onVisitHome}
                onVisitProfile={this.props.onVisitProfile}
            />
            <main className='App-main'>
                <Responsive minWidth={992}>
                    <div className='Page-aside'>
                        {aside}
                    </div>
                </Responsive>
                <div className='Page-main'>
                    <SegmentGroup className='Page-mainGroup'>
                        {/* <Segment> */}
                            <HeroImage photoUrl={this.props.heroPhotoUrl}>
                                {hero}
                            </HeroImage>
                        {/* </Segment> */}
                        {this.props.children || <Segment>Nothing here!</Segment>}
                    </SegmentGroup>
                </div>
            </main>
        </div>)
    }
}
export default PhotoTemplate;