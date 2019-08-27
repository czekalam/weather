import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import '../style/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Link
  } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }
    handleChange=(event) => {
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit=(event) => {
        this.props.history.push(`/${this.state.value}`);
    }
    render() {
        return (
            <div className='search'>
                <Link to={ {pathname: '/'}} style={{ textDecoration: 'none' }}>
                    <p className='title'>Weather Search</p>
                </Link>
                <form onSubmit={this.handleSubmit}>
                    <input className='text-input' type="text" value={this.state.value} onChange={this.handleChange} />
                    <button className='submit'><FontAwesomeIcon icon="search" /></button>
                </form>
            </div>
        );
    }
}
export default withRouter(Search);