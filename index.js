// Dependencies
import xlsx, { writeFile } from 'xlsx'
import { garbage } from './initial'
import structureMembers from './structureMembers'
import { tapweldClass } from './common'
import { welds, threads, bolts, gaskets } from './fasteners' 
import { elbows, flanges, tees, reducers, olets, valves, pipes, miscelanius, unions } from './pipeComponents'
import grouping from './grouping'

olets.forEach(item => console.log(item.description))

// Generación de Tapweld en función de los olets
const tapwelds = olets.map(item => {
    const item2 = {...item}
    item2.size = item2.size.split('x')[1];    
    item2.weight = 0;
    item2.shortDescription = 'TAPWELD';
    item2.longDescription = `TAPWELD ${tapweldClass[item2.spec]}`
    item2.description = `TAPWELD ${tapweldClass[item2.spec]} ${item2.size}`;      
    return item2
})

tapwelds.sort((actual, next) => actual.description <= next.description ? -1 : 1);

let mto = [
    ...pipes,
    ...elbows,
    ...tees,
    ...reducers,
    ...olets,
    ...unions,
    ...miscelanius,
    ...flanges,
    ...bolts,
    ...gaskets,
    ...valves,
    ...welds,
    ...tapwelds,
    ...threads,
    ...structureMembers
] 

mto = mto.filter(item => {
    const item2 = {...item}
    if(item2.drawing !== 'SKID_GAS_RECUPERADO'){      
        return item2
    }
})

//Determinar cuanros paquetes tiene el proyecto
let packages = [mto[0].drawing]

for(let item of mto){    
    if(!packages.includes(item.drawing)){
        packages.push(item.drawing)        
    }
}

const libros = []

packages.forEach(() => libros.push(xlsx.utils.book_new()))

packages.forEach((item, index) => {
    const libro = libros[index]
    let internalMto = mto.filter(item2 => item === item2.drawing);
    internalMto = grouping(internalMto, 'description', ['quantity', 'weight', 'momentX', 'momentY', 'momentZ']);
    //const total = grouping(internalMto, 'identifier', [ 'weight', 'momentX', 'momentY', 'momentZ' ]);
    //console.log(total);
    internalMto = internalMto.map(item2 => {
        const weightPerUnit = item2.weight/ item2.quantity;
        item2.weightPerUnit = weightPerUnit;
        delete item2.description;
        delete item2.lineTag;
        delete item2.drawing;
        delete item2.shortDescription;
        delete item2.length;
        delete item2.spec;
        return item2;
    })   

    //internalMto = [...internalMto, total];

    const hoja = xlsx.utils.json_to_sheet(internalMto);   
    xlsx.utils.book_append_sheet(libro, hoja, `mto`);   
    writeFile(libro,`MTO; ${item}.xlsx`)   
})

/////////////////////////////////////////////
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

//console.log(mechanicalQuantity)

/////////////////////////////////

// Generación del archivo garbage
const garbageFile = xlsx.utils.book_new();
const hoja1 = xlsx.utils.json_to_sheet(garbage);
xlsx.utils.book_append_sheet(garbageFile, hoja1, `GARBAGE`)
writeFile(garbageFile, 'MTO; GARBAGE.xlsx')

// Generacion del archivo MTO
mto = grouping(mto, 'description', ['quantity', 'weight']);

mto = mto.map(item => {
    delete item.description;
    delete item.drawing;
    delete item.lineTag;
    delete item.shortDescription;
    delete item.length;
    delete item.momentX;
    delete item.momentY;
    delete item.momentZ;
    delete item.spec;
    return item;
})

const mtoFile = xlsx.utils.book_new();
const hoja2 = xlsx.utils.json_to_sheet(mto);
xlsx.utils.book_append_sheet(mtoFile, hoja2, `MTO`)
writeFile(mtoFile, 'MTO.xlsx')

// Mechanicaql quantity //

mechanicalQuantity.sort((actual, next) => actual.lineTagDescription <= next.lineTagDescription ? -1 : 1);

const lineTags = [];

for(let item of mechanicalQuantity){    
    if(!lineTags.includes(item.lineTag)){
        lineTags.push(item.lineTag)        
    }
}

mechanicalQuantity = grouping(mechanicalQuantity, 'lineTagDescription', [ ...weldsSizeAndSch, 'weight' ]);

mechanicalQuantity = mechanicalQuantity.map(item => {
    delete item.lineTagDescription;
    return item;
})

const mechanicalQuantityFile = xlsx.utils.book_new();
const hoja3 = xlsx.utils.json_to_sheet(mechanicalQuantity);
xlsx.utils.book_append_sheet(mechanicalQuantityFile, hoja3, 'MECHANICAL QUANTITY')
writeFile(mechanicalQuantityFile, 'MECHANICAL QUANTITY.xlsx')


