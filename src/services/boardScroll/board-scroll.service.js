import SessionStorageService from '@/services/sessionStorage/session-storage.service';
import SessionStorageKey from '@/services/sessionStorage/session-storage-key';

class BoardScrollService {
    async initItem(service, getNext) {
        // 상세화면 다녀 왔을 시, isViewDetail: true
        const isViewDetail = SessionStorageService.getItem(SessionStorageKey.IS_VIEW_DETAIL);

        let res = null;
        if (!isViewDetail) {
            // 1. 화면 최초 진입
            // 2. 스크롤, 데이터 추가 호출
            res = await this.getData(service, getNext);
        } else {
            // 상세 페이지를 다녀온 경우, api 호출없이
            // 저장된 게시판 데이터 불러오기
            res = JSON.parse(SessionStorageService.getItem(SessionStorageKey.BOARD_DATA));

            // 저장된 스크롤 위치로 이동
            this.getScrollLocation();
        }
        SessionStorageService.setItem(SessionStorageKey.IS_VIEW_DETAIL, false);
        return res;
    }

    async getData(service, getNext) {
        let newData = await service;

        // 무한 스크롤
        if (getNext) {
            // 기존 데이터 불러오기
            let storedRes = JSON.parse(SessionStorageService.getItem(SessionStorageKey.BOARD_DATA));

            // 추가된 데이터 데이터 추가
            newData.data = storedRes.data.concat(newData.data);
        } else {
            // (임시) 데이터 초기화 지점
            await this.removeItem();
        }

        // 기존+추가 데이터 SessionStorage에 저장
        SessionStorageService.setItem(SessionStorageKey.BOARD_DATA, JSON.stringify(newData));
        return newData;
    }

    /** index -> detail
     * @param scrollLocation
     */
    // 상세화면으로 이동하는 경우 scroll 위치 저장
    setScrollLocation(scrollLocation) {
        SessionStorageService.setItem(SessionStorageKey.SCROLL_LOCATION, scrollLocation);
    }

    getScrollLocation() {
        const scrollLocation = SessionStorageService.getItem(SessionStorageKey.SCROLL_LOCATION);

        window.scrollTo({ top: scrollLocation, behavior: 'smooth' });
    }

    /** detail -> index
     * @param isViewDetail
     */
    // 목록으로 돌아가는 경우 isViewDetail : true 저장
    setIsViewDetail(isViewDetail) {
        SessionStorageService.setItem(SessionStorageKey.IS_VIEW_DETAIL, isViewDetail);
    }

    // beforeDestroy - 아이템 삭제
    async removeItem() {
        SessionStorageService.removeItem(SessionStorageKey.BOARD_DATA);
        SessionStorageService.removeItem(SessionStorageKey.IS_VIEW_DETAIL);
        SessionStorageService.removeItem(SessionStorageKey.SCROLL_LOCATION);
    }
}

export default new BoardScrollService();
