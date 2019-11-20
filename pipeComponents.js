// Dependencies
import { pipeComponents } from './initial'

const elbows = [];
const flanges = [];
const tees = [];
const reducers = [];
const olets = [];
const valves = [];
const pipes = [];
const miscelanius = [];
const unions = [];


//Genera un arreglo con los elementos que no pertenecen al spec del proyecto o que no sean elementos nuevos o si no tienen unidad de peso establecida
pipeComponents.forEach(item => { 

    let { length, cutLength } = item

    const {   
        unit,      
        shortDescription,
        description, 
        lineTag, 
        drawing, 
        size, 
        longDescription,
        weight,       
        quantity,
        spec,
        x,
        y,
        z } = item    
    
    const pipeComponent = { description, quantity, unit, size, longDescription, weight, drawing, lineTag, shortDescription, length  };

    pipeComponent.momentX = weight*x;
    pipeComponent.momentY = weight*y;
    pipeComponent.momentZ = weight*z;  

    if(shortDescription.startsWith('ELBOW') || shortDescription.startsWith('ELL')){        
        elbows.push(pipeComponent)
    } else if (shortDescription.startsWith('FLANGE')){                       
        flanges.push(pipeComponent)
    } else if (shortDescription.startsWith('TEE')){  
        pipeComponent.description = `${longDescription} ${size}`          
        tees.push(pipeComponent)
    } else if (shortDescription.startsWith('REDUCER') || shortDescription.startsWith('COUPLING, REDUCING')) {
        pipeComponent.description = `${longDescription} ${size}`
        reducers.push(pipeComponent)
    } else if (shortDescription.endsWith('OLET')){
        pipeComponent.description = `${longDescription} ${size}`
        pipeComponent.spec = spec;
        olets.push(pipeComponent)
    } else if (shortDescription.endsWith('VALVE')){
        valves.push(pipeComponent)
    } else if (shortDescription === 'UNION'){
        unions.push(pipeComponent)        
    } else if (shortDescription.startsWith('PIPE')){ 				
        pipeComponent.unit = 'M.L';  
        const length2 = cutLength/1000
        pipeComponent.quantity = Number(length2.toFixed(2))              
        pipeComponent.weight = weight*Number(length2.toFixed(2))
        pipeComponent.momentX = pipeComponent.weight*x;
        pipeComponent.momentY = pipeComponent.weight*y;
        pipeComponent.momentZ = pipeComponent.weight*z;           
        pipes.push(pipeComponent)
    } else{        
        pipeComponent.description = `${longDescription} ${size}`
		console.log(pipeComponent.description)
        miscelanius.push(pipeComponent)
    }      
})

elbows.sort((actual, next) => actual.description <= next.description ? -1 : 1);
flanges.sort((actual, next) => actual.description <= next.description ? -1 : 1);
tees.sort((actual, next) => actual.description <= next.description ? -1 : 1);
reducers.sort((actual, next) => actual.description <= next.description ? -1 : 1);
olets.sort((actual, next) => actual.description <= next.description ? -1 : 1);
valves.sort((actual, next) => actual.description <= next.description ? -1 : 1);
pipes.sort((actual, next) => actual.description <= next.description ? -1 : 1);
miscelanius.sort((actual, next) => actual.description <= next.description ? -1 : 1);
unions.sort((actual, next) => actual.description <= next.description ? -1 : 1);


export { elbows, flanges, tees, reducers, olets, valves, pipes, miscelanius, unions }
