const convert = require('./convert')

test('convert 4 to 4', ()=>{
    expect(convert.convert(4,4)).toBe(16)

})

test('convert 0 to 4', ()=>{
    expect(convert.convert(0,4)).toBe(0)

})

test('toMoney convert floats', ()=>{
    expect(convert.toMoney(2.00)).toBe('2.00')
})

test('toMoney convert strings', ()=>{
    expect(convert.toMoney("2")).toBe('2.00')
})