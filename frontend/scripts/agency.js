console.log("agency.js loaded ✅");


window.onload = () => {
    const placeholders = document.querySelectorAll('.placeholder');

  // Kakao 지도 공통 옵션 (중심 좌표는 전국 기준)
    const mapOption = {
        center: new kakao.maps.LatLng(36.5, 127.8),
        level: 12
    };

  /** 지도 1: 공중사무소 현황 (백엔드 API) **/
    const map1 = new kakao.maps.Map(placeholders[0], mapOption);

    fetch("http://localhost:8000/api/lawfirms/list/")  // ← 여기에 실제 API 주소 넣기!
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const lat = parseFloat(item.위도);
                const lng = parseFloat(item.경도);
                const name = item.법무법인명;
                const marker = new kakao.maps.Marker({
                    map: map1,
                    position: new kakao.maps.LatLng(lat, lng)
                });
                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${name}</div>`
                });
                kakao.maps.event.addListener(marker, 'click', () => {
                    infowindow.open(map1, marker);
                });
            });
        })
        .catch(error => {
            console.error("법무법인 API 오류:", error);
        });


  /** 지도 2: 전국 지구대 및 파출소 주소 (공공데이터포털 API + 주소 → 좌표 변환) **/
    const map2 = new kakao.maps.Map(placeholders[1], mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    const SERVICE_KEY = "jT%2BQ4DOdKXTFolmGz1Dc5zu0wiHpEBMiXar01c9qfg8AnazFkPC0k8cklvYJETq28XP0Za6hsipzL3lhtAFOxA%3D%3D";
    const API_URL = `https://api.odcloud.kr/api/15077036/v1/uddi:16b77d30-e4a2-4e1e-b7dc-c295c7ae3aaa_202309281420?page=1&perPage=1000&serviceKey=${SERVICE_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(result => {
            result.data.forEach(station => {
                const address = station["주소"];
                const name = station["기관명"];

                geocoder.addressSearch(address, (res, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(res[0].y, res[0].x);
                        const marker = new kakao.maps.Marker({
                            map: map2,
                            position: coords
                        });
                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;">${name}</div>`
                        });
                        kakao.maps.event.addListener(marker, 'click', () => {
                            infowindow.open(map2, marker);
                        });
                    }
                });
            });
        })
        .catch(error => {
            console.error("경찰청 API 오류:", error);
    });
};
