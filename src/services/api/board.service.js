import axios from '@/modules/axios';

class BoardService {
    getList(pageable, searchOptionValue) {
        const dto = {...pageable, ...searchOptionValue};
        return axios.post(`/qna/list`, dto);
    }
}
export default new BoardService();