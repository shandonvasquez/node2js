
//si hay duplicidad retorna true, si NO hay duplicidad retorna false
export const validRepeatSeat = (tickets) => {
  const seatNumbers = new Set();

  for (const ticket of tickets) {
    if(seatNumbers.has(ticket.seatNumber)){
      return true;
    }else {
      seatNumbers.add(ticket.seatNumber)
    }
  }

  return false;
}

export const hasDuplicateSeatNumber = (dataFromBody, dataFromDb) => {
  const setOfseatNumbers = new Set( dataFromDb.map((item) => item.seat_number) )

  return dataFromBody.some((ticket) => setOfseatNumbers.has(ticket.seatNumber))
}
