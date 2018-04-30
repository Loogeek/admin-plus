import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import request from '../../../utils/request'
import CardContent from './card-content'
// import './index.scss'

const API = ''

export default class MovieHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: props.year,
            type: props.type,
            movies: []
        }
    }
    async componentDidMount() {
        const { type, year } = this.props

        const resData = await request({
            methods: "get",
            url: `${API}/api/v1/movies`,
            data: {
                type,
                year
            }
        })

        this.setState({
            movies: resData
        })
    }

    render() {
        const { movies } = this.state
        
        return (
            <div className="full">
                <Row gutter={16}>
                    
                </Row>
            </div>
        )
    }
}