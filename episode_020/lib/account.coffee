Account = () ->
  this.balance = 0

module.exports.create = () ->
  return new Account()

Account::credit = (amount) ->
  this.balance += amount

Account::debit = (amount) ->
  this.balance -= amount

Account::transferTo = (account, amount) ->

  if this.balance < amount
    throw new Error 'not enough funds'

  this.debit amount
  account.credit amount