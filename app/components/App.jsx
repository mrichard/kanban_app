import React from 'react';
import Note from './Note/Note.jsx';

export default class App extends React.Component {
    displayName () {
        return 'App';
    }
    render () {

        var notes = [{
            task: 'Get Milk'
        }, {
            task: 'Go to Gym'
        }, {
            task: 'Buy Flowers'
        }];

        return (
            <div>
                <ul>{notes.map((note, i) =>
                    <li key={'note' + i}>
                        <Note task={note.task} />
                    </li>
                )}</ul>
            </div>
        );
    }
}
