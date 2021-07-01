import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Post from './containers/Post';
import PostList from './components/PostList';
import PostEditor from './containers/PostEditor';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand>RDOGS' Blog</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to='/post-list'>
						Home
					</Nav.Link>
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
					<Route path='/edit-post/:postId'>
						<PostEditor />
					</Route>
				</Switch>
			</Container>
			<footer>
				<div className='app-footer'>
					<span>PDOGS 6.0 Frontend Homework by timicienio</span>
				</div>
			</footer>
		</div>
	);
}

export default App;
