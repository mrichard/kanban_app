import React from 'react';
import Note from '../Note/Note';

export default class notes extends React.Component {
    render () {
        var notes = this.props.items;

        return (
            <ul className='notes'>{notes.map((note, i) =>
                <li className='note' key={'note + i'}>
                    <Note task={note.task} />
                </li>
            )}</ul>
        );
    }
}
