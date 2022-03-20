import React, { Component } from 'react'
import { Upload, Button } from 'antd';
import logo from './logo.svg';
import './App.css';
import TreeMenu from './Components/TreeMenu';
import DataList from './Components/DataList';
import GraphArea from './Components/GraphArea';
import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from './Components/Sidebar';


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
      // "name": "flare",
      // "children": [
      //   {
      //     "name": "analytics",
      //     "children": [
      //       {
      //         "name": "cluster",
      //         "children": [
      //           { "name": "AgglomerativeCluster", "value": 3938 },
      //           { "name": "CommunityStructure", "value": 3812 },
      //           { "name": "HierarchicalCluster", "value": 6714 },
      //           { "name": "MergeEdge", "value": 743 }
      //         ]
      //       },
      //       {
      //         "name": "graph",
      //         "children": [
      //           { "name": "BetweennessCentrality", "value": 3534 },
      //           { "name": "LinkDistance", "value": 5731 },
      //           { "name": "MaxFlowMinCut", "value": 7840 },
      //           { "name": "ShortestPaths", "value": 5914 },
      //           { "name": "SpanningTree", "value": 3416 }
      //         ]
      //       },
      //       {
      //         "name": "optimization",
      //         "children": [
      //           { "name": "AspectRatioBanker", "value": 7074 }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     "name": "animate",
      //     "children": [
      //       { "name": "Easing", "value": 17010 },
      //       { "name": "FunctionSequence", "value": 5842 },
      //       {
      //         "name": "interpolate",
      //         "children": [
      //           { "name": "ArrayInterpolator", "value": 1983 },
      //           { "name": "ColorInterpolator", "value": 2047 },
      //           { "name": "DateInterpolator", "value": 1375 },
      //           { "name": "Interpolator", "value": 8746 },
      //           { "name": "MatrixInterpolator", "value": 2202 },
      //           { "name": "NumberInterpolator", "value": 1382 },
      //           { "name": "ObjectInterpolator", "value": 1629 },
      //           { "name": "PointInterpolator", "value": 1675 },
      //           { "name": "RectangleInterpolator", "value": 2042 }
      //         ]
      //       },
      //       { "name": "ISchedulable", "value": 1041 },
      //       { "name": "Parallel", "value": 5176 },
      //       { "name": "Pause", "value": 449 },
      //       { "name": "Scheduler", "value": 5593 },
      //       { "name": "Sequence", "value": 5534 },
      //       { "name": "Transition", "value": 9201 },
      //       { "name": "Transitioner", "value": 19975 },
      //       { "name": "TransitionEvent", "value": 1116 },
      //       { "name": "Tween", "value": 6006 }
      //     ]
      //   },
      //   {
      //     "name": "data",
      //     "children": [
      //       {
      //         "name": "converters",
      //         "children": [
      //           { "name": "Converters", "value": 721 },
      //           { "name": "DelimitedTextConverter", "value": 4294 },
      //           { "name": "GraphMLConverter", "value": 9800 },
      //           { "name": "IDataConverter", "value": 1314 },
      //           { "name": "JSONConverter", "value": 2220 }
      //         ]
      //       },
      //       { "name": "DataField", "value": 1759 },
      //       { "name": "DataSchema", "value": 2165 },
      //       { "name": "DataSet", "value": 586 },
      //       { "name": "DataSource", "value": 3331 },
      //       { "name": "DataTable", "value": 772 },
      //       { "name": "DataUtil", "value": 3322 }
      //     ]
      //   },
      //   {
      //     "name": "display",
      //     "children": [
      //       { "name": "DirtySprite", "value": 8833 },
      //       { "name": "LineSprite", "value": 1732 },
      //       { "name": "RectSprite", "value": 3623 },
      //       { "name": "TextSprite", "value": 10066 }
      //     ]
      //   },
      //   {
      //     "name": "flex",
      //     "children": [
      //       { "name": "FlareVis", "value": 4116 }
      //     ]
      //   },
      //   {
      //     "name": "physics",
      //     "children": [
      //       { "name": "DragForce", "value": 1082 },
      //       { "name": "GravityForce", "value": 1336 },
      //       { "name": "IForce", "value": 319 },
      //       { "name": "NBodyForce", "value": 10498 },
      //       { "name": "Particle", "value": 2822 },
      //       { "name": "Simulation", "value": 9983 },
      //       { "name": "Spring", "value": 2213 },
      //       { "name": "SpringForce", "value": 1681 }
      //     ]
      //   },
      //   {
      //     "name": "query",
      //     "children": [
      //       { "name": "AggregateExpression", "value": 1616 },
      //       { "name": "And", "value": 1027 },
      //       { "name": "Arithmetic", "value": 3891 },
      //       { "name": "Average", "value": 891 },
      //       { "name": "BinaryExpression", "value": 2893 },
      //       { "name": "Comparison", "value": 5103 },
      //       { "name": "CompositeExpression", "value": 3677 },
      //       { "name": "Count", "value": 781 },
      //       { "name": "DateUtil", "value": 4141 },
      //       { "name": "Distinct", "value": 933 },
      //       { "name": "Expression", "value": 5130 },
      //       { "name": "ExpressionIterator", "value": 3617 },
      //       { "name": "Fn", "value": 3240 },
      //       { "name": "If", "value": 2732 },
      //       { "name": "IsA", "value": 2039 },
      //       { "name": "Literal", "value": 1214 },
      //       { "name": "Match", "value": 3748 },
      //       { "name": "Maximum", "value": 843 },
      //       {
      //         "name": "methods",
      //         "children": [
      //           { "name": "add", "value": 593 },
      //           { "name": "and", "value": 330 },
      //           { "name": "average", "value": 287 },
      //           { "name": "count", "value": 277 },
      //           { "name": "distinct", "value": 292 },
      //           { "name": "div", "value": 595 },
      //           { "name": "eq", "value": 594 },
      //           { "name": "fn", "value": 460 },
      //           { "name": "gt", "value": 603 },
      //           { "name": "gte", "value": 625 },
      //           { "name": "iff", "value": 748 },
      //           { "name": "isa", "value": 461 },
      //           { "name": "lt", "value": 597 },
      //           { "name": "lte", "value": 619 },
      //           { "name": "max", "value": 283 },
      //           { "name": "min", "value": 283 },
      //           { "name": "mod", "value": 591 },
      //           { "name": "mul", "value": 603 },
      //           { "name": "neq", "value": 599 },
      //           { "name": "not", "value": 386 },
      //           { "name": "or", "value": 323 },
      //           { "name": "orderby", "value": 307 },
      //           { "name": "range", "value": 772 },
      //           { "name": "select", "value": 296 },
      //           { "name": "stddev", "value": 363 },
      //           { "name": "sub", "value": 600 },
      //           { "name": "sum", "value": 280 },
      //           { "name": "update", "value": 307 },
      //           { "name": "variance", "value": 335 },
      //           { "name": "where", "value": 299 },
      //           { "name": "xor", "value": 354 },
      //           { "name": "-", "value": 264 }
      //         ]
      //       },
      //       { "name": "Minimum", "value": 843 },
      //       { "name": "Not", "value": 1554 },
      //       { "name": "Or", "value": 970 },
      //       { "name": "Query", "value": 13896 },
      //       { "name": "Range", "value": 1594 },
      //       { "name": "StringUtil", "value": 4130 },
      //       { "name": "Sum", "value": 791 },
      //       { "name": "Variable", "value": 1124 },
      //       { "name": "Variance", "value": 1876 },
      //       { "name": "Xor", "value": 1101 }
      //     ]
      //   },
      //   {
      //     "name": "scale",
      //     "children": [
      //       { "name": "IScaleMap", "value": 2105 },
      //       { "name": "LinearScale", "value": 1316 },
      //       { "name": "LogScale", "value": 3151 },
      //       { "name": "OrdinalScale", "value": 3770 },
      //       { "name": "QuantileScale", "value": 2435 },
      //       { "name": "QuantitativeScale", "value": 4839 },
      //       { "name": "RootScale", "value": 1756 },
      //       { "name": "Scale", "value": 4268 },
      //       { "name": "ScaleType", "value": 1821 },
      //       { "name": "TimeScale", "value": 5833 }
      //     ]
      //   },
      //   {
      //     "name": "util",
      //     "children": [
      //       { "name": "Arrays", "value": 8258 },
      //       { "name": "Colors", "value": 10001 },
      //       { "name": "Dates", "value": 8217 },
      //       { "name": "Displays", "value": 12555 },
      //       { "name": "Filter", "value": 2324 },
      //       { "name": "Geometry", "value": 10993 },
      //       {
      //         "name": "heap",
      //         "children": [
      //           { "name": "FibonacciHeap", "value": 9354 },
      //           { "name": "HeapNode", "value": 1233 }
      //         ]
      //       },
      //       { "name": "IEvaluable", "value": 335 },
      //       { "name": "IPredicate", "value": 383 },
      //       { "name": "IValueProxy", "value": 874 },
      //       {
      //         "name": "math",
      //         "children": [
      //           { "name": "DenseMatrix", "value": 3165 },
      //           { "name": "IMatrix", "value": 2815 },
      //           { "name": "SparseMatrix", "value": 3366 }
      //         ]
      //       },
      //       { "name": "Maths", "value": 17705 },
      //       { "name": "Orientation", "value": 1486 },
      //       {
      //         "name": "palette",
      //         "children": [
      //           { "name": "ColorPalette", "value": 6367 },
      //           { "name": "Palette", "value": 1229 },
      //           { "name": "ShapePalette", "value": 2059 },
      //           { "name": "SizePalette", "value": 2291 }
      //         ]
      //       },
      //       { "name": "Property", "value": 5559 },
      //       { "name": "Shapes", "value": 19118 },
      //       { "name": "Sort", "value": 6887 },
      //       { "name": "Stats", "value": 6557 },
      //       { "name": "Strings", "value": 22026 }
      //     ]
      //   },
      //   {
      //     "name": "vis",
      //     "children": [
      //       {
      //         "name": "axis",
      //         "children": [
      //           { "name": "Axes", "value": 1302 },
      //           { "name": "Axis", "value": 24593 },
      //           { "name": "AxisGridLine", "value": 652 },
      //           { "name": "AxisLabel", "value": 636 },
      //           { "name": "CartesianAxes", "value": 6703 }
      //         ]
      //       },
      //       {
      //         "name": "controls",
      //         "children": [
      //           { "name": "AnchorControl", "value": 2138 },
      //           { "name": "ClickControl", "value": 3824 },
      //           { "name": "Control", "value": 1353 },
      //           { "name": "ControlList", "value": 4665 },
      //           { "name": "DragControl", "value": 2649 },
      //           { "name": "ExpandControl", "value": 2832 },
      //           { "name": "HoverControl", "value": 4896 },
      //           { "name": "IControl", "value": 763 },
      //           { "name": "PanZoomControl", "value": 5222 },
      //           { "name": "SelectionControl", "value": 7862 },
      //           { "name": "TooltipControl", "value": 8435 }
      //         ]
      //       },
      //       {
      //         "name": "data",
      //         "children": [
      //           { "name": "Data", "value": 20544 },
      //           { "name": "DataList", "value": 19788 },
      //           { "name": "DataSprite", "value": 10349 },
      //           { "name": "EdgeSprite", "value": 3301 },
      //           { "name": "NodeSprite", "value": 19382 },
      //           {
      //             "name": "render",
      //             "children": [
      //               { "name": "ArrowType", "value": 698 },
      //               { "name": "EdgeRenderer", "value": 5569 },
      //               { "name": "IRenderer", "value": 353 },
      //               { "name": "ShapeRenderer", "value": 2247 }
      //             ]
      //           },
      //           { "name": "ScaleBinding", "value": 11275 },
      //           { "name": "Tree", "value": 7147 },
      //           { "name": "TreeBuilder", "value": 9930 }
      //         ]
      //       },
      //       {
      //         "name": "events",
      //         "children": [
      //           { "name": "DataEvent", "value": 2313 },
      //           { "name": "SelectionEvent", "value": 1880 },
      //           { "name": "TooltipEvent", "value": 1701 },
      //           { "name": "VisualizationEvent", "value": 1117 }
      //         ]
      //       },
      //       {
      //         "name": "legend",
      //         "children": [
      //           { "name": "Legend", "value": 20859 },
      //           { "name": "LegendItem", "value": 4614 },
      //           { "name": "LegendRange", "value": 10530 }
      //         ]
      //       },
      //       {
      //         "name": "operator",
      //         "children": [
      //           {
      //             "name": "distortion",
      //             "children": [
      //               { "name": "BifocalDistortion", "value": 4461 },
      //               { "name": "Distortion", "value": 6314 },
      //               { "name": "FisheyeDistortion", "value": 3444 }
      //             ]
      //           },
      //           {
      //             "name": "encoder",
      //             "children": [
      //               { "name": "ColorEncoder", "value": 3179 },
      //               { "name": "Encoder", "value": 4060 },
      //               { "name": "PropertyEncoder", "value": 4138 },
      //               { "name": "ShapeEncoder", "value": 1690 },
      //               { "name": "SizeEncoder", "value": 1830 }
      //             ]
      //           },
      //           {
      //             "name": "filter",
      //             "children": [
      //               { "name": "FisheyeTreeFilter", "value": 5219 },
      //               { "name": "GraphDistanceFilter", "value": 3165 },
      //               { "name": "VisibilityFilter", "value": 3509 }
      //             ]
      //           },
      //           { "name": "IOperator", "value": 1286 },
      //           {
      //             "name": "label",
      //             "children": [
      //               { "name": "Labeler", "value": 9956 },
      //               { "name": "RadialLabeler", "value": 3899 },
      //               { "name": "StackedAreaLabeler", "value": 3202 }
      //             ]
      //           },
      //           {
      //             "name": "layout",
      //             "children": [
      //               { "name": "AxisLayout", "value": 6725 },
      //               { "name": "BundledEdgeRouter", "value": 3727 },
      //               { "name": "CircleLayout", "value": 9317 },
      //               { "name": "CirclePackingLayout", "value": 12003 },
      //               { "name": "DendrogramLayout", "value": 4853 },
      //               { "name": "ForceDirectedLayout", "value": 8411 },
      //               { "name": "IcicleTreeLayout", "value": 4864 },
      //               { "name": "IndentedTreeLayout", "value": 3174 },
      //               { "name": "Layout", "value": 7881 },
      //               { "name": "NodeLinkTreeLayout", "value": 12870 },
      //               { "name": "PieLayout", "value": 2728 },
      //               { "name": "RadialTreeLayout", "value": 12348 },
      //               { "name": "RandomLayout", "value": 870 },
      //               { "name": "StackedAreaLayout", "value": 9121 },
      //               { "name": "TreeMapLayout", "value": 9191 }
      //             ]
      //           },
      //           { "name": "Operator", "value": 2490 },
      //           { "name": "OperatorList", "value": 5248 },
      //           { "name": "OperatorSequence", "value": 4190 },
      //           { "name": "OperatorSwitch", "value": 2581 },
      //           { "name": "SortOperator", "value": 2023 }
      //         ]
      //       },
      //       { "name": "Visualization", "value": 16540 }
      //     ]
      //   }
      // ],
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
          const newNode = {
            name: info[3],
            title: info[3],
            "category": "step",
            text: info[3],
            key: info[2],
            value: 100,
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
          tempNodeList[newNode.key] = newNode;
          nodeArray.push(newNode);
        })
        // console.log("nodeArray: ", JSON.stringify(nodeArray));

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
          const tempChild = { ...tempNodeList[newRelation.to], "key": `${tempNodeList[newRelation.to].key}_${Date.now()}` }
          tempNodeList[newRelation.from].children.push(tempNodeList[newRelation.to]);

          tempNodeList[newRelation.to]["to"] = true;
        })
        const enter = Object.values(tempNodeList).filter(item => item.to === undefined)[0];
        console.log("enter:  ", enter)
        this.setState({
          relationArray, nodeArray,
          nodeList: tempNodeList,
          relationList: tempRelationList,
          currentSelectNode: enter,
          data: enter
        })
        // console.log("relationArray: ", JSON.stringify(relationArray));

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

