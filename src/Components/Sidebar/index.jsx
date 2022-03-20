import React, { Component } from "react";
import Resizer from "./Resizer";
const baseStyles = {
    position: "relative",
    transition: "width 0.3s"
};

// TODO lmit max width

class Sidebar extends Component {
    static defaultProps = {
        sizes: [
            {
                width: 60,
                shouldSnap: true
            },
            {
                width: 320,
                shouldSnap: true
            },
            {
                width: 440,
                shouldSnap: false
            },
            {
                width: 580,
                shouldSnap: false
            }
        ]
    };

    state = {
        isResizing: false,
        withTransition: false,
        resizeDelta: 0,
        width: 1200,
        maxWidth: 1440,
        minWidth: 450
    };

    _onResize = resizeDelta => {
        console.info("Sidebar: _onResize ", resizeDelta);
        this.setState({
            isResizing: true,
            resizeDelta
        });
    };

    _onResizeEnd = resizeDelta => {
        console.info("Sidebar: _onResizeEnd ", this.state.width + resizeDelta);
        this.setState({
            isResizing: false,
            resizeDelta: 0,
            width: this._getFinalWidth(resizeDelta)
        });
    };

    _getFinalWidth = resizeDelta => {
        const width = Math.max(this.state.width - resizeDelta);
        const isShrinking = resizeDelta > 0;
        const sizes = isShrinking
            ? Object.values(this.props.sizes).reverse()
            : Object.values(this.props.sizes);

        const sizeMatch = sizes.find(
            size => (isShrinking ? size.width <= width : size.width >= width)
        );

        console.info("Sidebar: _getFinalWidth ", width, sizeMatch);

        if (sizeMatch && sizeMatch.shouldSnap) {
            return sizeMatch.width;
        } else {
            return width;
        }
    };

    _getProgressWidth = resizeDelta => {
        const progressWidth = this.state.width - resizeDelta;
        // TODO handle differently
        return (progressWidth >= this.state.maxWidth)
            ? this.state.maxWidth
            : (progressWidth <= this.state.minWidth ? this.state.minWidth : progressWidth)
    };

    render() {
        const width = `${this._getProgressWidth(this.state.resizeDelta)}px`;

        const styles = {
            ...baseStyles,
            width,
            transition: !this.state.isResizing ? "0.3s all" : ""
        };

        return (
            <div style={styles}>
                <Resizer onResize={this._onResize} onResizeEnd={this._onResizeEnd} />
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default Sidebar;
