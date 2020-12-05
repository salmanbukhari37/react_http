import React, { Component } from 'react';
// import axios from "axios";
import axios from "../../axios";
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    };

    componentDidMount() {
        axios.get("/posts")
                .then(response => {
                    console.log(response);
                    const posts = response.data.slice(0, 4);
                    const updatedPosts = posts.map(post => {
                        return {
                            ...post,
                            author: "Max",
                        }
                    })
                    this.setState({
                        posts: updatedPosts
                    });
                })
                .catch(err => {
                    console.log(err);
                    // this.setState({
                    //     error: true
                    // })
                });
    }

    render () {
        const {posts} = this.state;

        let renderPosts = <p style={{textAlign: "center"}}>Somthing went wrong!</p>;

        if (!this.state.error) {
            renderPosts = posts.map(({id, title, body, author}, index) => <Post 
                                                                                    title={title} 
                                                                                    body={body} 
                                                                                    author={author} 
                                                                                    clicked={() => this.postSelectedHandler(id)}
                                                                                    key={index+"-"+id}/>);
        }

        return (
            <div>
                <section className="Posts">
                    {renderPosts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;