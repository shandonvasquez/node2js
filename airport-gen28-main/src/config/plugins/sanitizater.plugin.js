import sanitizater from 'perfect-express-sanitizer';

export const sanitizaterClean = () => {
  return sanitizater.clean({
    xss: true,
    noSql: true,
    sql: false //obligatoriamente ir en false, porque si le colocas true no podras recibir data en formData
  }) 
}
