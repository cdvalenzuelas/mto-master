import grouping from './grouping';

const a = [
    {cantidad: 1, numbre: 'codo', peso: 1},
    {cantidad: 1, numbre: 'codo', peso: 2},
    {cantidad: 1, numbre: 'codo', peso: 5},
    {cantidad: 1, numbre: 'codo', peso: 3},
    {cantidad: 1, nombre: 'tee', peso: 3},
    {cantidad: 1, nombre: 'tee', peso: 5},
    {cantidad: 1, nombre: 'tee', peso: 4},
    {cantidad: 1, nombre: 'tee', peso: 2},
    {cantidad: 1, nombre: 'red', peso: 5},
    {cantidad: 1, nombre: 'red', peso: 4},
    {cantidad: 1, nombre: 'red', peso: 2}
]

console.log(grouping(a, 'nombre', ['cantidad', 'peso']))