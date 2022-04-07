import React, { Component } from 'react'
import { Upload, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import logo from './logo.svg';
import './App.less';
import TreeMenu from './Components/TreeMenu';
import DataList from './Components/DataList';
import GraphArea from './Components/GraphArea';
import SettingDrawer from './Components/SettingDrawer';
import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from './Components/Sidebar';
import { nanoid } from 'nanoid';


// import { DiagramWrapper } from './Components/DiagramWrapper';
import { UploadOutlined } from '@ant-design/icons';

export default class App extends Component {
  state = {
    currentSelectNode: {},
    expandedTreeMenuKeys: [
      // "func-0-0-0"
    ],
    selectedTreeMenuKeys: [
      // "func-0-0-0"
    ],
    fakeData: { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array
      "name": "func0",
      "title": "func0",
      "key": "func-0-0-0",
      "value": 100,
      "total": "100%",
      "self": "0%",
      children: [
        {
          "name": "func1",
          "title": "func1",
          "key": "func1-0-0-0",
          "value": 40,
          "total": "45%",
          "self": "0%",
          children: [
            {
              "name": "func3",
              "title": "func3",
              "key": "func3-0-0-0-0",
              "value": 20,
              "total": "20%",
              "self": "0%",
              children: [
                {
                  "name": "func8",
                  "title": "func8",
                  "key": "func8-0-0-0-0-0",
                  "value": 1,
                  "total": "20%",
                  "self": "0%",
                },
                {
                  "name": "func9",
                  "title": "func9",
                  "key": "func9-0-0-0-0-0",
                  "value": 19,
                  "total": "20%",
                  "self": "0%",
                }
              ]
            }, {
              "name": "func4",
              "title": "func4",
              "key": "func4-0-0-0-1",
              "value": 25,
              "total": "25%",
              "self": "0%",
              children: [
                {
                  "name": "func10",
                  "title": "func10",
                  "key": "func10-0-0-0-0-1",
                  "value": 2,
                  "total": "25%",
                  "self": "0%",
                },
                {
                  "name": "func11",
                  "title": "func11",
                  "key": "func11-0-0-0-0-1",
                  "value": 5,
                  "total": "25%",
                  "self": "0%",
                },
                {
                  "name": "func12",
                  "title": "func12",
                  "key": "func12-0-0-0-0-2",
                  "value": 18,
                  "total": "25%",
                  "self": "0%",
                  children: [
                    {
                      "name": "func13",
                      "title": "func13",
                      "key": "func13-0-0-0-0-0-0",
                      "value": 5,
                      "total": "25%",
                      "self": "0%",
                    },
                    {
                      "name": "func14",
                      "title": "func14",
                      "key": "func14-0-0-0-0-0-1",
                      "value": 13,
                      "total": "25%",
                      "self": "0%",
                      children: [
                        {
                          "name": "func15",
                          "title": "func15",
                          "key": "func15-0-0-0-0-0-0-0",
                          "value": 4,
                          "total": "25%",
                          "self": "0%",
                        },
                        {
                          "name": "func16",
                          "title": "func16",
                          "key": "func16-0-0-0-0-0-0-1",
                          "value": 2,
                          "total": "25%",
                          "self": "0%",
                        },
                        {
                          "name": "func17",
                          "title": "func17",
                          "key": "func17-0-0-0-0-0-0-2",
                          "value": 7,
                          "total": "25%",
                          "self": "0%",
                          children: [
                            {
                              "name": "func18",
                              "title": "func18",
                              "key": "func18-0-0-0-0-0-0-2",
                              "value": 7,
                              "total": "25%",
                              "self": "0%",
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array
          "name": "func2",
          "title": "func2",
          "key": "func2-0-0-1",
          "value": 55,
          "total": "55%",
          "self": "0%",
          children: [
            { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array
              "name": "func5",
              "title": "func5",
              "key": "func5-0-0-1-0",
              "value": 15,
              "total": "15%",
              "self": "0%"
            }, { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array
              "name": "func6",
              "title": "func6",
              "key": "func6-0-0-1-1",
              "value": 10,
              "total": "10%",
              "self": "0%"
            }, { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array
              "name": "func7",
              "title": "func7",
              "key": "func7-0-0-1-2",
              "value": 30,
              "total": "30%",
              "self": "0%"
            }
          ]
        }
      ]
    },

    data: { //title:string,name:string,key:string,value:num,total:string(100% 100% 100%),self:string((100% 100% 100%)),children:array

    },
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
    ],
    nodeList: {},
    relationList: {},

  }
  allAdditionNodes = {};
  componentDidMount() {

  }
  setExpandedTreeMenuKeys = (expandedKeys) => {
    console.log("expandedKey !!!!!!!!!!!!!!!!!:", expandedKeys)
    this.setState({
      expandedTreeMenuKeys: expandedKeys
    })
  }
  setCurrentSelectNode = (selectedKeys, node) => {
    console.log(node)
    this.setState({
      selectedTreeMenuKeys: selectedKeys,
      currentSelectNode: node
    });
  }
  handleTreeMenuDragStart = (e) => {
    console.log("start", e)
  }
  handleTreeMenuDragOver = (e) => {
    console.log("over", e)
  }
  handleTreeMenuDragEnd = (e) => {
    console.log("end", e)
  }
  deepCopy = (node) => {
    return JSON.parse(JSON.stringify(node));
  }
  addAllAdditionNodes = (newNode) => {
    newNode.children.forEach(child => {
      if (child.children?.length > 0) this.addAllAdditionNodes(child);
      this.allAdditionNodes[child.key] = child;
    });
  }
  deepCopyAndChangeKey = (node) => {
    const strNode = JSON.stringify(node);
    const keyReg = /\"key":\"(.*?)\"/g;
    // console.log("before:", JSON.parse(strNode));
    const copyNodeDataList = [];
    const newStrNode = strNode.replace(keyReg, ($0, $1) => {
      const newKey = `${$1.split("_")[0]}_${nanoid()}`;
      copyNodeDataList.push({
        key: newKey,
        originKey: newKey.split("_")[0]
      })
      return `"key": "${newKey}"`;
    });
    // console.log("after: ", JSON.parse(newStrNode));
    const newNode = JSON.parse(newStrNode);
    this.addAllAdditionNodes(newNode);
    return [newNode, copyNodeDataList];
  }
  beforeUpload = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        // console.log(reader.result)
        const splitArray = reader.result.split(/\n/); // 按行读取
        const resultArray = splitArray.slice(1, splitArray.length - 2);
        let splitIndex = 0;
        for (let i = 0; i < resultArray.length; i++) {
          if (resultArray[i].indexOf("->") !== -1) {
            splitIndex = i; // 函数名跟调用关系的分割index,从splitIndex开始就是调用关系
            break;
          }
        }
        const funcArray = resultArray.slice(0, splitIndex);
        const callArray = resultArray.slice(splitIndex);
        console.log("funcArray:", funcArray);
        console.log("callArray:", callArray);

        // 提取信息的正则
        const funcReg = /(\s)*\"(.+?)\" \[label = \"(.+?)\\n(.+?)\\n(.+?)\"](\s)*/;
        const callReg = /\"(.+?)\" -> \"(.+?)\" \[label = \"(.+?)\"/;
        const tempNodeList = {};
        const nodeArray = [];
        funcArray.forEach(item => {
          const info = funcReg.exec(item);
          console.log(info[5].split(" "))
          const totalAvg = parseFloat(info[4].split(" ")[1]);
          const selfAvg = parseFloat(info[5].split(" ")[1]);
          console.log("selfAvg: ", selfAvg, "   equals to 0: ", selfAvg === 0);
          const newNode = {
            name: info[3],
            title: info[3],
            "category": "step",
            text: info[3],
            key: info[2],
            value: totalAvg,
            total: info[4],
            self: info[5],
            children: selfAvg !== 0 ? [
              //   {
              //   name: "self",
              //   title: "self",
              //   "category": "step",
              //   text: "self",
              //   key: `${info[2]}_self_${nanoid()}`,
              //   total: "",
              //   self: "",
              //   children: [],
              //   value: selfAvg
              // }
            ] : [],
            properties: [
              {
                name: info[4]
              }
            ],
            methods: [
              {
                name: info[5]
              }
            ]
          };
          tempNodeList[newNode.key] = [newNode];
          nodeArray.push(newNode);
        })
        console.log("nodeArray: ", JSON.stringify(nodeArray));

        const tempRelationList = this.state.relationList;
        const relationArray = [];
        callArray.forEach(item => {
          const info = callReg.exec(item);
          const newRelation = {
            from: info[1],
            to: info[2],
            label: info[3],
            text: info[3],
            relationship: "generalization"
          };
          console.log(parseFloat(info[3]));
          relationArray.push(newRelation);
          tempRelationList[`${newRelation.from}->${newRelation.to}`] = newRelation;
          const toNodeList = tempNodeList[newRelation.to];
          // console.log(`${newRelation.from}->${newRelation.to}`)
          const list = tempNodeList[newRelation.from].length === 1 ? tempNodeList[newRelation.from] : tempNodeList[newRelation.from].slice(1);
          list.forEach(item => {
            const [copyNode, copyNodeDataList] = this.deepCopyAndChangeKey(toNodeList[toNodeList.length - 1]);
            copyNode["value"] = parseFloat(newRelation.label);
            item.children.push(copyNode);
            // tempNodeList[newRelation.to] = [...tempNodeList[newRelation.to], copyNode];
            tempNodeList[newRelation.to].push(copyNode);
            copyNodeDataList.slice(1).forEach((copyItem) => {
              tempNodeList[copyItem.originKey].push(this.allAdditionNodes[copyItem.key]);
            })
          });
        })
        const enter = Object.values(tempNodeList).filter(item => item.length === 1)[0][0];
        console.log("enter:  ", enter)
        console.log("nodeList: ", tempNodeList)
        this.setState({
          expandedTreeMenuKeys: [],
          selectedTreeMenuKeys: [],
          relationArray, nodeArray,
          nodeList: tempNodeList,
          relationList: tempRelationList,
          currentSelectNode: enter,
          data: enter
        })
        console.log("relationArray: ", JSON.stringify(relationArray));

        // console.log("nodeList: ", tempNodeList);
        // console.log("relationList: ", tempRelationList);


        // console.log(resultArray);
      };
    });

  }
  render() {
    return (
      <>
        <div className="App">
          <div className="content">
            {/* 页面左边的树形菜单 */}

            <div className="treeMenu" >
              <Upload listType='text' beforeUpload={this.beforeUpload}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              <Scrollbars >
                <TreeMenu setCurrentSelectNode={this.setCurrentSelectNode} expandedTreeMenuKeys={this.state.expandedTreeMenuKeys} setExpandedTreeMenuKeys={this.setExpandedTreeMenuKeys} treeMenuData={[this.state.data]} selectedKeys={this.state.selectedTreeMenuKeys}></TreeMenu>
              </Scrollbars>
              {/* <div className='resizeborder'
                draggable="true"
                onDragStart={this.handleTreeMenuDragStart}
                onDragOver={this.handleTreeMenuDragOver}
                onDragEnd={this.handleTreeMenuDragEnd}
              ></div> */}
            </div>
            {/* end of 页面左边的树形菜单 */}
            <Sidebar>
              {/* 页面展示数据的部分，包括文字列表和图形区 起始 */}
              <div className="displayArea">
                {/* <div className="getData"></div> */}

                {/* 文字列表 */}
                <div className="tableArea">
                  <Scrollbars >
                    <DataList dataSource={this.state.currentSelectNode?.children} ></DataList>
                  </Scrollbars>
                </div>
                {/* end of 文字列表 */}

                {/* 图形区 */}
                <div className="graphArea">
                  <SettingDrawer />
                  <GraphArea
                    setCurrentSelectNode={this.setCurrentSelectNode}
                    expandedTreeMenuKeys={this.state.expandedTreeMenuKeys}
                    setExpandedTreeMenuKeys={this.setExpandedTreeMenuKeys}
                    data={this.state.currentSelectNode?.children}
                    allData={this.state.data}
                    nodeDataArray={this.state.nodeArray}
                    linkDataArray={this.state.relationArray} />
                </div>
                {/* end of 图形区 */}

              </div>
              {/* end of 页面展示数据的部分，包括文字列表和图形区 */}
            </Sidebar>

          </div>


        </div>
      </>
    )
  }
}

