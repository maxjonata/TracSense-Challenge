import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import {Chart} from 'chart.js';
import {Icon, Style} from 'ol/style';
import "ol-ext/dist/ol-ext.css";

import Popup from "ol-ext/overlay/Popup"
import Select from "ol/interaction/Select"

import api from '../../services/api';

import './styles.css';

export default function MapPage() {

	async function getMapInfo() {
        try {
			const response = await api.get('getMapInfo');
			return response.data;
        } catch(err) {
			alert('Locations retrieval failed, try again later');
			console.log(err);
        }
	}

	useEffect(() => {

		async function fetchData() {
			const data = await getMapInfo();
			return data;
		}
		fetchData().then((data) => {
			for(var key in data) {

				var arrayTime = data[key].stringTimeArray
				var arrayData = data[key].stringDataArray

				var feature = new Feature({
					geometry: new Point(olProj.fromLonLat([data[key].coordX, data[key].coordY])),
					name: data[key].name,
					timeSeries: [arrayTime, arrayData],
				});

				var iconStyle = new Style({
					image: new Icon({
						anchorOrigin: 'bottom-left',
						anchorXUnits: 'fraction',
						anchorYUnits: 'pixels',
						src: 'gmfQ2Ab-orange-pin-vector.svg',
						scale: 0.03
					}),
				});

				feature.setStyle(iconStyle);

				var layer = new VectorLayer({
					source: new VectorSource({
						features: [feature]
					})
				});
				
				map.addLayer(layer);
			}
		});

		var map = new Map({
			controls: defaultControls(),
			view: new View({
			  center: [0, 0],
			  zoom: 1
			}),
			layers: [
			  new TileLayer({
				source: new OSM()
			  })
			],
			target: 'map'
		});

		var popup = new Popup({
			popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
			closeBox: true,
			positioning: 'auto',
			autoPan: true,
			autoPanAnimation: { duration: 250 }
		});
		map.addOverlay(popup);

		var select = new Select({});
		map.addInteraction(select);

		select.getFeatures().on(['add'], function(e) {
			var feature = e.element;
			var content = `<canvas id="chart" width="900" height="400" style="background-color: white"></canvas>`;

			popup.show(feature.getGeometry().getFirstCoordinate(), content);
			new Chart(document.getElementById('chart').getContext('2d'), {
				type: 'line',
				data: {
					labels: feature.get('timeSeries')[0],
					datasets: [{
						data: feature.get('timeSeries')[1],
						borderColor: 'orange',
						fill:false,
						lineTension: 0,
						pointRadius: 0,
						borderWidth: 2
					}]
				},
				options: {
					title: {
						display: true,
						text: feature.get('name')
					},
					legend: {
						display: false
					}
				}
			})
		});

		select.getFeatures().on(['remove'], function(e) {
			popup.hide(); 
		})
	}, [])

	const container = useRef(null);
	const content = useRef(null);
	const closer = useRef(null);

    return (
		<div className="application">
			<h1>{localStorage.getItem('clientName')}</h1>
			<div id="map" className="map"></div>
			<div id="popup" className="ol-popup" ref={container}>
				<div id="popup-closer" className="ol-popup-closer" ref={closer}></div>
				<div id="popup-content" ref={content}>
				</div>
			</div>
			</div>
    );
}