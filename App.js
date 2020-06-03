import React from 'react'
import lodash from 'lodash'
import { View, Text, ScrollView, AsyncStorage } from 'react-native'
import TaskList from './components/task-list'
import Header from './components/header'
import ButtonAddTask from './components/button-add-task'
import MenuTask from './components/menu-task'
import { TASK } from './model/index'
import TextPrompt from './components/text-prompt'
import { style } from './style'


const storageKey = 'taskList';


export default class App extends React.Component {
  state = {
    taskList: [],
    isMenuTaskVisible:false,
    currentTask: {},
    isAddPromptVisible: false,
    isRenamePromptVisible: false,
    idGenerator: 0
  };
  

  componentWillMount() {
    AsyncStorage.getItem(storageKey).then(storedTaskList => {
      
      if(storedTaskList) {
        this.setState( {taskList: JSON.parse(storedTaskList) }, () => {
          this.setState({
            idGenerator: this.state.taskList[this.state.taskList.length - 1].id + 1
          });
        });
      }
      
    });
  }


  toggleMenuTaskVisibility = task => {
    let currentTask = task;
    if(this.state.isMenuTaskVisible){
      currentTask = {};
    }

    this.setState({
      isMenuTaskVisible: !this.state.isMenuTaskVisible, 
      currentTask
    });
  };


  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const list = this.state.taskList;

    list.splice(index, 1);
    this.setState({taskList: list, currentTask: {} }, () => {
      this.toggleMenuTaskVisibility();
      this.saveTaskList();
    });    
  };
  

  toggleTaskStatus = () => {
    const updatedStatus = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;
    const updatedTask = this.state.currentTask;
    updatedTask.status = updatedStatus;

    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;

    this.setState({
      taskList: updatedTaskList,
      isMenuTaskVisible: false,
      currentTask: {}
    }, () => {
      this.saveTaskList();
    });
  };


  hideAddPrompt = () => {
    this.setState({ isAddPromptVisible: false });
  }


  onAddTask = value => {
    const newTask = {
      id: this.state.idGenerator,
      content: value,
      status: TASK.todoStatus
    };

    this.setState({
      taskList: [...this.state.taskList, newTask], 
      isAddPromptVisible: false,
      idGenerator: this.state.idGenerator + 1
    }, () => {
      this.saveTaskList();
    });
  };


  displayAddPrompt = () => {
    this.setState({ isAddPromptVisible: true });
  };


  displayRenameTask = task => {
    this.setState({ currentTask: task, isRenamePromptVisible: true });
  };


  hideRenamePrompt = () => {
    this.setState({ isRenamePromptVisible: false, currentTask: {} });
  };


  renameTask = value => {
    const updatedTask = this.state.currentTask;
    updatedTask.content = value;

    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;

    this.setState({taskList: updatedTaskList}, () => {
      this.hideRenamePrompt();
      this.saveTaskList();
    });
  };


  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList));
  }



  renderTaskList = () => {
    if(this.state.taskList.length > 0){
      return (
        <TaskList 
            onPressCallBack={this.toggleMenuTaskVisibility} 
            onLongPressCallBack={this.displayRenameTask}
            taskList={this.state.taskList}
        />
      );
    }
    return (
      <View style={style.noTask}>
        <Text>Cliquer sur le bouton ajouter pour créer une tâche</Text>
      </View>
    )
  }



  render() {
    return (
      //flex : 1. Prend 100% de l'ecran
      <View style={{ flex: 1 }}>
        <Header content="Liste de tâche" />
        
        <ScrollView>
          { this.renderTaskList() }
        </ScrollView>

        <MenuTask 
          isVisible= {this.state.isMenuTaskVisible} 
          onDisapearCallBack= {this.toggleMenuTaskVisibility}
          onDeleteCallBack= {this.deleteCurrentTask}
          onChangeStatusCallBack= {this.toggleTaskStatus}
        />
         
        <TextPrompt 
          isVisible={this.state.isAddPromptVisible}
          onCancelCallBack={this.hideAddPrompt}
          onSubmitCallBack={this.onAddTask}
          title={"Ajouter une nouvelle tâche"}
          placeHolder={"Ex: Acheter du lait"}
          defaultValue={''}
        />

        <TextPrompt 
          isVisible={this.state.isRenamePromptVisible}
          onCancelCallBack={this.hideRenamePrompt}
          onSubmitCallBack={this.renameTask}
          title={"Renommer la tâche"}
          defaultValue={this.state.currentTask.content}
        />
        
        <ButtonAddTask onPressCallBack={this.displayAddPrompt} />        
              
      </View>
      
    );

  }
}
