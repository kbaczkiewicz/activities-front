import {Link} from "react-router-dom";

import React from 'react';

const Navbar = props => {
    let links = {left: [], right: []};
    for (const [index, value] of props.links.entries()) {
        if ('left' === value.align) {
            links.left.push(<Link key={index} to={value.href} className={"nav-item nav-link"}>{value.name}</Link>)
        }

        else if ('right' === value.align) {
            links.right.push(<Link key={index} to={value.href} className={"nav-item nav-link"}>{value.name}</Link>)
        }
    }

    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className='navbar-brand'>Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {links.left}
                    </div>
                </div>
                {links.right}
            </nav>
    )
};

export default Navbar;
