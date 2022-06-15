'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }
  async create(obj) {
    try {
      let requestData = await this.model.create(obj);
      return requestData;
    } catch (e) {
      console.error('Error occured in ', this.model);
    }
  }
  async read(data_id) {
    try {
      if (data_id) {
        let requestData = await this.model.findOne({ where: { id: data_id } });
        return requestData;
      } else {
        let requestData = await this.model.findAll();
        return requestData;
      }
    } catch (e) {
      console.error('Error occured in ', this.model);
    }
  }
  async update(obj) {
    try {
      let requestData = await this.model.update(obj);
      return requestData;
    } catch {
      console.error('Error occured in ', this.model);
    }
  }
  async delete(data_id) {
    if (!data_id) console.log('no ID provided for this model, ', this.model);

    try {
      let requestData = await this.model.destroy({ where: { id: data_id } });
      return requestData;
    } catch {
      console.error('Error occured in ', this.model);
    }
  }
}
module.exports = Collection;
