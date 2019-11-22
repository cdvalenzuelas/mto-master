// Dependencies
import { schedule, boltsQuantity } from '../common';
import { fasteners } from '../initial'

const welds = []
const threads = []
const bolts = []
const gaskets = []

fasteners.forEach(item => {   
    
	let { description, size, quantity, length } = item

	const {  
		spec,             
		shortDescription,         
		lineTag, 
		drawing,         
		longDescription,
		weight,
		nominalDiameter,              
		longDescriptionSize,
		pressureClass } = item  
	
	const unit = 'U.N';
	
	const fastener = { description, quantity, unit, size, longDescription, weight, drawing, lineTag, shortDescription }
	
	if(shortDescription.endsWith('WELD')){
		const sch = schedule[spec][size]  
		fastener.description = `${shortDescription} ${sch} ${nominalDiameter}`
		fastener.longDescription = `${shortDescription}  SCH ${sch}`         
		welds.push(fastener)
	} else if (shortDescription === 'THREAD') {
		const sch = schedule[spec][size]
		fastener.description = `${shortDescription} ${sch} ${nominalDiameter}`
		fastener.longDescription = `${shortDescription}  SCH ${sch}`      
		threads.push(fastener)
	} else if (shortDescription === 'BOLT SET') {            
		length = Number(length).toFixed(0)          
		fastener.quantity = boltsQuantity[size][pressureClass]
		let size2 = longDescriptionSize.split(' ')        
		size2 = size2.slice(2, size2.indexOf('X')).join(' ')                 
		fastener.size = `${size2} x ${length}`  
		fastener.description = `${shortDescription} ${size}`      
		bolts.push(fastener)
	} else if (shortDescription.startsWith('GASKET')) {
		gaskets.push(fastener)
	}      
})

welds.sort((actual, next) => actual.description <= next.description ? -1 : 1);
threads.sort((actual, next) => actual.description <= next.description ? -1 : 1);
bolts.sort((actual, next) => actual.description <= next.description ? -1 : 1);
gaskets.sort((actual, next) => actual.description <= next.description ? -1 : 1);

export { welds, threads, bolts, gaskets } 
