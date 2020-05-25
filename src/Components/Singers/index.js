import React, { Fragment } from 'react';
import { getSingerInfoAction} from "../../Store/Action";
import { useDispatch } from 'react-redux';
const Singers = props => {
    const dispatch = useDispatch();
    const renderSingers = () => {
        return props.singers.map((item, index) => {
            if (index !== props.singers.length-1) {
                return (
                    <span key={index}>
                        <span className="highlight"
                            onClick={() => dispatch(getSingerInfoAction(item.id))}>
                            {item.name}
                        </span>{' '}
                        /{' '}
                    </span>
                );
            } else {
                return (
                    <span className="highlight" key={index} onClick={() => dispatch(getSingerInfoAction(item.id))}>
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
