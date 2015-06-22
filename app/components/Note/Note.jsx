import React from 'react';

export default class Note extends React.Component {
    displayName () {
        return 'Note';
    }
    render () {
        return <div>{this.props.task}</div>;
    }
}
