import React from 'react';
class AddRec extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.isEdit? props.selectedRec.title: '',
            description: props.isEdit? props.selectedRec.description:'',
            id: props.isEdit? props.selectedRec.id:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
        return(
            <div>
                <div><i className="fas fa-arrow-left" onClick={()=>{this.props.redirectToHomePage()}}></i></div>
                <div>Title: <input type="text" onChange={this.handleInputChange} value={this.state.title} name="title"></input></div>
                <div>Description:</div>
                <textarea name="description" onChange={this.handleInputChange} value={this.state.description}  style={{ width: '100%' }}></textarea>
                <button onClick={()=>{
                    this.props.onSubmit(this.state);
                }}>Submit</button>
            </div>
        )
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      
    
}
export default AddRec;