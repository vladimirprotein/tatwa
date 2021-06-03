import React from 'react';

class EditModule extends React.Component {

  state = {term: this.props.term};

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onEditClick(this.state.term);
  }

  render(){
    return (
      <form style={{"marginTop":"20px"}} autoComplete="off" onSubmit={this.onFormSubmit}>
        <input
          onChange={(e) => this.setState({ term: e.target.value })}
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={this.state.term}
         />
         <input type="submit" value="Done" />
      </form>
    );
  }

}

export default EditModule;
