import React from "react";
import { Segment } from "semantic-ui-react";

interface Props { photoUrl: string }
export default class HeroImage extends React.Component<Props>  {
    render() {
        let { photoUrl } = this.props;
        return <Segment
            className='Profile-header'
            style={{
                background: `center / 100% url(${photoUrl}) fixed`,
                backgroundSize: 'cover'
            }}
        >
            {this.props.children}
        </Segment>;
    }
}