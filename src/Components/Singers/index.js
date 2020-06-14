import React, { Fragment } from 'react';
const Singers = props => {
    const renderSingers = () => {
        return props.singers.map((item, index) => {
            if (index !== props.singers.length-1) {
                return (
                    <span key={index}>
                        <span className="highlight"
                            onClick={() => console.log(item.id)}>
                            {item.name}
                        </span>{' '}
                        /{' '}
                    </span>
                );
            } else {
                return (
                    <span className="highlight" key={index} onClick={() => console.log(item.id)}>
                        {item.name}
                    </span>
                );
            }
        });
    };

    return (
        <Fragment>
            {Array.isArray(props.singers) ? renderSingers(): ''}
        </Fragment>
    );
}

export default Singers;
