
import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import TreeMenu from './Components/TreeMenu';
import GraphArea from './Components/GraphArea';
export default class App extends Component {
  state = {
    treeMenuData: [
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              {
                title: 'parent 1-0',
                key: '0-0-0-0',
                children: [
                  {
                    title: 'leaf',
                    key: '0-0-0-0-0',
                  },
                  {
                    title: 'leaf',
                    key: '0-0-0-0-1',
                  },
                  {
                    title: 'leaf',
                    key: '0-0-0-0-2',
                  },
                ],
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
              },
              {
                title: 'leaf',
                key: '0-0-0-2',
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [
              {
                title: 'leaf',
                key: '0-0-1-0',
              },
            ],
          },
          {
            title: 'parent 1-2',
            key: '0-0-2',
            children: [
              {
                title: 'leaf',
                key: '0-0-2-0',
              },
              {
                title: 'leaf',
                key: '0-0-2-1',
              }, {
                title: 'parent 1-test',
                key: '0-0-2-2',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-3',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-4',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-5',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-6',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-7',
              }, , {
                title: 'parent 1-test',
                key: '0-0-2-8',
              },
            ],
          },
        ],
      },
    ]
  }
  render() {
    return (
      <div className="App">
        My graduation project
        <TreeMenu treeMenuData={this.state.treeMenuData}></TreeMenu>
        <GraphArea></GraphArea>
      </div>
    )
  }
}

