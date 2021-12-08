import React from "react";
import { Map, GoogleApiWrapper, Marker ,Latlng} from 'google-maps-react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c",
    authDomain: "operation-333705.firebaseapp.com",
    databaseURL: "https://operation-333705-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "operation-333705",
    storageBucket: "operation-333705.appspot.com",
    messagingSenderId: "995869264631",
    appId: "1:995869264631:web:cbcff8936502647644a1f2"
};
const sheetID = '1fHW3wcqe10UHBU-GbQOB56-jWXuvEtcf-_ftw18lqwA'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getDatabase(app)

const mapStyles = {
    height: '100%',
    width: '100%'
}


export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.renderMarker = this.renderMarker.bind(this)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const op_data = ref(db, `${sheetID}/operation`);
        onValue(op_data, (snapshot) => {
            let rawdata = snapshot.val();
            this.setState({ data: rawdata })
        });
    }

    renderMarker() {
        let marker_arry = []
        let data_mark = this.state.data
        data_mark.forEach(element => {
            let rawlatlng = element.latlng.toString().trim().replace(' ','').split(',')
            let Latlng = {lat: parseFloat(rawlatlng[0]),lng:parseFloat(rawlatlng[1])}
            if (element.status == 'before') {     
             marker_arry.push(
                <Marker
                key={element.code}
                    name={element.code}
                    position={Latlng}
                    icon={{ 
                        url: "../src/images/marker-icon-black",
                    }} />) 
            } else if (element.status == 'current') {

            } else if (element.status == 'after') {

            }
        });
        console.log(marker_arry)

        return marker_arry
    }

    render() {
        return (
            <>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 13.798995,  lng: 100.562988 }}
                >
                    {this.renderMarker()}
                </Map>
            </>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c'
})(MapContainer);