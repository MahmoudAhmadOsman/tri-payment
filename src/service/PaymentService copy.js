import axios from "axios";
// import data from "../data/data.json";
const BASE_URL = "https://stapes-api.onrender.com/payments";
// const LOCAL_DATA = data.payments; // Assuming data.json has a payments property

class PaymentService {
  // Option 1: Use local JSON data directly (no axios needed)
  // getAllPayments() {
  //    return Promise.resolve({ data: LOCAL_DATA });
  // }

  // Option 2: Or keep using the API endpoint
  getAllPayments() {
    return axios.get(BASE_URL);
  }

  savePayment(paymentData) {
    return axios.post(BASE_URL, paymentData);
  }

  updatePayment(id, paymentData) {
    return axios.put(`${BASE_URL}/${id}`, paymentData);
  }

  patchPayment(id, paymentData) {
    return axios.patch(`${BASE_URL}/${id}`, paymentData);
  }

  getPaymentById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  deletePayment(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

export default new PaymentService();
