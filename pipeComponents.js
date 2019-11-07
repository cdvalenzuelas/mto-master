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

    let { length } = item

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
        tees.push(pipeComponent)
    } else if (shortDescription.startsWith('REDUCER') || shortDescription.startsWith('COUPLING, REDUCING')) {
        reducers.push(pipeComponent)
    } else if (shortDescription.endsWith('OLET')){
        pipeComponent.spec = spec;
        olets.push(pipeComponent)
    } else if (shortDescription.endsWith('VALVE')){
        valves.push(pipeComponent)
    } else if (shortDescription === 'UNION'){
        unions.push(pipeComponent)        
    } else if (shortDescription.startsWith('PIPE')){ 
        pipeComponent.unit = 'M.L';  
        length = length/1000
        pipeComponent.quantity = Number(length.toFixed(2))              
        pipeComponent.weight = weight*pipeComponent.quantity 
        pipeComponent.momentX = pipeComponent.weight*x;
        pipeComponent.momentY = pipeComponent.weight*y;
        pipeComponent.momentZ = pipeComponent.weight*z;           
        pipes.push(pipeComponent)
    } else{        
        miscelanius.push(pipeComponent)
    }      
})

export { elbows, flanges, tees, reducers, olets, valves, pipes, miscelanius, unions }