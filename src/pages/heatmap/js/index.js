import '../../../css/index.css';
import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {render} from 'react-dom';
import DeckGLOverlay from './_overlay.js';
let data=require('../data/data.csv');

export default class GoogleDeck extends Component {
    constructor(props) {
        super(props);
        this.state={
            viewport: {
                width: props.width,
                height:props.height,
                zoom:props.zoom,
                center:props.center
            },
            data:null
        }
    }
    componentWillMount(){
        data = data.map(d => ([Number(d.lng), Number(d.lat)]));
        this.setState({data});
    }
    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }
    _resize() {
        this._onChangeViewport({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    _onChangeViewport(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
    }
    render() {
        const {viewport, data} = this.state;
        return (
            <GoogleMapReact
                apiKey="AIzaSyAA2UVBWyIywa7B-09Idrzs9b7w47p-qaw"
                center={this.props.center}
                onChange={this._onChangeViewport.bind(this)}
                zoom={this.props.zoom}>
                <DeckGLOverlay viewport={{latitude:viewport.center.lat,longitude:viewport.center.lng,zoom:viewport.zoom,width:viewport.width,height:viewport.height}}
                data={data || []}
                />
            </GoogleMapReact>
        );
    }
}
GoogleDeck.defaultProps={
    center:{lat:52.232395363869415,lng:-1.4157267858730052},
    zoom:7,
    width:500,
    height:500
};
render(<GoogleDeck />, document.getElementById('map'));




