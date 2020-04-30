const convert = require('convert')

test('conversão quantidade 4 pra cotação 4'), ()=>{
    expect(convert.convert(4,4).toBe(16))

}