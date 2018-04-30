import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'

export default class CardContent extends Component {
    render() {
        return (
            <div className="full">
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">col-6</div>
                    </Col>
                </Row>
            </div>
        )
    }
}