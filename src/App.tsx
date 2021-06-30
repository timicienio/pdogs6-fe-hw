import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PostList from './containers/PostList';
import PostEditor from './containers/PostEditor';
import { Nav, Navbar } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand>RDOGS' Blog</Navbar.Brand>
				<Nav>
					<Nav.Link href='/home'>Home</Nav.Link>
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/home' />
				</Route>
				<Route path='/home'>
					<PostList />
				</Route>
				<Route path='/edit-post'>
					<PostEditor />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
