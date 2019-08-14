import React from 'react';
import ToDoList from './components/TodoList';
import AddRec from './components/AddRec';
import { ToDoData } from './shared/Constants';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isAdd: false,
      toDoData: ToDoData,
      selectedItems: [],
      searchVal: '',
      isEdit: false,
      selectedRec: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckSelction = this.handleCheckSelction.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onListItemClcik = this.onListItemClcik.bind(this);
  }

  render() {
    return (
      <div className="todo-main-container">


        {this.state.isAdd ? <AddRec selectedRec={this.state.selectedRec} isEdit={this.state.isEdit} redirectToHomePage={this.redirectToHomePage} onSubmit={this.onSubmit} /> :
          <div>
            <div className="todo-btn-bar">
              <div className="todo-btn-bar-west">
                <span style={{ display: this.state.isOpened ? 'none' : 'block' }}
                  onClick={() => {
                    this.onSelectClick()
                  }}
                >Select</span>
                <span style={{ display: this.state.isOpened ? 'block' : 'none' }}
                  onClick={() => {
                    this.onCancelClick()
                  }}
                >Cancel</span>
              </div>
              <div className="todo-btn-bar-east">
                {this.state.isOpened
                  ? <i onClick={() => { this.onDeleteClick() }} className="fas fa-trash"></i>
                  : <i onClick={() => { this.onAddClick() }} className="fas fa-plus-circle"></i>}
              </div>
            </div>

            <div className="todo-header">ToDo</div>

            <div className="todo-search-box">
              <i className="fas fa-search"></i>
              <input name="searchVal" onChange={this.onSearch} type="text" placeholder="Search"></input>
            </div>
            <ToDoList onListItemClcik={this.onListItemClcik} handleSelection={this.handleCheckSelction} isOpened={this.state.isOpened} toDoData={this.state.toDoData}></ToDoList>
          </div>
        }

      </div>
    );
  }

  onSelectClick() {
    this.setState({ isOpened: true });
  }

  onCancelClick() {
    this.setState({ isOpened: false });
  }

  onDeleteClick() {
    let toDoData = this.state.toDoData;
    this.state.selectedItems.forEach(id => {
      let recIndex = toDoData.findIndex(rec => {
        return rec.id === Number(id)
      });
      toDoData.splice(recIndex, 1);
    })
    this.setState({ toDoData: toDoData, isOpened: false });
  }

  onAddClick() {
    this.setState({ isAdd: true })
  }

  onSubmit(formValues) {
    if (this.state.isEdit) {
      let data = this.state.toDoData;
      for (let i = 0; i < data.length; i++) {
        if (Number(formValues.id) === Number(data[i].id)) {
          data[i].title = formValues.title;
          data[i].description = formValues.description;
        }
      }
      this.setState(state => ({
        isAdd: false,
        isEdit: false,
        toDoData: data
      }))
    } else {
      let newRec = [
        {
          title: formValues.title,
          time: 'Today',
          description: formValues.description,
          id: new Date().getTime()
        }
      ];
      this.setState(state => ({
        isAdd: false,
        isEdit: false,
        toDoData: newRec.concat(state.toDoData)
      }))
    }


  }

  handleCheckSelction(selectedItems) {
    this.setState({
      selectedItems: selectedItems
    })
  }

  redirectToHomePage() {
    this.setState({
      isAdd: false,
      isEdit: false
    })
  }

  onSearch(e) {
    let target = e.target;
    let data = ToDoData;
    if (target.value.length > 0) {
      data = data.filter((rec) => {
        return rec.title.toLowerCase().search(target.value.toLowerCase()) !== -1
      });
    }
    this.setState({ toDoData: data });
  }

  onListItemClcik(selectedRec) {
    this.setState({ isAdd: true, isEdit: true, selectedRec: selectedRec });

  }

}

export default App;
