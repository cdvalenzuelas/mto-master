import { structures1 } from './initial'

const structureMembers = structures1.map(item => {
    const item2 = { ...item }
    let longDescription = item2['Long Description (Size)'].toUpperCase(); 
    const description2 = longDescription.split(' ');
    const drawing = item2['DWG Number'];    
    const size = description2[0] === 'MEMBER' ? description2[1] : description2[0];
    const unit = description2[0] === 'MEMBER' ? 'M.L' : 'U.N';
    let quantity = description2[0] === 'MEMBER' ? Number(description2[3])/1000 : 1;        
    quantity = Number(quantity.toFixed(2));    
    longDescription = description2[0] === 'MEMBER' ? `PERFIL ${description2[1]}` : `PLATE ${description2[0]}`;
    const description = longDescription;     
    const shortDescription = 'STRUCTUREMEMBER';
    const weight = 0;      
    return { description, quantity, unit, size, longDescription, weight, shortDescription, drawing }
})

structureMembers.sort((actual, next) => actual.description <= next.description ? -1 : 1)

export default structureMembers;