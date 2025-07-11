console.log("agency.js loaded ✅");

// 전역 변수로 지도 선언
let notaryData = [];
let notaryMarkers = [];
let policeData = [];
let policeMarkers = [];
let notaryMap, policeMap;

// 카카오 맵 로드 후 실행
window.onload = function() {
  kakao.maps.load(function() {
    // 공증사무소 지도
    var notaryMapContainer = document.getElementById('notary-map');
    notaryMap = new kakao.maps.Map(notaryMapContainer, {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 7
    });
    // 경찰서 지도
    var policeMapContainer = document.getElementById('police-map');
    policeMap = new kakao.maps.Map(policeMapContainer, {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 7
    });

    // 공증사무소 데이터
    fetch('/static/assets/notary_offices.json')
      .then(res => res.json())
      .then(data => {
        notaryData = data.map(office => ({
          name: office.name,
          address: office.address || '',
          lat: office.lat,
          lng: office.lng
        }));
        notaryMarkers = [];
        data.forEach(function(office) {
          var marker = new kakao.maps.Marker({
            map: notaryMap,
            position: new kakao.maps.LatLng(office.lat, office.lng),
            title: office.name
          });
          notaryMarkers.push(marker);
          kakao.maps.event.addListener(marker, "click", function() {
            var naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(office.name) + "," + office.lat + "," + office.lng;
            window.open(naviUrl, "_blank");
          });
        });
        renderNotaryList(notaryData);
      });

    // 경찰서 데이터
    fetch('/static/assets/police_stations.json')
      .then(res => res.json())
      .then(data => {
        policeData = data.map(station => ({
          name: station.name,
          address: station.address || '',
          lat: station.lat,
          lng: station.lng
        }));
        policeMarkers = [];
        data.forEach(function(station) {
          var marker = new kakao.maps.Marker({
            map: policeMap,
            position: new kakao.maps.LatLng(station.lat, station.lng),
            title: station.name
          });
          policeMarkers.push(marker);
          kakao.maps.event.addListener(marker, "click", function() {
            var naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(station.name) + "," + station.lat + "," + station.lng;
            window.open(naviUrl, "_blank");
          });
        });
        renderPoliceList(policeData);
      });
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
        
        const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + lat + "," + lng;
        const infowindow = new kakao.maps.InfoWindow({
          content: `
            <div style="padding:5px;">
              ${name}<br>
              <a href="${naviUrl}" target="_blank" style="color:blue;text-decoration:underline;">카카오맵 길찾기</a>
            </div>
          `,
        });
        
        kakao.maps.event.addListener(marker, "click", () => {
          const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + lat + "," + lng;
          window.open(naviUrl, "_blank");
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
            
            const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + coords.getLat() + "," + coords.getLng();
            const infowindow = new kakao.maps.InfoWindow({
              content: `
                <div style="padding:5px;">
                  ${name}<br>
                  <a href="${naviUrl}" target="_blank" style="color:blue;text-decoration:underline;">카카오맵 길찾기</a>
                </div>
              `,
            });
            
            kakao.maps.event.addListener(marker, "click", () => {
              const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + coords.getLat() + "," + coords.getLng();
              window.open(naviUrl, "_blank");
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
    
    const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(item.법무법인명) + "," + item.위도 + "," + item.경도;
    const infowindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:5px;">
          ${item.법무법인명}<br>
          <a href="${naviUrl}" target="_blank" style="color:blue;text-decoration:underline;">카카오맵 길찾기</a>
        </div>
      `,
    });
    
    kakao.maps.event.addListener(marker, "click", () => {
      const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(item.법무법인명) + "," + item.위도 + "," + item.경도;
      window.open(naviUrl, "_blank");
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
    
    const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(item.기관명) + "," + item.위도 + "," + item.경도;
    const infowindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:5px;">
          ${item.기관명}<br>
          <a href="${naviUrl}" target="_blank" style="color:blue;text-decoration:underline;">카카오맵 길찾기</a>
        </div>
      `,
    });
    
    kakao.maps.event.addListener(marker, "click", () => {
      const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(item.기관명) + "," + item.위도 + "," + item.경도;
      window.open(naviUrl, "_blank");
    });
  });
}

// 공증사무소 리스트 렌더링
function renderNotaryList(list) {
  const listDiv = document.getElementById('notary-list');
  if (!listDiv) return;
  if (list.length === 0) {
    listDiv.innerHTML = '<div style="color:gray;">검색 결과가 없습니다.</div>';
    return;
  }
  listDiv.innerHTML = list.map(item =>
    `<div class="notary-item" data-lat="${item.lat}" data-lng="${item.lng}" style="padding:4px 0;cursor:pointer;">
      <b>${item.name}</b> ${item.address ? '('+item.address+')' : ''}
    </div>`
  ).join('');
}

// 경찰서 리스트 렌더링
function renderPoliceList(list) {
  const listDiv = document.getElementById('police-list');
  if (!listDiv) return;
  if (list.length === 0) {
    listDiv.innerHTML = '<div style="color:gray;">검색 결과가 없습니다.</div>';
    return;
  }
  listDiv.innerHTML = list.map(item =>
    `<div class="police-item" data-lat="${item.lat}" data-lng="${item.lng}" style="padding:4px 0;cursor:pointer;">
      <b>${item.name}</b> ${item.address ? '('+item.address+')' : ''}
    </div>`
  ).join('');
}

// 공증사무소 검색 이벤트
window.addEventListener('DOMContentLoaded', function() {
  const notarySearch = document.getElementById('notary-search');
  if (notarySearch) {
    notarySearch.addEventListener('input', function() {
      const keyword = this.value.trim();
      const filtered = notaryData.filter(item =>
        item.name.includes(keyword) || item.address.includes(keyword)
      );
      renderNotaryList(filtered);
      // 마커 필터링
      notaryMarkers.forEach((marker, idx) => {
        const item = notaryData[idx];
        const matched = filtered.some(f => f.lat == item.lat && f.lng == item.lng);
        marker.setMap(matched ? notaryMap : null);
      });
    });
    // 리스트 클릭 시 지도 이동 및 네비 연동
    const notaryListDiv = document.getElementById('notary-list');
    notaryListDiv.addEventListener('click', function(e) {
      const target = e.target.closest('.notary-item');
      if (!target) return;
      const lat = parseFloat(target.dataset.lat);
      const lng = parseFloat(target.dataset.lng);
      notaryMap.setCenter(new kakao.maps.LatLng(lat, lng));
      // 네비 연동
      const name = target.textContent.trim();
      const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + lat + "," + lng;
      window.open(naviUrl, "_blank");
    });
  }

  // 경찰서 검색 이벤트
  const policeSearch = document.getElementById('police-search');
  if (policeSearch) {
    policeSearch.addEventListener('input', function() {
      const keyword = this.value.trim();
      const filtered = policeData.filter(item =>
        item.name.includes(keyword) || item.address.includes(keyword)
      );
      renderPoliceList(filtered);
      // 마커 필터링
      policeMarkers.forEach((marker, idx) => {
        const item = policeData[idx];
        const matched = filtered.some(f => f.lat == item.lat && f.lng == item.lng);
        marker.setMap(matched ? policeMap : null);
      });
    });
    // 리스트 클릭 시 지도 이동 및 네비 연동
    const policeListDiv = document.getElementById('police-list');
    policeListDiv.addEventListener('click', function(e) {
      const target = e.target.closest('.police-item');
      if (!target) return;
      const lat = parseFloat(target.dataset.lat);
      const lng = parseFloat(target.dataset.lng);
      policeMap.setCenter(new kakao.maps.LatLng(lat, lng));
      // 네비 연동
      const name = target.textContent.trim();
      const naviUrl = "https://map.kakao.com/link/to/" + encodeURIComponent(name) + "," + lat + "," + lng;
      window.open(naviUrl, "_blank");
    });
  }
});