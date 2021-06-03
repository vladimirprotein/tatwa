import {combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form'; // this reducer provider by redux-form which manages all form state. this has to be mapped with a key named 'form' !!


import _ from 'lodash';

const initialData = {
  "1": {
    "stage": 1,
    "id": "1",
    "moduleName": "MenuA",
    "children": {
      "1-1": {
        "stage": 2,
        "id": "1-1",
        "moduleName": "SubMenu A1",
        "children": {}
      },
      "1-2": {
        "stage": 2,
        "id": "1-2",
        "moduleName": "SubMenu A2",
        "children": {}
      },
    }
  },
  "2": {
    "stage": 1,
    "id": "2",
    "moduleName": "MenuB",
    "children": {
      "2-1": {
        "stage": 2,
        "id": "2-1",
        "moduleName": "SubMenu B1",
        "children": {
          "2-1-1": {
            "stage": 3,
            "id": "2-1-1",
            "moduleName": "Item B1-1",
            "children": {}
          },
        }
      },
      "2-2": {
        "stage": 2,
        "id": "2-2",
        "moduleName": "SubMenu B2",
        "children": {}
      },
    }
  },
};

const moduleReducer = (state=initialData, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      var {term, prevSiblingId, parentId} = action.payload;
      var newState = {...state};
      var tempObj = newState;

      if(prevSiblingId){
        var addMap = prevSiblingId.split('-');
        addMap[addMap.length - 1] = String(Number(addMap[addMap.length - 1]) + 1);
        var targetKey = addMap.join('-');
      }
      else if(parentId){
        var targetKey = parentId + '-1';
        var addMap = targetKey.split('-');
      }
      else{
        var targetKey = "1";
        var addMap = ["1"];
      }
      var tmpK = "";
      for(var i=0; i<addMap.length-1; i++){
        if(i==0){
          tmpK = tmpK + addMap[i];
        }
        else{
          tmpK = tmpK + '-' + addMap[i];
        }
        tempObj = tempObj[tmpK]['children'];
      }
      tempObj[targetKey] = {
        "stage": i+1,
        "id": targetKey,
        "moduleName": term,
        "children": {}
      };
      return newState;


    case 'DELETE_MODULE':
      var {id} = action.payload;
      var newState = {...state};
      var tempObj = newState;

      var targetKey = id;
      var addMap = targetKey.split('-');

      var tmpK = "";
      for(var i=0; i<addMap.length-1; i++){
        if(i==0){
          tmpK = tmpK + addMap[i];
        }
        else{
          tmpK = tmpK + '-' + addMap[i];
        }
        tempObj = tempObj[tmpK]['children'];
      }

      delete tempObj[targetKey];
      return newState;



    case 'EDIT_MODULE':
      var {id, term} = action.payload;
      var newState = {...state};
      var tempObj = newState;

      var targetKey = id;
      var addMap = targetKey.split('-');

      var tmpK = "";
      for(var i=0; i<addMap.length-1; i++){
        if(i==0){
          tmpK = tmpK + addMap[i];
        }
        else{
          tmpK = tmpK + '-' + addMap[i];
        }
        tempObj = tempObj[tmpK]['children'];
      }

      tempObj[targetKey]['moduleName'] = term;
      return newState;



    default:
      return state;

  }
};


export default combineReducers({
  modules: moduleReducer
});
