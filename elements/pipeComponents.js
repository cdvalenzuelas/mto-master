// Dependencies
import { pipeComponents as pipeComponents2, pipes as pipes2 } from '../initial'

const pipeComponents = [ ...pipeComponents2, ...pipes2 ] 

const elbows = [];
const flanges = [];
const tees = [];
const reducers = [];
const olets = [];
const valves = [];
const pipes = [];
const miscelanius = [];
const unions = [];

pipeComponents.forEach(item => { 	

	const {   
		unit,      
		shortDescription,
		description, 	 
		longDescription,
		cutLength,
		weight, 
		size,  
		spec,    
		quantity,
		lineTag,
		drawing,		
		x,
		y,
		z } = item    
	
	const pipeComponent = { description, quantity, cutLength, unit, longDescription, weight, shortDescription, size, drawing, spec, lineTag };

	pipeComponent.momentX = weight*x;
	pipeComponent.momentY = weight*y;
	pipeComponent.momentZ = weight*z;  

	if(shortDescription.startsWith('ELBOW') || shortDescription.startsWith('ELL')){        
		elbows.push(pipeComponent)
	} else if (shortDescription.startsWith('FLANGE')){                       
		flanges.push(pipeComponent)
	} else if (shortDescription.startsWith('TEE')){ 	          
		tees.push(pipeComponent)
	} else if (shortDescription.startsWith('REDUCER') || shortDescription.startsWith('COUPLING, REDUCING')) {		
		reducers.push(pipeComponent)
	} else if (shortDescription.endsWith('OLET')){		
		olets.push(pipeComponent)
	} else if (shortDescription.endsWith('VALVE')){
		valves.push(pipeComponent)
	} else if (shortDescription === 'UNION'){
		unions.push(pipeComponent)        
	} else if (shortDescription.startsWith('PIPE')){ 				
		pipeComponent.unit = 'M.L'  
		const length2 = cutLength/1000
		pipeComponent.quantity = Number(length2.toFixed(2))              
		pipeComponent.weight = weight*Number(length2.toFixed(2))
		pipeComponent.momentX = pipeComponent.weight*x
		pipeComponent.momentY = pipeComponent.weight*y
		pipeComponent.momentZ = pipeComponent.weight*z           
		pipes.push(pipeComponent)
	} else{				
		miscelanius.push(pipeComponent)
	}      
})

elbows.sort((actual, next) => actual.description <= next.description ? -1 : 1)
flanges.sort((actual, next) => actual.description <= next.description ? -1 : 1)
tees.sort((actual, next) => actual.description <= next.description ? -1 : 1)
reducers.sort((actual, next) => actual.description <= next.description ? -1 : 1)
olets.sort((actual, next) => actual.description <= next.description ? -1 : 1)
valves.sort((actual, next) => actual.description <= next.description ? -1 : 1)
pipes.sort((actual, next) => actual.description <= next.description ? -1 : 1)
miscelanius.sort((actual, next) => actual.description <= next.description ? -1 : 1)
unions.sort((actual, next) => actual.description <= next.description ? -1 : 1)

export { elbows, flanges, tees, reducers, olets, valves, pipes, miscelanius, unions }
