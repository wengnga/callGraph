import './App.css';
import './custom-light.css';    // 引入custom-light.css 和 custom-dark.css
import './custom-dark.css';    // 引入custom-light.css 和 custom-dark.css
import React, { PureComponent } from 'react'
import { Upload, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import logo from './logo.svg';
import { postVscode } from './utils/vscode';
import TreeMenu from './Components/TreeMenu';
import DataList from './Components/DataList';
import GraphArea from './Components/GraphArea';
import SettingDrawer from './Components/SettingDrawer';
import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from './Components/Sidebar';
import { nanoid } from 'nanoid';
import { vscodeExtention } from './config';
// import { DiagramWrapper } from './Components/DiagramWrapper';
import { UploadOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import { ConfigProvider } from "antd";

export default class App extends PureComponent {
  state = {
    webviewData: "",
    showTableArea: true,
    currentSelectNode: {},
    expandedTreeMenuKeys: [
      // "func-0-0-0"
    ],
    selectedTreeMenuKeys: [
      // "func-0-0-0"
    ],

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
    settings: {
      themeDark: true,
      composeLeft: 'pie',
      composeRight: 'map',
      leftRadio: 1,
      rightRadio: 1,
      leafDepth: 5,
      treeMapWidth: 80,
      treeMapHeight: 80,
      treeMapVisibleMin: 100,
      childrenVisibleMin: 200,
    },
    themeColor: "custom-dark",
  }
  allAdditionNodes = {};
  componentDidMount() {
    window.addEventListener('message', event => {
      try {
        const message = event.data;
        if (message?.data?.type === 'getSettings') {
          const settings = JSON.parse((message?.data?.settings));
          this.setState(settings);
        } else if (JSON.stringify(message).includes("label")) {
          // this.setState({ webviewData: JSON.stringify(message) });
          this.parseData(message.data);
        }
      } catch (error) {
        console.log(error);
      }
    });
    if (window.vscode) {
      postVscode({ type: 'getSettings' });
    } else {
      const localSettings = localStorage.getItem('settings');
      if (!!localSettings) this.setState(JSON.parse(localSettings))
    }

  }



  setSettings = (values) => {
    const settingObj = {
      settings: values,
      themeColor: values.themeDark === false ? 'custom-light' : 'custom-dark',
    }
    if (this.state.themeColor !== settingObj.themeColor) PubSub.publish('themeChange');
    this.setState(settingObj);
    const settings = JSON.stringify(
      {
        settings: {
          ...this.state.settings,
          ...values
        },
        themeColor: values.themeDark === false ? 'custom-light' : 'custom-dark',
      }
    )
    if (window.vscode) {
      // 如果当前在VS Code扩展版webview环境中
      postVscode({
        type: 'setSettings',
        settings
      });
    } else {
      // Web版本
      localStorage.setItem('settings', settings);
    }

  }

  setExpandedTreeMenuKeys = (expandedKeys) => {
    console.log(">>>>>>>>>>>> expandedKey:", Array.from(new Set(expandedKeys)))
    this.setState({
      expandedTreeMenuKeys: Array.from(new Set(expandedKeys))
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
    const copyNodeDataList = [];
    const newStrNode = strNode.replace(keyReg, ($0, $1) => {
      const newKey = `${$1.split("_")[0]}_${nanoid()}`;
      copyNodeDataList.push({
        key: newKey,
        originKey: newKey.split("_")[0]
      })
      return `"key": "${newKey}"`;
    });
    const newNode = JSON.parse(newStrNode);
    this.addAllAdditionNodes(newNode);
    return [newNode, copyNodeDataList];
  }
  beforeUpload = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const data = reader.result;
        this.parseData(data);
      };
    });

  }

  parseData = data => {
    this.setState({ webviewData: JSON.stringify(data) })
    const splitArray = data.split(/\n/); // 按行读取
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
    console.log(">>>>>>>>>>>> funcArray:", funcArray);
    console.log(">>>>>>>>>>>> callArray:", callArray);

    // 提取信息的正则
    const funcReg = /(\s)*\"(.+?)\" \[label = \"(.+?)\\n(.+?)\\n(.+?)\"](\s)*/;
    const callReg = /\"(.+?)\" -> \"(.+?)\" \[label = \"(.+?)\"/;
    const tempNodeList = {};
    const nodeArray = [];
    funcArray.forEach(item => {
      const info = funcReg.exec(item);
      const totalAvg = parseFloat(info[4].split(" ")[1]);
      const selfAvg = parseFloat(info[5].split(" ")[1]);
      const newNode = {
        name: info[3],
        title: info[3],
        text: info[3],
        key: info[2],
        value: totalAvg,
        total: info[4],
        self: info[5],
        children: [],
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
      relationArray.push(newRelation);
      tempRelationList[`${newRelation.from}->${newRelation.to}`] = newRelation;
      const toNodeList = tempNodeList[newRelation.to];
      const list = tempNodeList[newRelation.from].length === 1 ? tempNodeList[newRelation.from] : tempNodeList[newRelation.from].slice(1);
      list.forEach(item => {
        const [copyNode, copyNodeDataList] = this.deepCopyAndChangeKey(toNodeList[toNodeList.length - 1]);
        copyNode["value"] = parseFloat(newRelation.label);
        item.children.push(copyNode);
        tempNodeList[newRelation.to].push(copyNode);
        copyNodeDataList.slice(1).forEach((copyItem) => {
          tempNodeList[copyItem.originKey].push(this.allAdditionNodes[copyItem.key]);
        })
      });
    })
    const enter = Object.values(tempNodeList).filter(item => item.length === 1)[0][0];
    console.log(">>>>>>>>>>>> enter:  ", enter)
    console.log(">>>>>>>>>>>> nodeList: ", tempNodeList);

    // 为了uml图点击该节点可以正常联动
    nodeArray.forEach(node => {
      const len = tempNodeList[node.key]?.length;
      if (len >= 0) node.children = tempNodeList[node.key][len - 1].children;

    })
    const a = [
      {
        "from": "func1",
        "to": "func2",
        "label": "50.000%",
        "text": "50.000%",
      },
      {
        "from": "func1",
        "to": "func3",
        "label": "20.000%",
        "text": "20.000%",
      }
    ]
    PubSub.publish("ongoing", {});
    this.setState({
      expandedTreeMenuKeys: [],
      selectedTreeMenuKeys: [],
      relationArray, nodeArray,
      nodeList: tempNodeList,
      relationList: tempRelationList,
      currentSelectNode: enter,
      data: enter
    })
    console.log(">>>>>>>>>>>> relationArray: ", JSON.stringify(relationArray));
  }
  render() {
    const { themeColor } = this.state;
    return (
      <>
        <ConfigProvider prefixCls={themeColor}>
          <div className={`App ${themeColor}`}
            style={
              { backgroundColor: themeColor === 'custom-light' ? '#fff' : '#1e1e1e' }
            }>
            <div className="content">
              {/* webviewData：
            {`${this.state.webviewData}1`} */}
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

                  {
                    this.state.showTableArea ? (
                      <div className="tableArea">
                        <Scrollbars >
                          <DataList dataSource={this.state.currentSelectNode?.children} ></DataList>
                        </Scrollbars>
                      </div>
                    ) : null
                  }
                  <Button onClick={() => {
                    this.setState({
                      showTableArea: !this.state.showTableArea
                    })
                  }}
                    type="text"
                    icon={!this.state.showTableArea ? <DownOutlined /> : <UpOutlined />}
                  ></Button>

                  {/* end of 文字列表 */}

                  {/* 图形区 */}
                  <div className="graphArea">
                    <SettingDrawer settings={this.state.settings} setSettings={this.setSettings} />
                    <GraphArea
                      setCurrentSelectNode={this.setCurrentSelectNode}
                      expandedTreeMenuKeys={this.state.expandedTreeMenuKeys}
                      setExpandedTreeMenuKeys={this.setExpandedTreeMenuKeys}
                      data={this.state.currentSelectNode?.children || []}
                      title={this.state.currentSelectNode?.name}
                      allData={this.state.data}
                      nodeDataArray={this.state.nodeArray}
                      linkDataArray={this.state.relationArray}
                      settings={this.state.settings}
                      themeColor={this.state.themeColor}
                    />
                  </div>
                  {/* end of 图形区 */}

                </div>
                {/* end of 页面展示数据的部分，包括文字列表和图形区 */}
              </Sidebar>

            </div>


          </div>
        </ConfigProvider>
      </>
    )
  }
}

