import React, { PureComponent,Fragment } from 'react';
import {connect } from 'react-redux';
import {actionCreator} from './store'
import {Bar} from "react-chartjs-2";
const options = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }
        ]
    }
};
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: '销售人员',
        type:'line',
        data: [51, 65, 40, 49, 60, 37, 40],
        fill: false,
        borderColor: '#CD5E5B',
        backgroundColor: '#CD5E5B',
        pointBorderColor: '#CD5E5B',
        pointBackgroundColor: '#CD5E5B',
        pointHoverBackgroundColor: '#CD5E5B',
        pointHoverBorderColor: '#CD5E5B',
        yAxisID: 'y-axis-1'
    },{
        type: 'bar',
        label: '访问人员',
        data: [200, 185, 590, 621, 250, 400, 95],
        fill: false,
        backgroundColor: '#003366',
        borderColor: '#003366',
        hoverBackgroundColor: '#003366',
        hoverBorderColor: '#003366',
        yAxisID: 'y-axis-2'
    }]
};
class ChartJSDemo extends PureComponent{
    render(){
        return (
            <Fragment>
                <Bar data={data} options={options} height={80}/>
            </Fragment>
        )
    }
}
const mapState = (state) => {
    return {

    }
};
const mapDispatch = (dispatch) => {
    return {

    }
};
export default connect(null,null)(ChartJSDemo);