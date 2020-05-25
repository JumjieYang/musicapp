import React, {Component} from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import './index.css'
class Header extends Component {
    render () {
        const icon = {
            fontSize: '20px',
            
        }
        return (
            <div className="header">
                <ReactJkMusicPlayer />
            </div>
        )
    }
}

export default Header;