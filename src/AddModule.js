import React from 'react';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';

class AddModule extends React.Component {

  state = {term: ''};

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onAddClick(this.state.term);
  }

  render(){
    return (
      <form style={{"marginTop":"20px"}} autoComplete="off" onSubmit={this.onFormSubmit}>
        <input
          onChange={(e) => this.setState({ term: e.target.value })}
          id="outlined-basic"
          placeholder={`Add Level-${this.props.level} Module..`}
          variant="outlined"
          type="text"
          value={this.state.term}
         />
         <input type="submit" value="ADD" />
      </form>
    );
  }

}

export default AddModule;
