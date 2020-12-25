module.exports = {
    response: (res, result, status, err) => {
      const resultPrint = {
      }
      resultPrint.status = 'success'
      resultPrint.status_code = status
      resultPrint.result = result
      resultPrint.err = err || null
      return res.status(status).json(resultPrint)
    },
    reject: (res, result, status, err) => {
      const resultPrint = {
      }
      resultPrint.status = 'failed'
      resultPrint.status_code = status || 500
      resultPrint.result = result
      resultPrint.err = err || null
      return res.status(status).json(resultPrint)
    }
  }