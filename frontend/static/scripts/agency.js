console.log("agency.js loaded ✅");

// 전역 변수로 지도 선언
let map1, map2;

// 카카오 맵 로드 후 실행
window.onload = function() {
  kakao.maps.load(function () {
    initializeMaps();
    loadLawFirms();
    loadPoliceStations();
  });
};

function initializeMaps() {
  const placeholders = document.querySelectorAll(".agency-placeholder");
  
  if (placeholders.length < 2) {
    console.error("지도 컨테이너를 찾을 수 없습니다.");
    return;
  }

  const mapOption = {
    center: new kakao.maps.LatLng(36.5, 127.8),
    level: 12,
  };

  // 첫 번째 지도 (공증사무소)
  map1 = new kakao.maps.Map(placeholders[0], mapOption);
  
  // 두 번째 지도 (경찰서)
  map2 = new kakao.maps.Map(placeholders[1], mapOption);
}

function loadLawFirms() {
  fetch("http://localhost:8000/institutions/api/lawfirms/list/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("법무법인 데이터 형식이 올바르지 않습니다:", data);
        return;
      }
      
      data.forEach((item) => {
        const lat = parseFloat(item.위도);
        const lng = parseFloat(item.경도);
        const name = item.법무법인명;
        
        // 유효한 좌표인지 확인
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`잘못된 좌표: ${name} - lat: ${lat}, lng: ${lng}`);
          return;
        }
        
        const marker = new kakao.maps.Marker({
          map: map1,
          position: new kakao.maps.LatLng(lat, lng),
        });
        
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${name}</div>`,
        });
        
        kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map1, marker);
        });
      });
    })
    .catch((error) => {
      console.error("법무법인 API 오류:", error);
      // 로컬 개발 환경에서는 목업 데이터로 대체
      loadMockLawFirms();
    });
}

function loadPoliceStations() {
  const SERVICE_KEY = "jT%2BQ4DOdKXTFolmGz1Dc5zu0wiHpEBMiXar01c9qfg8AnazFkPC0k8cklvYJETq28XP0Za6hsipzL3lhtAFOxA%3D%3D";
  const API_URL = `https://api.odcloud.kr/api/15077036/v1/uddi:16b77d30-e4a2-4e1e-b7dc-c295c7ae3aaa_202309281420?page=1&perPage=1000&serviceKey=${SERVICE_KEY}`;

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (!result.data || !Array.isArray(result.data)) {
        console.error("경찰청 데이터 형식이 올바르지 않습니다:", result);
        return;
      }
      
      const geocoder = new kakao.maps.services.Geocoder();
      
      result.data.forEach((station) => {
        const address = station["주소"];
        const name = station["기관명"];
        
        if (!address || !name) {
          console.warn("주소 또는 기관명이 없습니다:", station);
          return;
        }

        geocoder.addressSearch(address, (res, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(res[0].y, res[0].x);
            const marker = new kakao.maps.Marker({
              map: map2,
              position: coords,
            });
            
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${name}</div>`,
            });
            
            kakao.maps.event.addListener(marker, "click", () => {
              infowindow.open(map2, marker);
            });
          } else {
            console.warn(`주소 검색 실패: ${address} - ${name}`);
          }
        });
      });
    })
    .catch((error) => {
      console.error("경찰청 API 오류:", error);
      // API 오류 시 목업 데이터로 대체
      loadMockPoliceStations();
    });
}

// 목업 데이터 함수들 (API 오류 시 사용)
function loadMockLawFirms() {
  const mockData = [
    { 법무법인명: "서울 공증사무소", 위도: 37.5665, 경도: 126.9780 },
    { 법무법인명: "부산 공증사무소", 위도: 35.1796, 경도: 129.0756 },
    { 법무법인명: "대구 공증사무소", 위도: 35.8714, 경도: 128.6014 },
  ];
  
  mockData.forEach((item) => {
    const marker = new kakao.maps.Marker({
      map: map1,
      position: new kakao.maps.LatLng(item.위도, item.경도),
    });
    
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${item.법무법인명}</div>`,
    });
    
    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.open(map1, marker);
    });
  });
}

function loadMockPoliceStations() {
  const mockData = [
    { 기관명: "종로경찰서", 위도: 37.5735, 경도: 126.9788 },
    { 기관명: "강남경찰서", 위도: 37.5172, 경도: 127.0473 },
    { 기관명: "마포경찰서", 위도: 37.5449, 경도: 126.9342 },
  ];
  
  mockData.forEach((item) => {
    const marker = new kakao.maps.Marker({
      map: map2,
      position: new kakao.maps.LatLng(item.위도, item.경도),
    });
    
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${item.기관명}</div>`,
    });
    
    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.open(map2, marker);
    });
  });
}