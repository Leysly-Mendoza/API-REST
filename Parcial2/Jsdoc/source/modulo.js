/**
 * Funcion que suma dos valores
 * @param {Number} a Primer valor 
 * @param {Number} b Segundo valor 
 * @returns {Number} La suma de dos valores
 */

function suma(a,b){
    return a+b;
}
/**
 * Funcion que resta dos valores
 * @param {Number} a Primer valor 
 * @param {Number} b Segundo valor 
 * @returns {Number} La resta de dos valores
 */

function resta(a,b){
    return a-b;
}
module.exports = {
    suma: suma,
    resta: resta
}