const grouping = (array, propChanged, propsAcumulaters) => {
    const returned = [];
    let initialItem = {};
    array.forEach((item, index) => {
        if(index === 0 || initialItem[propChanged] !== item[propChanged]) {
            initialItem = {...item}
            returned.push(initialItem);
        } else if (item[propChanged] === initialItem[propChanged]) {
            propsAcumulaters.forEach(item2 => {
                initialItem[item2] = item[item2] + initialItem[item2];
            })
        } 
    })
    return returned;
}

export default grouping;