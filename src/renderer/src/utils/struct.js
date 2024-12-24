export class SetList {
  constructor() {
    this.list = []
    this.set = new Set()
  }

  getList() {
    return this.list
  }

  get(index) {
    return this.list[index]
  }

  has(id) {
    return this.set.has(id)
  }

  load(list) {
    for (let item of list) {
      this.set.add(item.id)
      this.list.push(item)
    }
  }

  soleLoad(list) {
    for (let item of list) {
      if (!this.set.has(item.id)) {
        this.set.add(item.id)
        this.list.push(item)
      }
    }
  }

  unshift(item) {
    this.set.add(item.id)
    this.list.unshift(item)
  }

  push(item) {
    this.set.add(item.id)
    this.list.push(item)
  }

  getIndex(id) {
    for (let index in this.list) if (this.list[index].id === id) return index
  }

  remove(index) {
    let item = this.list[index]
    if (this.set.has(item.id)) {
      this.set.delete(item.id)
      this.list.splice(index, 1)
    }
  }
}
