class Transport {
  private readonly dsn: string

  constructor (dsn: string) {
    this.dsn = dsn
  }

  send (data: any) {
    return fetch(this.dsn, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export default Transport
