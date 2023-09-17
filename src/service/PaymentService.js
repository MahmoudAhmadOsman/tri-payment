import axios from "axios";

const BASE_URL = "https://stapes-api.onrender.com/payments";

class PaymentService {
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
		return axios.delete(BASE_URL + id);
	}
}
export default new PaymentService();
