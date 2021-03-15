import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErorrBoundary/ErrorBoundary'
  

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: '28' },
      { id: '2', name: 'Pavel', age: '27' },
      { id: '3', name: 'Helen', age: '15'},
    ],
    otherState: 'some other',
    showPersons: false,
  }

 

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = { ...this.state.persons[personIndex] }
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    //slice create a copy, to unmutable changes
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }


  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}><Person
                    click={() => this.deletePersonHandler(index)}
                    name={person.name}
                    age={person.age}
                    changed={(event) => this.nameChangedHandler(event, person.id)} /></ErrorBoundary>
          })}
        </div>
      )

      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red)
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold)
    }


    return (
        <div className={classes.App}>
          <h1>Hi, I'm React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working</p>
          <button
           className={btnClass}
            onClick={this.togglePersonsHandler}>
              Toggle Persons
          </button>
          {persons}
        </div>
    );

    //return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }
}

export default App;
