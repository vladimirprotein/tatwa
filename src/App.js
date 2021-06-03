import React from 'react';
import {connect} from 'react-redux';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Modal from '@material-ui/core/Modal';
import AddModule from './AddModule';
import EditModule from './EditModule';
import './App.css';

import {createModule, deleteModule, editModule} from './actions';

class App extends React.Component {

  state = {
    "open": false,
    "id": null,
    "term": ""
  };

  renderTree = (mod, parentId, level) => {
    var returnValue = [];
    var prevSiblingId = null;
    for(let m in mod){
      prevSiblingId = mod[m]['id'];
      returnValue.push(
        <div style={{"position": "relative"}}>
          <TreeItem nodeId={m} key={m} label={mod[m]['moduleName']} >{this.renderTree(mod[m]['children'], mod[m]['id'], level+1)}</TreeItem>
          <button
            style={{"position":"absolute", "left":"300px", "top":"0", "background":"red", "color":"white", "cursor":"pointer", "border":"none"}}
            onClick={()=>{this.deleteModule(prevSiblingId)}}
          >
            Delete
          </button>
          <button
            style={{"position":"absolute", "left":"370px", "top":"0", "background":"teal", "color":"white", "cursor":"pointer", "border":"none"}}
            onClick={()=>{this.setState({"id": prevSiblingId, "term": mod[m]['moduleName']}); this.handleOpen(prevSiblingId, mod[m]['moduleName'])}}>
            Edit
          </button>
        </div>
      );
    }
    returnValue.push(
      <AddModule level={level} onAddClick={(term)=>{this.addModule(term, prevSiblingId, parentId)}} />
    );
    return returnValue;
  };


  addModule = (term, prevSiblingId, parentId) => {
    if(!term) return;
    this.props.createModule({
      "term": term,
      "prevSiblingId": prevSiblingId,
      "parentId": parentId
    });
  };

  deleteModule = (id) => {
    this.props.deleteModule({
      "id": id
    });
  };

  editModule = (term) => {
    console.log('>>>>>' + term);
    this.handleClose();
    this.props.editModule({
      "id": this.state.id,
      "term": term
    });
  };



  body = (
    <div style={{"display": "flex", "justifyContent":"center", "alignItems": "center", "width":"40%", "padding":"4%", "margin":"30% auto", "background":"white"}}>
      <div>
        <h2 id="simple-modal-title">Edit: {this.state.term}</h2>
        <EditModule term={this.state.term} onEditClick={(term)=>{this.editModule(term)}} />
      </div>
    </div>
  );

  handleOpen = (id, term) => {
    setTimeout(() =>{
      this.setState({
        open: true,
        id: id,
        term: term
      });
      console.log(this.state);
    },500);

    setTimeout(() =>{
      this.setState({
        id: id,
        term: term
      });
      console.log(this.state);
    },5000);

  };

  handleClose = () => {
    this.setState({open: false});
  };


  render(){
    return (
      <div>
        <div style={{"width":"80%", "margin":"30px auto"}}>
          <h2>Modules</h2>
          <TreeView
            className=""
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {this.renderTree(this.props.modules, null, 1)}
          </TreeView>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          {this.body}
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    modules: state.modules
  };
};

export default connect(mapStateToProps, {createModule, deleteModule, editModule})(App);
