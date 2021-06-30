import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './containers/Post';
import PostList from './containers/PostList';
import PostEditor from './containers/PostEditor';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand>RDOGS' Blog</Navbar.Brand>
				<Nav>
					<Nav.Link href='/'>Home</Nav.Link>
				</Nav>
			</Navbar>
			<Container className='body-container'>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/post-list' />
					</Route>
					<Route path='/post-list'>
						<PostList />
					</Route>
					<Route path='/post/:id'>
						<Post />
					</Route>
					<Route path='/edit-post'>
						<PostEditor />
					</Route>
				</Switch>
			</Container>
		</div>
	);
}

export default App;
