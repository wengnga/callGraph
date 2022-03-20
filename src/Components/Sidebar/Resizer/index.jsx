import React, { Component } from "react";
import rafSchedule from "raf-schd";

const styles = {
    cursor: "ew-resize",
    height: "100%",
    position: "absolute",
    left: "-16px",
    width: "16px",
    // backgroundColor: "pink"
};

class Resizer extends Component {
    static defaultProps = {
        onResizeStart: () => { },
        onResize: () => { },
        onResizeEnd: () => { }
    };

    static resizerClickableWidth = 20;

    state = {
        startScreenX: 0,
        isResizing: false
    };

    _scheduleResize = rafSchedule(delta => {
        if (this.state.isResizing && delta) {
            this.props.onResize(delta);
        }
    });

    _mouseUpHandler = (e, outOfBounds = false) => {
        window.removeEventListener("mousemove", this._mouseMoveHandler);
        window.removeEventListener("mouseup", this._mouseUpHandler);
        window.removeEventListener("mouseout", this.handleOutofBounds);
        this.setState({
            isResizing: false
        });

        const screenX = outOfBounds
            ? // If we have gone out of bounds, reduce the nav width so the resizer is still visible
            e.screenX - 2 * Resizer.resizerClickableWidth
            : e.screenX;

        const delta = screenX - this.state.startScreenX;

        console.info("delta", delta);

        if (delta === 0) {
            return;
            // this.resizeButtonHandler();
        }

        // Perform one final resize before ending
        this.props.onResize(delta);

        this.props.onResizeEnd(delta);
    };

    _mouseMoveHandler = e => {
        this._scheduleResize(e.screenX - this.state.startScreenX);
    };

    _mouseDownHandler = e => {
        e.preventDefault();

        if (this.state.isResizing) {
            console.error("attempting to start a resize when another is occurring");
            return;
        }

        this.setState({
            isResizing: true,
            startScreenX: e.screenX
        });
        this.props.onResizeStart();
        window.addEventListener("mousemove", this._mouseMoveHandler);
        window.addEventListener("mouseup", this._mouseUpHandler);
        window.addEventListener("mouseout", this.handleOutofBounds);
    };

    render() {
        return <div style={styles} onMouseDown={this._mouseDownHandler} />;
    }
}

export default Resizer;
