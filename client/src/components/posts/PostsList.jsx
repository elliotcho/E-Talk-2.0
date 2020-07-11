import React, {Component} from 'react';
import CreatePost from './CreatePost';
import Post from './Post';
import './Posts.css';

class PostsList extends Component{
    constructor(){
        super();

        this.state ={posts: [{id: "1", content: "This is content"}]}

        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    addPost(content){
        const {posts} =this.state;

        posts.unshift({
            id: "2",
            content
        });

        this.setState({posts});
    }

    deletePost(id){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        const {posts} = this.state;

        for(let i=0;i<posts.length;i++){
            if(posts[i].id === id){
                posts.splice(i, 1);
                break;
            }
        }

        this.setState({posts});
    }

    render(){
        const posts = this.state.posts.map(post =>(
            <Post key = {post.id}  id = {post.id} content = {post.content} deletePost={this.deletePost}/>
        ));

        return(
            <div>
                <CreatePost addPost ={this.addPost}/>

                {posts}
            </div>
        )
    }
}

export default PostsList;