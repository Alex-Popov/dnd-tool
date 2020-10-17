import React from 'react';
import API from '../core/api';
import Auth from '../auth';
import { withTheme } from '@material-ui/core/styles';


const getUsers = () => {
    API.user.getAll()
        .then(data => console.log(data))
        .catch(error => {})
}
const getCurrentUser = () => {
    API.user.getCurrent()
        .then(data => console.log(data))
        .catch(error => {})
}
function getCategories() {
    API.category.getAll()
        .then(data => console.log(data))
        .catch(error => {})
}



const handleLogout = () => {
    API.auth.logout()
        .then(() => Auth.logout())
        .catch(() => {});
}


class Tester extends React.Component {
    static contextType = Auth.Context;
    state = {
        name: '',
        id: ''
    };
    createCategory = () => {
        API.category.save({
            name: this.state.name
        })
            .then(data => console.log(data))
            .catch(error => {})
    }
    deleteCategory = () => {
        API.category.deleteById(this.state.id)
            .then(data => console.log(data))
            .catch(error => {})
    }
    getCategoryByParent = () => {
        API.category.getAllByParentId(this.state.id)
            .then(data => console.log(data))
            .catch(error => {})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        const {palette, shadows, spacing, typography, zIndex} = this.props.theme;
        console.log(this.props.theme);
        console.log('palette', palette);
        console.log('shadows', shadows);
        console.log('typography', typography);
        console.log('zIndex', zIndex);
        console.log(spacing());

        return (
            <div className="app">
                <h1>[App Body]</h1>
                <Auth.IsAdmin>
                    <button onClick={getUsers} className="waves-effect waves-light btn">Get Users</button>
                </Auth.IsAdmin>
                <button onClick={getCurrentUser} className="waves-effect waves-light btn">Get Current User</button>

                <hr/>
                <button onClick={getCategories} className="waves-effect waves-light btn">Get Categories</button>
                <div>
                    <input name="name" value={this.state.name} onChange={this.handleChange} />
                    <button onClick={this.createCategory} className="waves-effect waves-light btn">Create Category</button>
                </div>
                <div>
                    <input name="id" value={this.state.id} onChange={this.handleChange} />
                    <button onClick={this.deleteCategory} className="waves-effect waves-light btn">Delete Category</button>
                    <button onClick={this.getCategoryByParent} className="waves-effect waves-light btn">Get Category By Parent</button>
                </div>

                <Auth.IsAuthenticated>
                    <hr/>
                    <button onClick={handleLogout} className="btn red">Logout</button>
                </Auth.IsAuthenticated>
            </div>
        );
    }
}
export default withTheme(Tester);