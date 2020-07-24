const getCA = (bills = []) => {
  let CA = 0

  for (let billIndex = 0; billIndex < bills.length; billIndex++) {
    const bill = bills[billIndex];

    CA += bill.total_ht-bill.discount
  }

  return CA
}

const getLeftToPay = (bills = []) => {
  let leftToPay = 0

  for (let billIndex = 0; billIndex < bills.length; billIndex++) {
    const bill = bills[billIndex];

    let leftToPayBill = (bill.total_ht-bill.discount)*(1+(bill.tva/100))
    
    for (let billPaymentIndex = 0; billPaymentIndex < bill.bill_payments.length; billPaymentIndex++) {
      const bill_payments = bill.bill_payments[billPaymentIndex];
      
      leftToPay -= bill_payments.amount
    }

    leftToPay += leftToPayBill
  }

  return leftToPay
}

const getTotalHT = (bills = []) => {
  let totalHT = 0

  for (let billIndex = 0; billIndex < bills.length; billIndex++) {
    const bill = bills[billIndex];

    totalHT += bill.total_ht-bill.discount
  }

  return totalHT
}

const getTotalTTC = (bills = []) => {
  let totalTTC = 0

  for (let billIndex = 0; billIndex < bills.length; billIndex++) {
    const bill = bills[billIndex];

    totalTTC += (bill.total_ht-bill.discount)*(1+(bill.tva/100))
  }

  return totalTTC
}

export {
  getCA,
  getLeftToPay,
  getTotalHT,
  getTotalTTC,
}