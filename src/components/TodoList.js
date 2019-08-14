import React from "react";
import './TodoList.css'
import { Colors } from '../shared/Constants';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        };
        this.handleSelection = this.handleSelection.bind(this);
    }

    render() {
        return (
            <div className="todo-list-container">
                {this.props.toDoData.map((item, index) => (
                    <div key={index}>
                        <div style={{ display: this.props.isOpened? 'inline-block': 'none' }}>
                            <input id={item.id} name='check' onChange={this.handleSelection} type="checkbox"/>
                        </div>
                        <div className="todo-list-item" onClick={this.onListItemClcik.bind(this,item)} style={{
                            display: this.props.isOpened?'inline-block': 'block', minWidth: '90%',
                            borderLeft: `5px solid ${Colors[Math.floor(Math.random() * Colors.length)]}`}}
                        >
                            <div>
                                <div>
                                    <span className="todo-list-title">{item.title}</span>
                                    <span className="todo-list-time">{item.time}</span>
                                </div>
                                <div className="todo-list-desc">{item.description}</div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        );
    }

    handleSelection(e) {
        let target = e.target;
        let selected= this.state.selectedItems;
        if(target.checked) {
            selected.push(target.id)
        } else {
            let index = selected.indexOf(target.id);
            if(index > -1) {
                selected.splice(index, 1);
            }
        }
        this.setState({
            selectedItems: selected 
        });
        this.props.handleSelection(this.state.selectedItems);

    }

    onListItemClcik(selectedRec) {
        this.props.onListItemClcik(selectedRec);
    }
}
export default ToDoList;