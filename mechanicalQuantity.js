// Dependencies
import { welds, threads } from './fasteners'
import { tapwelds } from './index'

const weldsSizeAndSch = [];

for(let item of [...welds, ...tapwelds, ...threads]){    
	if(!weldsSizeAndSch.includes(item.description)){
		weldsSizeAndSch.push(item.description)        
	}
}

weldsSizeAndSch.sort((actual, next) => actual <= next ? -1 : 1)

let mechanicalQuantity = mto.map(item => {
	const item2 = {...item};
	let { lineTag, drawing, description, quantity, weight } = item2;
	lineTag = String(lineTag)
	const lineTagItems = lineTag.split('-')    
	const lineTagDescription = `${lineTag} ${drawing}`;

	const item3 = Object.assign({}, {}, {
		lineTagDescription,
		lineTag,
		drawing,
		nominalSize: lineTagItems[0],
		service: lineTagItems[1],
		spec: lineTagItems[2],
		lineNumber: lineTagItems[3],
		isulation: lineTagItems[4]
	});

	weldsSizeAndSch.forEach(element => {
		if(description === element){
			item3[element] = quantity;
		} else {
			item3[element] = 0;
		}        
	})

	item3.weight = weight;    

	return item3
});
