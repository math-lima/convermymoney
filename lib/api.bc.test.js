const api = require('./api.bc')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', ()=>{
    const res = {
        data: {
            value: [
                {cotacaoVenda: 5.84}
                
            ]
        }

    }
        axios.get.mockResolvedValue(res)
        api.getCotacaoAPI('url').then(resp =>{
            expect(resp).toEqual(res)
            expect(axios.get.mock.calls[0][0]).toBe('url')
        })

})

test('extractCotacao', ()=> {
    const cotacao = api.extractCotacao({
        data: {
            value: [
                {cotacaoVenda: 5.84}
                
            ]
        }

    }) 
    expect(cotacao).toBe(5.84)
})

    describe('getToday', ()=>{
    const RealDate = Date
    
    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
        
    }
    afterEach(()=>{
        global.Date = RealDate
    })

    test('getToday', ()=>{
        mockDate('2020-08-05T18:48:00z')
        const today = api.getToday()
        expect(today).toBe('8-5-2020')
    })
})

test('getUrl', ()=>{
    const url = api.getUrl('DATA-ATUAL')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27DATA-ATUAL%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', ()=>{

    const res = {
        data: {
            value: [
                {cotacaoVenda: 5.84}
                
            ]
        }

    }

    const getCotacaoAPI = jest.fn()
        getCotacaoAPI.mockResolvedValue(res)
    const getToday = jest.fn()
        getToday.mockReturnValue('8-5-2020')
    const getUrl = jest.fn()
        getUrl.mockReturnValue('url')
    const extractCotacao = jest.fn()
        extractCotacao.mockReturnValue(5.84)

        api.pure
                .getCotacao({ getCotacaoAPI, getToday, getUrl, extractCotacao })()
            .then(res =>{
                expect(res).toBe(5.84)
            })

})

test('getCotacao', ()=>{

    const res = {
    }

    const getCotacaoAPI = jest.fn()
        getCotacaoAPI.mockReturnValue(Promise.reject('err'))
    const getToday = jest.fn()
        getToday.mockReturnValue('8-5-2020')
    const getUrl = jest.fn()
        getUrl.mockReturnValue('url')
    const extractCotacao = jest.fn()
        extractCotacao.mockReturnValue(5.84)

        api.pure
                .getCotacao({ getCotacaoAPI, getToday, getUrl, extractCotacao })()
            .then(res =>{
                expect(res).toBe('')
            })

})