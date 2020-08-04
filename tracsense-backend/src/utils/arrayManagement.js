

module.exports = {
	getLast50(array, index) {
		var newArray = [];
		while(true) {
			newArray.unshift(array[index])
			index --;
			if(index<0) index = (array.length-1)
			if(newArray.length === 50) return newArray
		}
	},
	
	get30TimeArray(array) {
		var newArray = [];
	
		firstTime = array[0]['time'];
		lastTime = array[array.length-1]['time']
		var mediumTime;
		if(firstTime < lastTime) {
			mediumTime = ((lastTime - firstTime) / 30);
			for(var i = 0; i < 30; i++) {
				newArray.push(firstTime + (mediumTime * i))
			}
		} else {
			mediumTime = (((1440 - firstTime) + lastTime) / 30);
			for(var i = 0; i < 30; i++) {
				if(firstTime + (mediumTime * i) < 1440) newArray.push(firstTime + (mediumTime * i))
				else newArray.push((firstTime - 1440) + (mediumTime * i))
			}
		}
	
		return newArray;
	},
	
	getNewArraySize(array, newSize) {
		var newArray = [];
	
		firstNumber = array[0];
		lastNumber = array[array.length-1]
	
		var mediumNumber;
		mediumNumber = ((lastNumber - firstNumber) / newSize);
	
		for(var i = 0; i < newSize; i++) {
			newArray.push(firstNumber + (mediumNumber * i));
		}
	
		return newArray;
	}
}