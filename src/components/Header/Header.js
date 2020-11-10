import React from 'react';
import classes from './Header.module.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.setHeight = this.setHeight.bind(this);
    }

    state = {
        headerHeight: null
    };


    setHeight() {
        this.setState(() => {
            return {
                headerHeight: document.querySelector('.' + classes.header).clientHeight
            }               
        })
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.setHeight);
    }

    componentDidMount() {
        window.addEventListener('resize', this.setHeight);
        this.setHeight();

    }

    render() {
        return (
            <React.Fragment>
                <header className={classes.header}>
                    <div className="container">
                        <div className={classes['header-flex']}>
                            {this.props.children}
                        </div>
                    </div>            
                </header>
                <div style={{position: 'relative', width: '100%', height: this.state.headerHeight + 'px'}}></div> 
            </React.Fragment>
        );
     
    }
}

export default Header;