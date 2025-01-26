export function getFirstDayOfWeek(dateString: string) {
  const date = new Date(dateString) // Converte a string em uma data
  const day = date.getDay() // Obtém o dia da semana (0 = Domingo, 6 = Sábado)
  const diff = -day // Calcula a diferença para o domingo
  const firstDay = new Date(date) // Clona a data original
  firstDay.setDate(date.getDate() + diff) // Ajusta para o domingo
  firstDay.setHours(0, 0, 0, 0) // Define a hora para 00:00:00.000
  return firstDay
}
