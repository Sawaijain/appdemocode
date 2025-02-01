import {AxiosError} from 'axios';

class AxiosErrorService {
  public errorMessage(error: AxiosError | any) {
    if (error?.response?.status == 413) {
      return 'Request Entity Too Large';
    } else if (error.response.data) {
      return error.response.data;
    } else if (error.response.data.message) {
      return error.response.data.message;
    } else if (error.request) {
      // The request was made but no response was received
      return 'Cannot connect to Server. Please check your connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
}
export default new AxiosErrorService();
