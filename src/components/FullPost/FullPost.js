import React, { Component } from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: ""
    };

    componentDidUpdate() {
        if (this.props.id ) {

            if ( !this.state.loadedPost || ( this.state.loadedPost && this.state.loadedPost.id !== this.props.id ) ) {
                axios.get(`/posts/${this.props.id}`)
                     .then(response => {
                         this.setState({
                             loadedPost: response.data
                         })
                     });
            }
        }
    }

    deletePostHandler = (id) => {
        if ( this.props.id ) {
            axios.delete("/posts/" + this.props.id)
                .then(response => {
                    console.log(response);
                });
        }
    }


    render () {
        const {id} = this.props;
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;


        if(id) {
            post = <p style={{textAlign: "center"}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={() => this.deletePostHandler(1)}>Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;