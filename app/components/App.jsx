import React from 'react';
import Note from './Note/Note.jsx';

export default class App extends React.Component {
    displayName () {
        return 'App';
    }
    render () {
        return (
            <Note />
        );
    }
}
