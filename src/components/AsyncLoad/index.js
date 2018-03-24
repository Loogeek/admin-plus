import React, { Component } from 'react'

export default (loadComponent, placeholder = '正在加载中') => {
    return class AsyncComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                ChildComponent: null
            }
            this.unmount = false
        }

        async componentDidMount() {
            if (!this.unmount) {
                const { default: ChildComponent } = await loadComponent()
                
                this.setState({
                    ChildComponent
                })
            }
        }

        componentWillUnmount() {
            this.unmount = true;
        }

        render() {
            const { ChildComponent } = this.state
            
            return (
                ChildComponent ? 
                    <ChildComponent {...this.props} /> : placeholder
            )
        }
    }
}