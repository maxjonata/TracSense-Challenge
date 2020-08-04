const connection = require('../database/connection');
const { linear } = require('everpolate');
const { getNewArraySize, getLast50, get30TimeArray } = require('../utils/arrayManagement')

async function getMapInfoTranslated() {
	const datas = await connection('timed_data');

	for(var key in datas) {
		var arrayTime = datas[key].stringTimeArray.split(',')
		for(var i in arrayTime) {
			arrayTime[i] = parseInt(arrayTime[i])
		}

		var arrayData = datas[key].stringDataArray.split(',')
		for(var j in arrayData) {
			arrayData[j] = parseFloat(arrayData[j])
		}

		datas[key].stringTimeArray = arrayTime;
		datas[key].stringDataArray = arrayData;
	}

	return datas;
}

function get30InterpolatedFromTheLast50(datas) {
	var currentDate = new Date();
	
	var currentTimeInMinutes = ((currentDate.getHours() * 60) + currentDate.getMinutes());
	var arrayofTimedDatas = [];

	for(var i in datas) {
		var timedData = []
		for (var j in datas[i].stringTimeArray) {
			timedData.push({time: datas[i].stringTimeArray[j], data:datas[i].stringDataArray[j] })
		}
		arrayofTimedDatas.push(timedData);

		var index = 0;

		while(timedData[index].time < currentTimeInMinutes) {index++}
		var last50 = getLast50(timedData, index-1)
		var timeArray = get30TimeArray(last50);

		var data = [];

		for(var o in last50) {
			data.push(last50[o]['data']);
		}

		for(var o in timeArray) {
			var num = timeArray[o];
			var hours = (num / 60);
			var rhours = Math.floor(hours);
			var minutes = (hours - rhours) * 60;
			var rminutes = Math.round(minutes);
			timeArray[o] = (rhours + "").padStart(2, '0') + ":" + (rminutes + "").padStart(2, '0');
		}

		var array0to49 = [...Array(50).keys()]
		var array0to30 = getNewArraySize(array0to49, 30);

		datas[i].stringDataArray = linear(array0to30, array0to49, data)
		datas[i].stringTimeArray = timeArray;
	}


	return datas;
}

module.exports = {

	async getMapInfo(request, response){
		const datas = await getMapInfoTranslated()

		return response.json(datas);
	},

	async get30InterpolatedFromTheLast50(request, response){
		const datas = await getMapInfoTranslated()
		const finalDatas = await get30InterpolatedFromTheLast50(datas);

		return response.json(finalDatas);
	}
}