import axios from '@/modules/axios';

class BoardService {
    getList(pageable) {
        return axios.get(`/board/list`, { params: pageable });
    }
}
export default new BoardService();