import React, { PureComponent } from 'react'
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { postVscode } from '../../utils/vscode';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import PubSub from 'pubsub-js';
import './index.css';
let pubsubSwitch = null;
let pubsubOngoing = null;
let pubsubReset = null;
let pubsubThemeChange = null;
export default class DiagramWrapper extends PureComponent {
  state = {
    myDiagram: null
  }
  myRef = React.createRef();
  umlSelectNode = (e) => {
    const { setCurrentSelectNode, setExpandedTreeMenuKeys, expandedTreeMenuKeys } = this.props;
    if (e?.children?.length > 0) {
      setCurrentSelectNode([e.key], e);
      setExpandedTreeMenuKeys([...expandedTreeMenuKeys, e.key])
    }
  }
  componentDidMount() {
    pubsubSwitch = PubSub.subscribe("switchFunc", (msg, data) => {
      this.highLightNode(data);
    })
    pubsubOngoing = PubSub.subscribe("ongoing", (msg, data) => {
      this.state.myDiagram.layout.isOngoing = true;
      this.state.myDiagram.layoutDiagram(true);
    })
    pubsubReset = PubSub.subscribe("resetUML", () => {
      this.state.myDiagram.layoutDiagram(true);
    })
    pubsubThemeChange = PubSub.subscribe('themeChange', () => {
      console.log("############################################### themeColor: ", this.props.themeColor);
      this.changeBackgroundColor();
      const diagram = this.state.myDiagram;
      const $ = go.GraphObject.make;
      const that = this;
      diagram.linkTemplateMap.set('',
        $(go.Link,
          {
            routing: go.Link.Orthogonal,
            corner: 0,
            layerName: 'Background'//Do not cross in front of any nodes
          },
          new go.Binding("isLayoutPositioned", "relationship", this.convertIsTreeLink),
          $(go.Shape,// the Shape.stroke color depends on whether Link.isHighlighted is true
            new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "grey" })
              .ofObject(),
            // the Shape.strokeWidth depends on whether Link.isHighlighted is true
            new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 : 1; })
              .ofObject()),
          $(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("fromArrow", "relationship", this.convertFromArrow)),
          $(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("toArrow", "relationship", this.convertToArrow), new go.Binding("fill", "isHighlighted", function (h) { return h ? "red" : "white"; })
              .ofObject()),
          $(go.TextBlock, { stroke: that.props.themeColor === 'custom-light' ? "black" : 'white' },  // this is a Link label
            new go.Binding("text", "text"))
        ));
      diagram.rebuildParts();
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(pubsubSwitch);
    PubSub.unsubscribe(pubsubOngoing);
    PubSub.unsubscribe(pubsubReset);
  }
  // gojs?????????????????????props??????themeColor??????????????????????????????????????????dom
  changeBackgroundColor = () => {
    const divLight = document.querySelector('.diagram-component-light');
    const divDark = document.querySelector('.diagram-component-dark');
    if (divLight?.className) {
      divLight.className = `diagram-component-${this.props.themeColor === 'custom-light' ? 'light' : 'dark'}`
    }
    if (divDark?.classList) {
      divDark.className = `diagram-component-${this.props.themeColor === 'custom-light' ? 'light' : 'dark'}`
    }
  }
  convertIsTreeLink(r) {
    return r === "generalization";
  }
  convertFromArrow(r) {
    switch (r) {
      case "generalization": return "";
      default: return "";
    }
  }
  convertToArrow(r) {
    switch (r) {
      case "generalization": return "Triangle";
      case "aggregation": return "StretchedDiamond";
      default: return "";
    }
  }
  initDiagram = () => {
    const that = this;
    console.log("initDiagram @@@@@@@@@@@@@@@@@@@@@@");
    const $ = go.GraphObject.make;
    const diagram =
      $(go.Diagram,
        {
          initialContentAlignment: go.Spot.Center,
          "undoManager.isEnabled": true,
          'commandHandler.deletesTree': true,
          'grid.visible': false,//Whether there is a grid on the canvas
          scale: 0.7,
          model: $(go.GraphLinksModel, {
            linkKeyProperty: 'key'  // this should always be set when using a GraphLinksModel
          }),
          layout: $(go.TreeLayout,
            { // this only lays out in trees nodes connected by "generalization" links
              angle: 90,
              path: go.TreeLayout.PathSource,  // links go from child to parent
              setsPortSpot: false,  // keep Spot.AllSides for link connection spot
              setsChildPortSpot: false,  // keep Spot.AllSides
              // nodes not connected by "generalization" links are laid out horizontally
              arrangement: go.TreeLayout.ArrangementHorizontal,
              isInitial: true,
              isOngoing: true,
            })

          // layout: $(go.ForceDirectedLayout, {
          //   isInitial: true,
          //   isOngoing: false,
          //   defaultSpringLength: 50,
          //   defaultElectricalCharge: 200,
          // })
        }

      );
    // show visibility or access as a single character at the beginning of each property or method
    function convertVisibility(v) {
      switch (v) {
        case "public": return "+";
        case "private": return "-";
        case "protected": return "#";
        case "package": return "~";
        default: return v;
      }
    }
    // the item template for properties
    var propertyTemplate =
      $(go.Panel, "Horizontal",
        // property visibility/access
        $(go.TextBlock,
          { isMultiline: false, editable: false, width: 12 },
          new go.Binding("text", "visibility", convertVisibility)),
        // property name, underlined if scope=="class" to indicate static property
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "name").makeTwoWay(),
          new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
        // property type, if known
        $(go.TextBlock, "",
          new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "type").makeTwoWay()),
        // property default value, if any
        $(go.TextBlock,
          { isMultiline: false, editable: false },
          new go.Binding("text", "default", function (s) { return s ? " = " + s : ""; }))
      );
    // the item template for methods
    var methodTemplate =
      $(go.Panel, "Horizontal",
        // method visibility/access
        $(go.TextBlock,
          { isMultiline: false, editable: false, width: 12 },
          new go.Binding("text", "visibility", convertVisibility)),
        // method name, underlined if scope=="class" to indicate static method
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "name").makeTwoWay(),
          new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
        // method parameters
        $(go.TextBlock, "()",
          // this does not permit adding/editing/removing of parameters via inplace edits
          new go.Binding("text", "parameters", function (parr) {
            var s = "(";
            for (var i = 0; i < parr.length; i++) {
              var param = parr[i];
              if (i > 0) s += ", ";
              s += param.name + ": " + param.type;
            }
            return s + ")";
          })),
        // method return type, if any
        $(go.TextBlock, "",
          new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
        $(go.TextBlock,
          { isMultiline: false, editable: true },
          new go.Binding("text", "type").makeTwoWay())
      );
    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, "Auto",
        {
          click: function (e, node) {
            // highlight all Links and Nodes coming out of a given Node

            var diagram = node.diagram;
            diagram.layout.isOngoing = false;
            that.umlSelectNode(node.jb)
            console.log(node)
            diagram.startTransaction("highlight");
            // remove any previous highlighting
            diagram.clearHighlighteds();
            // for each Link coming out of the Node, set Link.isHighlighted
            node.findLinksOutOf().each(function (l) { l.isHighlighted = true; });
            // for each Node destination for the Node, set Node.isHighlighted
            node.findNodesOutOf().each(function (n) { n.isHighlighted = true; });

            // // for each Link coming into the Node, set Link.isHighlighted
            // node.findLinksInto().each(function (l) { l.isHighlighted = true; });
            // // for each Node to another Node, set Node.isHighlighted
            // node.findLinksInto().each(function (n) { n.isHighlighted = true; });

            diagram.commitTransaction("highlight");
          },
          doubleClick: function (e, node) {
            postVscode(node.jb);
          },
          locationSpot: go.Spot.Center,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
        },
        $(go.Shape, "RoundedRectangle", { fill: "#ddd", strokeWidth: 2, stroke: "white" },
          // the Shape.stroke color depends on whether Node.isHighlighted is true
          new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "black"; })
            .ofObject(), // the Shape.strokeWidth depends on whether Link.isHighlighted is true
          new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 : 1; })
            .ofObject()),
        $(go.Panel, "Table",
          { defaultRowSeparatorStroke: "black" },
          // header
          $(go.TextBlock,
            {
              row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
              font: "bold 12pt sans-serif",
              isMultiline: false, editable: true
            },
            new go.Binding("text", "name").makeTwoWay()),
          // properties
          $(go.TextBlock, "Total", //?????????????????????
            { row: 1, font: "italic 10pt sans-serif" },
            new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
          $(go.Panel, "Vertical", { name: "PROPERTIES" },
            new go.Binding("itemArray", "properties"),
            {
              row: 1, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left, background: "white",
              itemTemplate: propertyTemplate
            }
          ),
          $("PanelExpanderButton", "PROPERTIES",
            { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
            new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })),

          // methods
          $(go.TextBlock, "Self",
            { row: 2, font: "italic 10pt sans-serif" },
            new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")),
          $(go.Panel, "Vertical", { name: "METHODS" },
            new go.Binding("itemArray", "methods"),
            {
              row: 2, margin: 3, stretch: go.GraphObject.Fill,
              defaultAlignment: go.Spot.Left, background: "white",
              itemTemplate: methodTemplate
            }
          ),
          $("PanelExpanderButton", "METHODS",
            { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
            new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
        )
      );
    diagram.linkTemplate =
      $(go.Link,
        {
          routing: go.Link.Orthogonal,
          corner: 0,
          layerName: 'Background'//Do not cross in front of any nodes
        },
        new go.Binding("isLayoutPositioned", "relationship", this.convertIsTreeLink),
        $(go.Shape,// the Shape.stroke color depends on whether Link.isHighlighted is true
          new go.Binding("stroke", "isHighlighted", function (h) { return h ? "red" : "grey" })
            .ofObject(),
          // the Shape.strokeWidth depends on whether Link.isHighlighted is true
          new go.Binding("strokeWidth", "isHighlighted", function (h) { return h ? 5 : 1; })
            .ofObject()),
        $(go.Shape, { scale: 1.3, fill: "white" },
          new go.Binding("fromArrow", "relationship", this.convertFromArrow)),
        $(go.Shape, { scale: 1.3, fill: "white" },
          new go.Binding("toArrow", "relationship", this.convertToArrow), new go.Binding("fill", "isHighlighted", function (h) { return h ? "red" : "white"; })
            .ofObject()),
        $(go.TextBlock, { stroke: that.props.themeColor === 'custom-light' ? "black" : 'white' },  // this is a Link label
          new go.Binding("text", "text"))
      );
    this.setState({
      myDiagram: diagram
    })
    return diagram;
  }

  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
  handleModelChange = (changes) => {
    alert('GoJS model changed!');
    this.state.myDiagram.layout.isOngoing = true;
    console.log(changes);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.nodeDataArray !== this.props.nodeDataArray || nextProps.linkDataArray !== this.props.linkDataArray
  // }
  highLightNode = (data) => {
    const that = this;
    const diagram = this.state.myDiagram;
    const keyArray = data?.key?.split("_");
    const key = keyArray?.length > 0 ? keyArray[0] : null;
    const node = diagram.findNodeForKey(key);
    if (node) {
      diagram.select(node);
      diagram.startTransaction("highlight");
      // remove any previous highlighting
      diagram.clearHighlighteds();
      // for each Link coming out of the Node, set Link.isHighlighted
      node.findLinksOutOf().each(function (l) { l.isHighlighted = true; });
      // for each Node destination for the Node, set Node.isHighlighted
      node.findNodesOutOf().each(function (n) { n.isHighlighted = true; });
      diagram.commitTransaction("highlight");
    }

  }
  render() {
    return (
      <>
        <Button
          shape="circle"
          icon={<ReloadOutlined />}
          onClick={
            () => {
              this.state.myDiagram.layoutDiagram(true);
              // PubSub.publish("resetUML", {});
            }

          }></Button>

        <ReactDiagram
          ref={this.myRef}
          initDiagram={this.initDiagram}
          divClassName={this.props.themeColor === 'custom-light' ? 'diagram-component-light' : 'diagram-component-dark'}
          style={{ backgroundColor: this.props.themeColor === 'custom-light' ? 'white' : 'black' }}
          nodeDataArray={this.props.nodeDataArray}
          linkDataArray={this.props.linkDataArray}
          onModelChange={this.handleModelChange}
        />
      </>

    )
  }
}

