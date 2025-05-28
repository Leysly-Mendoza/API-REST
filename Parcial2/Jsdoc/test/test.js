import assert from 'node:assert';
import test from 'node:test';
import * as areas from '../src/modulo.js';

test('Un triángulo de base 2 y altura 4, el área debe ser 4', () => {
    const resultado = areas.areaTriangulo(2, 4);
    assert.strictEqual(resultado, 4);
});
