import React from 'react';
// import './UserBubble.scss';
export const UserBubble: React.FC<{ photoUrl: string }> = ({ photoUrl }) => <div
    className='User-Bubble' style={{
        background: `center / 150% url(${photoUrl})`,
    }}
/>
