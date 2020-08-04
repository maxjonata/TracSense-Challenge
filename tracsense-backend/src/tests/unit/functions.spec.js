const arrayManagement = require('../../utils/arrayManagement');

describe('Generate array with different size and mediated values', () => {
    it('should generate array with 20 values', ()=> {

		const oldarray = [...Array(100).keys()]
		const array = arrayManagement.getNewArraySize(oldarray, 18)
		
        expect(array.length).not.toEqual(oldarray.length);
        expect(array).not.toEqual(oldarray);
    });
});

describe('Return new array with the last 50 values', () => {
    it('should generate array with 50 values indiferent from where it starts, cycling if needed', ()=> {

		const oldarray = [...Array(100).keys()];
		var index = 60
		const array = arrayManagement.getLast50(oldarray, index);
		for(var i = (array.length - 1) ; i >= 0; i--) {
			expect(array[i]).toBe(oldarray[index]);
			index--;
		}

		const oldarray2 = [...Array(25).keys()];
		var index2 = 12
		const array2 = arrayManagement.getLast50(oldarray2, index2);
		for(var i = (array2.length - 1) ; i >= 0; i--) {
			expect(array2[i]).toBe(oldarray[index2]);
			index2--;
			if(index2 < 0) {
				index2 = 24;
			}
		}
    });
});