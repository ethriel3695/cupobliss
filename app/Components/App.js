var React = require('react');
var Navigation = require('./Navigation');
var Description = require('./Description');
var Home = require('./Home');
import * as userObject from '../utilities/userObject.js';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selectedPerson: 'Alex',
            user: [],
            users: userObject
        };

        this.updateSelectedUser = this.updateSelectedUser.bind(this);
        this.updateUserObject = this.updateUserObject.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    componentWillMount() {
        this.filterUsers(this.state.selectedPerson);
    }

    updateSelectedUser(person) {
        this.setState({
                selectedPerson: person,
            }, function () {
                this.filterUsers(this.state.selectedPerson);
            }.bind(this));
        };

    
    filterUsers(selectedUser) {
        {userObject.users.user.filter((user) => {
            if (user.name === selectedUser) {
                this.updateUserObject(user);
        }})}
    }

    updateUserObject (user) {
        this.setState({
                user: user
            }, function () {
                this.updateBackground(user);
            }.bind(this));
        };

    updateBackground(user) {
        var backgroundImage = document.getElementsByTagName("body");
        backgroundImage[0].style.backgroundColor = "#D7D7D5";
    }

    render () {
        return (
                <div className='container'>
                    <Navigation
                        users={this.state.users}
                        selectedPerson={this.state.selectedPerson}
                        onSelect={this.updateSelectedUser}
                     />
                    <Home 
                        user={this.state.user}
                    />
                    <Description 
                        user={this.state.user}
                    />
                    
                </div>
        )
    }
}

module.exports = App;