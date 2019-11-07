// Dependencies
import xlsx, { readFile } from 'xlsx'
import { specs, jointTypes } from './common'

let data = readFile('./data.xlsx')

let fasteners1 = xlsx.utils.sheet_to_json(data.Sheets['fasteners'])
let pipeComponents1 = xlsx.utils.sheet_to_json(data.Sheets['pipeComponents'])
let structures1 = xlsx.utils.sheet_to_json(data.Sheets['structureMembers'])
let pipes1 = xlsx.utils.sheet_to_json(data.Sheets['pipes'])

pipeComponents1 = pipeComponents1.filter(item => {
    const item2 = {...item}
    item2['Short Description'] = item2['Short Description'].toUpperCase();
    if(!item2['Short Description'].startsWith('PIPE')){        
        return item2
    }
})

data = [ ...fasteners1, ...pipes1, ...pipeComponents1 ]

data = data.map(item => {

    let shortDescription = item['Short Description']
    let longDescription = item['Long Description (Family)']

    if (shortDescription === undefined && longDescription !== undefined) {
        shortDescription = longDescription;
    } else if (shortDescription !== undefined && longDescription === undefined) {
        longDescription = shortDescription;
    } else if (shortDescription === undefined && longDescription === undefined) {
        shortDescription = 'undefined'
        longDescription = 'undefined'
    }    

    shortDescription = shortDescription.toUpperCase()
    longDescription = longDescription.toUpperCase()   
    
    let status = item.Status || 'undefined'
    status = status.toUpperCase()
    const nominalDiameter = Number(item['Nominal Diameter'])
    let [weight, weightUnit] = [0, 0];

    if(jointTypes.includes(shortDescription)){
        weightUnit = 'KG'
        weight = 0
    } else {
        if(item['Weight Unit']==='LB'){
            weightUnit = 'KG'
            weight = item.Weight/2.20462
        } else {
            weightUnit = 'KG'
            weight = Number(item.Weight || 0)
        }
    }   

    return {        
        description: `${longDescription} ${nominalDiameter}`,
        quantity: 1,
        unit: 'U.N',
        longDescription,
        shortDescription,
        nominalDiameter,
        size: item.Size,
        spec: item.Spec,
        drawing: item['DWG Number'] ? item['DWG Number'] : 'undefined',        
        status,
        weight: Number(weight.toFixed(2)),
        weightUnit,
        length: item.length ? '-' : Number(item.Length || 0).toFixed(2),
        pressureClass: String(item['Pressure Class']),
        lineTag: item['Line Number Tag'] || 'undefined',
        longDescriptionSize: item['Long Description (Size)'],
        x: item['Position X'] || 0,
        y: item['Position Y'] || 0,
        z: item['Position Z'] || 0,
    }      
})

data.sort((actual, next) => actual.description <= next.description ? -1 : 1)

const garbage = []
const mto = []

data.forEach(item => {     
    const { status, spec, weightUnit, shortDescription, } = item    
    const condition1 = status !== 'NEW'
    const condition2 = !specs.includes(spec)
    const condition3 = weightUnit === undefined;
    const condition4 = shortDescription === 'TAPWELD'     
    if(condition1 || condition2 || condition3 || condition4){                
        garbage.push(item)
    } else {        
        mto.push(item)
    }   
})

const fasteners = []
const pipeComponents = []

mto.forEach(item => {
    const { shortDescription } = item
    const condition1 = shortDescription.endsWith('WELD')
    const condition2 = shortDescription === 'THREAD'
    const condition3 = shortDescription === 'BOLT SET'   
    const condition4 = shortDescription.startsWith('GASKET')   
    if(condition1 || condition2 || condition3 || condition4){
        fasteners.push(item)
    } else {
        pipeComponents.push(item)
    }
})

export { mto, garbage, fasteners, pipeComponents, structures1 }